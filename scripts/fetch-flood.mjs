/**
 * Refresh rainfall, GloFAS and gorge geometry for the river page.
 * Writes src/data/flood-watch.json. Does not edit status chips.
 *
 *   node scripts/fetch-flood.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const reachesFile = JSON.parse(await readFile(join(root, "src/data/reaches.json"), "utf8"));
const asnsFile = JSON.parse(await readFile(join(root, "src/data/asns.json"), "utf8"));
const reaches = reachesFile.reaches;

function hav(a, b) {
  const R = 6371000;
  const rad = Math.PI / 180;
  const dLat = (b[0] - a[0]) * rad;
  const dLng = (b[1] - a[1]) * rad;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a[0] * rad) * Math.cos(b[0] * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}

function lengthM(line) {
  let n = 0;
  for (let i = 1; i < line.length; i++) n += hav(line[i - 1], line[i]);
  return n;
}

async function getJson(url) {
  const res = await fetch(url, { headers: { "user-agent": "netgalchi-rasuwagadhi/flood" } });
  if (!res.ok) throw new Error(`${res.status} ${url.slice(0, 140)}`);
  return res.json();
}

function pct(sorted, p) {
  if (!sorted.length) return null;
  const i = (sorted.length - 1) * p;
  const lo = Math.floor(i);
  const hi = Math.ceil(i);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (i - lo);
}

function round(n, d = 2) {
  if (n == null || Number.isNaN(n)) return null;
  const f = 10 ** d;
  return Math.round(n * f) / f;
}

async function channelElevation(lat, lng) {
  const offsets = [-0.015, 0, 0.015];
  const lats = [];
  const lngs = [];
  for (const dlat of offsets) {
    for (const dlng of offsets) {
      lats.push((lat + dlat).toFixed(4));
      lngs.push((lng + dlng).toFixed(4));
    }
  }
  const url =
    "https://api.open-meteo.com/v1/elevation?latitude=" +
    lats.join(",") +
    "&longitude=" +
    lngs.join(",");
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(url, { headers: { "user-agent": "netgalchi-rasuwagadhi/flood" } });
    if (res.status === 429) {
      await new Promise((r) => setTimeout(r, 20000));
      continue;
    }
    if (!res.ok) throw new Error(`${res.status} elevation`);
    const body = await res.json();
    return Math.min(...body.elevation);
  }
  throw new Error("elevation rate limit");
}

const elevs = [];
for (const r of reaches) {
  const up = await channelElevation(r.line[0][0], r.line[0][1]);
  await new Promise((r) => setTimeout(r, 700));
  const down = await channelElevation(r.line.at(-1)[0], r.line.at(-1)[1]);
  await new Promise((r) => setTimeout(r, 700));
  elevs.push(up, down);
  console.log("bed", r.id, Math.round(up), Math.round(down));
}

const rainLats = reaches.map((r) => r.rain[0]).join(",");
const rainLngs = reaches.map((r) => r.rain[1]).join(",");
const forecast = await getJson(
  "https://api.open-meteo.com/v1/forecast?latitude=" +
    rainLats +
    "&longitude=" +
    rainLngs +
    "&daily=precipitation_sum&hourly=precipitation&models=ecmwf_ifs,gfs_seamless,icon_seamless&forecast_days=6&past_days=1&timezone=Asia%2FKathmandu",
);
console.log("forecast points", forecast.length);

const glofasReaches = reaches.filter((r) => r.glofas);
let floodRows = [];
if (glofasReaches.length) {
  floodRows = await getJson(
    "https://flood-api.open-meteo.com/v1/flood?latitude=" +
      glofasReaches.map((r) => r.glofas[0]).join(",") +
      "&longitude=" +
      glofasReaches.map((r) => r.glofas[1]).join(",") +
      "&daily=river_discharge&forecast_days=7&past_days=2",
  );
  console.log("glofas points", floodRows.length);
}

function eraStats(daily) {
  const days = daily.time.map((date, i) => ({ date, mm: daily.precipitation_sum[i] ?? 0 }));
  const october = days.filter((d) => d.date.slice(5, 7) === "10");
  const monsoon = days.filter((d) => ["06", "07", "08", "09"].includes(d.date.slice(5, 7)));
  const octSorted = october.map((d) => d.mm).sort((a, b) => a - b);
  const monSorted = monsoon.map((d) => d.mm).sort((a, b) => a - b);
  let octMax = october[0];
  for (const d of october) if (d.mm > octMax.mm) octMax = d;
  let allMax = days[0];
  for (const d of days) if (d.mm > allMax.mm) allMax = d;
  const ge = (arr, x) => arr.filter((d) => d.mm >= x).length;
  return {
    years: "2006-2025",
    model: "ERA5 via Open-Meteo",
    october_p95_mm: round(pct(octSorted, 0.95), 1),
    october_p99_mm: round(pct(octSorted, 0.99), 1),
    october_max_mm: round(octMax?.mm ?? null, 1),
    october_max_date: octMax?.date ?? null,
    october_days: october.length,
    october_days_ge_50: ge(october, 50),
    october_days_ge_100: ge(october, 100),
    monsoon_p95_mm: round(pct(monSorted, 0.95), 1),
    record_mm: round(allMax?.mm ?? null, 1),
    record_date: allMax?.date ?? null,
    days_ge_100: ge(days, 100),
    days_ge_200: ge(days, 200),
  };
}

let previous = null;
try {
  previous = JSON.parse(await readFile(join(root, "src/data/flood-watch.json"), "utf8"));
} catch {
  previous = null;
}
const refreshEra = process.argv.includes("--era5");
const eraById = {};
for (const r of reaches) {
  const cached = previous?.reaches?.[r.id]?.era5;
  if (!refreshEra && cached && !cached.error) {
    eraById[r.id] = cached;
    console.log("era5", r.id, "cached");
    continue;
  }
  await new Promise((resolve) => setTimeout(resolve, 8000));
  const url =
    "https://archive-api.open-meteo.com/v1/archive?latitude=" +
    r.rain[0] +
    "&longitude=" +
    r.rain[1] +
    "&start_date=2006-01-01&end_date=2025-12-31&daily=precipitation_sum&models=era5&timezone=Asia%2FKathmandu";
  process.stdout.write(`era5 ${r.id} ... `);
  try {
    const body = await getJson(url);
    eraById[r.id] = eraStats(body.daily);
    console.log("ok", eraById[r.id].october_max_mm, eraById[r.id].october_max_date);
  } catch (err) {
    eraById[r.id] = { error: String(err.message || err) };
    console.log("fail", eraById[r.id].error);
  }
}

let bgp = { error: "not fetched" };
try {
  const neigh = await getJson(
    "https://stat.ripe.net/data/asn-neighbours/data.json?resource=AS23752&sourceapp=netgalchi-rasuwagadhi",
  );
  const known = Object.fromEntries(asnsFile.asns.map((a) => [a.asn, a]));
  const neighbours = neigh.data?.neighbours ?? [];
  const nameOf = (asn) => {
    const a = known[asn];
    return a
      ? { asn, name_en: a.name_en, name_ne: a.name_ne, group: a.group }
      : { asn, name_en: `AS${asn}`, name_ne: `AS${asn}`, group: "other" };
  };
  bgp = {
    as_of: neigh.data?.latest_time ?? null,
    query_time: neigh.data?.query_time ?? null,
    upstreams: neighbours.filter((n) => n.type === "left").map((n) => nameOf(n.asn)),
    customers: neighbours.filter((n) => n.type === "right").map((n) => n.asn),
    source: "ripe-ris",
  };
  console.log(
    "bgp upstreams",
    bgp.upstreams.map((u) => u.asn).join(","),
  );
} catch (err) {
  bgp = { error: String(err.message || err), source: "ripe-ris" };
  console.log("bgp fail", bgp.error);
}

const outReaches = {};
reaches.forEach((r, i) => {
  const up = elevs[i * 2];
  const down = elevs[i * 2 + 1];
  const len = lengthM(r.line);
  const slope = len > 0 ? (up - down) / len : null;
  let speed = null;
  let parcelMin = null;
  let waveMin = null;
  if (slope && slope > 0.00005) {
    const hydraulicRadius = r.depth_m;
    speed = (1 / r.manning_n) * hydraulicRadius ** (2 / 3) * Math.sqrt(slope);
    parcelMin = len / speed / 60;
    waveMin = parcelMin * (3 / 5);
  }
  const fc = forecast[i];
  const times = fc.daily.time;
  const hourlyT = fc.hourly.time;
  const hourlyE = fc.hourly.precipitation_ecmwf_ifs;
  const daily = times.map((date, di) => {
    const hours = [];
    for (let h = 0; h < hourlyT.length; h++) {
      if (hourlyT[h].startsWith(date)) hours.push(hourlyE[h] ?? 0);
    }
    let max1 = 0;
    let max3 = 0;
    for (let h = 0; h < hours.length; h++) {
      if (hours[h] > max1) max1 = hours[h];
      const s3 = (hours[h] ?? 0) + (hours[h + 1] ?? 0) + (hours[h + 2] ?? 0);
      if (h + 2 < hours.length && s3 > max3) max3 = s3;
    }
    return {
      date,
      ecmwf_mm: round(fc.daily.precipitation_sum_ecmwf_ifs[di], 1),
      gfs_mm: round(fc.daily.precipitation_sum_gfs_seamless[di], 1),
      icon_mm: round(fc.daily.precipitation_sum_icon_seamless[di], 1),
      ecmwf_1h_mm: round(max1, 1),
      ecmwf_3h_mm: round(max3, 1),
    };
  });
  const gIndex = glofasReaches.findIndex((g) => g.id === r.id);
  let glofas = null;
  if (gIndex >= 0) {
    const g = floodRows[gIndex];
    glofas = {
      trust: r.glofas_trust,
      snapped_lat: g.latitude,
      snapped_lng: g.longitude,
      daily: g.daily.time.map((date, di) => ({
        date,
        m3s: round(g.daily.river_discharge[di], 1),
      })),
    };
  }
  outReaches[r.id] = {
    elevation_up_m: round(up, 0),
    elevation_down_m: round(down, 0),
    length_km: round(len / 1000, 1),
    slope: slope == null ? null : round(slope, 5),
    depth_m: r.depth_m,
    manning_n: r.manning_n,
    speed_ms: round(speed, 2),
    wave_speed_ms: speed == null ? null : round(speed * (5 / 3), 2),
    parcel_min: round(parcelMin, 0),
    wave_min: round(waveMin, 0),
    rain_lat: fc.latitude,
    rain_lng: fc.longitude,
    rain_elevation_m: round(fc.elevation, 0),
    daily,
    era5: eraById[r.id],
    glofas,
  };
});

const payload = {
  fetched_at: new Date().toISOString(),
  primary_model: "ECMWF IFS",
  compare_models: ["GFS", "ICON"],
  timezone: "Asia/Kathmandu",
  window: ["2026-10-29", "2026-10-31"],
  method:
    "Desk speed uses Manning on a wide channel: V = (1/n) * depth^(2/3) * slope^0.5. Slope is the drop between channel lows (minimum of a 3×3 sample, ±0.015°, around each end of the polyline) divided by polyline length, so a point on a cliff or terrace is not used as the bed. Flood-wave lead time uses Seddon celerity 5/3 V, so the rise exits in 3/5 of the water-parcel time. Published event times replace this where a study measured them. ERA5 daily precipitation is 2006–2025 at the rain point (about 31 km). It underestimates cloudbursts in gorges. GloFAS discharge is the Open-Meteo flood API and is a rise/fall signal, not a DHM gauge.",
  bgp,
  reaches: outReaches,
};

await writeFile(join(root, "src/data/flood-watch.json"), JSON.stringify(payload, null, 2) + "\n");
console.log("wrote src/data/flood-watch.json");

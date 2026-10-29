/**
 * Hourly ECMWF cloud field over Nepal, pressure-level cloud height at named peaks,
 * and the GDACS/JTWC track for cyclone ARNAB-26.
 *
 * The 9 km IFS draws the moving cloud and rain field (same model as the river table).
 * Cloud height in meters is the 0.25° IFS only. That model has geopotential;
 * the 9 km run does not. Cover at a pressure level is Sundqvist relative humidity,
 * not a measured cloud top.
 *
 * Arnab's track is copied from GDACS. Forecast points stay forecast.
 * Nothing in this script places a center over Nepal.
 */
import { readFile, writeFile } from "node:fs/promises";
import { deckAt, LEVELS } from "../src/lib/cloud-deck.mjs";

const OUT = "public/data/clouds.json";
const FORECAST = "https://api.open-meteo.com/v1/forecast";
const DAYS = 4;
const TZ = "Asia/Kathmandu";
const GRID_HOURLY = "cloud_cover_low,cloud_cover_mid,cloud_cover_high,precipitation";
const PEAK_HOURLY = [
  "temperature_2m",
  "precipitation",
  "cloud_cover_low",
  "cloud_cover_mid",
  "cloud_cover_high",
  ...LEVELS.flatMap((p) => [`cloud_cover_${p}hPa`, `geopotential_height_${p}hPa`]),
].join(",");

const PEAKS = [
  { id: "api", name_en: "Api", name_ne: "अपि", lat: 30.004, lng: 80.928, elev_m: 7132 },
  { id: "saipal", name_en: "Saipal", name_ne: "साइपाल", lat: 29.887, lng: 81.292, elev_m: 7031 },
  { id: "dhaulagiri", name_en: "Dhaulagiri", name_ne: "धौलागिरी", lat: 28.696, lng: 83.49, elev_m: 8167 },
  { id: "annapurna", name_en: "Annapurna I", name_ne: "अन्नपूर्ण १", lat: 28.596, lng: 83.82, elev_m: 8091 },
  { id: "machhapuchhre", name_en: "Machhapuchhre", name_ne: "माछापुच्छ्रे", lat: 28.498, lng: 83.946, elev_m: 6993 },
  { id: "thorong", name_en: "Thorong La", name_ne: "थोरोङ ला", lat: 28.793, lng: 83.939, elev_m: 5416 },
  { id: "manaslu", name_en: "Manaslu", name_ne: "मनास्लु", lat: 28.55, lng: 84.56, elev_m: 8163 },
  { id: "langtang", name_en: "Langtang Lirung", name_ne: "लाङटाङ लिरुङ", lat: 28.256, lng: 85.515, elev_m: 7234 },
  { id: "gosainkunda", name_en: "Gosainkunda ridge", name_ne: "गोसाइँकुण्ड डाँडा", lat: 28.083, lng: 85.417, elev_m: 4380 },
  { id: "nagarkot", name_en: "Nagarkot", name_ne: "नगरकोट", lat: 27.717, lng: 85.521, elev_m: 2175 },
  { id: "gaurishankar", name_en: "Gaurishankar", name_ne: "गौरीशंकर", lat: 27.868, lng: 86.334, elev_m: 7134 },
  { id: "chooyu", name_en: "Cho Oyu", name_ne: "चो यु", lat: 28.094, lng: 86.661, elev_m: 8188 },
  { id: "everest", name_en: "Everest", name_ne: "सगरमाथा", lat: 27.988, lng: 86.925, elev_m: 8849 },
  { id: "makalu", name_en: "Makalu", name_ne: "मकालु", lat: 27.889, lng: 87.089, elev_m: 8485 },
  { id: "kanchenjunga", name_en: "Kanchenjunga", name_ne: "कञ्चनजङ्घा", lat: 27.703, lng: 88.147, elev_m: 8586 },
];

function steps(start, end, step) {
  const out = [];
  for (let x = start; x <= end + 1e-6; x += step) out.push(Math.round(x * 100) / 100);
  return out;
}

function gridPoints() {
  const pts = [];
  for (const lat of steps(26.6, 30.2, 0.6)) {
    for (const lng of steps(80.2, 87.9, 0.7)) pts.push([lat, lng]);
  }
  return pts;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function forecastUrl(params) {
  const parts = Object.entries(params).map(
    ([key, value]) => `${key}=${encodeURIComponent(String(value)).replace(/%2C/g, ",")}`,
  );
  return `${FORECAST}?${parts.join("&")}`;
}

async function getJson(url) {
  let last = "no response";
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": "NetGalchiRasuwagadi/flood" } });
    if (res.status === 429 || res.status >= 500) {
      last = String(res.status);
      await sleep(8000 * (attempt + 1));
      continue;
    }
    const text = await res.text();
    if (!res.ok) throw new Error(`${res.status} ${text.slice(0, 240)}`);
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(`not json: ${text.slice(0, 180)}`);
    }
  }
  throw new Error(`gave up after ${last}`);
}

function asList(data) {
  if (Array.isArray(data)) return data;
  if (data && data.hourly) return [data];
  const reason = data?.reason ?? JSON.stringify(data).slice(0, 240);
  throw new Error(`open-meteo: ${reason}`);
}

function ints(values, scale = 1) {
  return values.map((value) => (value == null || Number.isNaN(value) ? 0 : Math.round(value * scale)));
}

function nullableInts(values, scale = 1) {
  return values.map((value) => (value == null || Number.isNaN(value) ? null : Math.round(value * scale)));
}

function neDigits(value) {
  return String(value).replace(/\d/g, (digit) => "०१२३४५६७८९"[Number(digit)]);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_NE = ["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जुन", "जुलाई", "अगस्ट", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर"];

function parseAdvisory(text) {
  const match = String(text).trim().match(/^(\d{1,2}) ([A-Za-z]{3}) (\d{4}) (\d{2}):(\d{2})$/);
  if (!match) return null;
  const month = MONTHS.indexOf(match[2]);
  if (month < 0) return null;
  return new Date(Date.UTC(Number(match[3]), month, Number(match[1]), Number(match[4]), Number(match[5]))).toISOString();
}

function statusOf(raw) {
  const text = Array.isArray(raw) ? raw[0] : String(raw ?? "");
  if (/depression/i.test(text)) return { status_en: "Tropical depression", status_ne: "उष्ण कटिबन्धीय न्यूनचाप" };
  if (/hurricane|typhoon/i.test(text)) return { status_en: "Cyclone, hurricane-force", status_ne: "चक्रवात, हरिकेन-बलको हावा" };
  if (/storm/i.test(text)) return { status_en: "Tropical storm", status_ne: "उष्ण कटिबन्धीय आँधी" };
  return { status_en: text || "Unknown", status_ne: text || "अज्ञात" };
}

function fmtUtc(iso, ne) {
  const date = new Date(iso);
  const day = date.getUTCDate();
  const month = ne ? MONTHS_NE[date.getUTCMonth()] : MONTHS[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mm = String(date.getUTCMinutes()).padStart(2, "0");
  const line = `${day} ${month} ${year} ${hh}:${mm} UTC`;
  return ne ? neDigits(line) : line;
}

function fmtLat(lat, lng, ne) {
  const line = `${lat.toFixed(1)}°N ${lng.toFixed(1)}°E`;
  return ne ? neDigits(line) : line;
}

async function loadTrack() {
  const event = await getJson(
    "https://www.gdacs.org/gdacsapi/api/events/geteventdata?eventtype=TC&eventid=1001345",
  );
  const timeline = event?.properties?.impacts?.find((item) => item?.resource?.timeline)?.resource?.timeline;
  if (!timeline) throw new Error("GDACS event has no timeline link");
  const feed = await getJson(timeline);
  const items = feed?.channel?.item ?? [];
  /** @type {Map<string, object>} */
  const byTime = new Map();
  for (const item of items) {
    const time = parseAdvisory(item.advisory_datetime);
    const lat = Number(item.latitude);
    const lng = Number(item.longitude);
    if (!time || !Number.isFinite(lat) || !Number.isFinite(lng)) continue;
    const observed = String(item.actual).toLowerCase() === "true";
    const point = {
      time,
      lat,
      lng,
      wind_ms: Math.round(Number(item.wind_speed) * 10) / 10,
      ...statusOf(item.storm_status),
      observed,
      advisory: String(item.advisory_number ?? ""),
    };
    const prev = byTime.get(time);
    if (!prev || (observed && !prev.observed)) byTime.set(time, point);
  }
  const points = [...byTime.values()].sort((a, b) => a.time.localeCompare(b.time));
  if (!points.length) throw new Error("GDACS timeline had no positions");
  const observed = points.filter((point) => point.observed);
  const lastFix = observed[observed.length - 1] ?? null;
  const last = points[points.length - 1];
  const nepal = points.some((point) => point.lat >= 26.3 && point.lat <= 30.5 && point.lng >= 80 && point.lng <= 88.3);
  const note_en = lastFix
    ? `GDACS/JTWC ARNAB-26. Last observed fix ${fmtUtc(lastFix.time, false)} at ${fmtLat(lastFix.lat, lastFix.lng, false)}, ${lastFix.status_en.toLowerCase()}. The same advisory’s later points are forecasts, ending ${fmtUtc(last.time, false)} at ${fmtLat(last.lat, last.lng, false)}, ${last.status_en.toLowerCase()}. ${nepal ? "A point falls inside Nepal’s box — check the feed before using it." : "No point in this feed is over Nepal. The picture does not extend the track."}`
    : "GDACS returned positions, but none were marked observed.";
  const note_ne = lastFix
    ? `GDACS/JTWC ARNAB-26। अन्तिम अवलोकित स्थान ${fmtUtc(lastFix.time, true)}, ${fmtLat(lastFix.lat, lastFix.lng, true)}, ${lastFix.status_ne}। सोही बुलेटिनका पछिल्ला बिन्दु पूर्वानुमान हुन्, अन्त्य ${fmtUtc(last.time, true)}, ${fmtLat(last.lat, last.lng, true)}, ${last.status_ne}। ${nepal ? "एउटा बिन्दु नेपालको बाकसभित्र पर्छ। प्रयोगअघि स्रोत हेर्नुहोस्।" : "यो फिडको कुनै बिन्दु नेपालमाथि छैन। ट्र्याकलाई अगाडि बढाइएको छैन।"}`
    : "GDACS ले स्थान दियो, तर अवलोकित भनेर चिनाइएको छैन।";
  return {
    name: "ARNAB-26",
    event_id: 1001345,
    source: "GDACS timeline, meteorological source JTWC",
    url: "https://www.gdacs.org/report.aspx?eventtype=TC&eventid=1001345",
    timeline,
    as_of: event?.properties?.datemodified ?? null,
    over_nepal: nepal,
    note_en,
    note_ne,
    points,
  };
}

const reachesFile = JSON.parse(await readFile("src/data/reaches.json", "utf8"));
const reaches = reachesFile.reaches.map((reach) => ({
  id: reach.id,
  lat: reach.rain[0],
  lng: reach.rain[1],
}));
const grid = gridPoints();
const samples = [...grid, ...reaches.map((reach) => [reach.lat, reach.lng])];

const gridBody = await getJson(
  forecastUrl({
    latitude: samples.map((p) => p[0]).join(","),
    longitude: samples.map((p) => p[1]).join(","),
    hourly: GRID_HOURLY,
    models: "ecmwf_ifs",
    forecast_days: DAYS,
    timezone: TZ,
  }),
);
const gridList = asList(gridBody);
if (gridList.length !== samples.length) {
  throw new Error(`grid locations ${gridList.length} != ${samples.length}`);
}
const times = gridList[0].hourly.time;
await sleep(1500);

const peakBody = await getJson(
  forecastUrl({
    latitude: PEAKS.map((peak) => peak.lat).join(","),
    longitude: PEAKS.map((peak) => peak.lng).join(","),
    elevation: PEAKS.map((peak) => peak.elev_m).join(","),
    hourly: PEAK_HOURLY,
    models: "ecmwf_ifs025",
    forecast_days: DAYS,
    timezone: TZ,
  }),
);
const peakList = asList(peakBody);
if (peakList.length !== PEAKS.length) throw new Error(`peak locations ${peakList.length} != ${PEAKS.length}`);
if (peakList[0].hourly.time.length !== times.length) {
  throw new Error("peak and grid time axes differ");
}
const everestZ = peakList[PEAKS.findIndex((peak) => peak.id === "everest")]?.hourly?.geopotential_height_500hPa;
if (!everestZ || everestZ.every((value) => value == null)) {
  throw new Error("pressure-level heights came back empty");
}

function packSurface(block) {
  return {
    low: ints(block.hourly.cloud_cover_low),
    mid: ints(block.hourly.cloud_cover_mid),
    high: ints(block.hourly.cloud_cover_high),
    rain: ints(block.hourly.precipitation, 10),
  };
}

const packedGrid = gridList.slice(0, grid.length).map(packSurface);
const packedReaches = gridList.slice(grid.length).map(packSurface);

const peaks = PEAKS.map((peak, index) => {
  const hourly = peakList[index].hourly;
  const levels = {};
  for (const level of LEVELS) {
    levels[String(level)] = {
      z: nullableInts(hourly[`geopotential_height_${level}hPa`]),
      c: nullableInts(hourly[`cloud_cover_${level}hPa`]),
    };
  }
  return {
    ...peak,
    low: ints(hourly.cloud_cover_low),
    mid: ints(hourly.cloud_cover_mid),
    high: ints(hourly.cloud_cover_high),
    temp: nullableInts(hourly.temperature_2m, 10),
    rain: ints(hourly.precipitation, 10),
    levels,
  };
});

let track = null;
let track_error = null;
try {
  track = await loadTrack();
} catch (error) {
  track_error = error instanceof Error ? error.message : String(error);
}

const file = {
  fetched_at: new Date().toISOString(),
  timezone: TZ,
  cloud_model: "ECMWF IFS 9 km via Open-Meteo (cloud_cover_low / mid / high and precipitation)",
  height_model:
    "ECMWF IFS 0.25° geopotential and cloud cover at 850, 700, 500, 400, 300 and 250 hPa. Cover is a relative-humidity estimate (Sundqvist), not a radar cloud top. Summit temperature is that model downscaled to the published elevation.",
  bands_en: "Low cloud is up to about 3 km, mid cloud about 3–8 km, high cloud from about 8 km.",
  bands_ne: "तल्लो बादल करिब ३ किमीसम्म, मध्यम करिब ३–८ किमी, उच्च करिब ८ किमीबाट माथि।",
  live: {
    forecast: FORECAST,
    grid_model: "ecmwf_ifs",
    grid_hourly: GRID_HOURLY,
    peak_model: "ecmwf_ifs025",
    peak_hourly: PEAK_HOURLY,
    forecast_days: DAYS,
    timezone: TZ,
  },
  times,
  grid,
  low: packedGrid.map((cell) => cell.low),
  mid: packedGrid.map((cell) => cell.mid),
  high: packedGrid.map((cell) => cell.high),
  rain: packedGrid.map((cell) => cell.rain),
  reaches: reaches.map((reach, index) => ({ ...reach, ...packedReaches[index] })),
  peaks,
  track,
  track_error,
};

await writeFile(OUT, JSON.stringify(file));

const noon = times.findIndex((time) => time.endsWith("T12:00"));
const sample = noon >= 0 ? noon : 0;
const everest = peaks.find((peak) => peak.id === "everest");
const everestDeck = deckAt(
  everest.elev_m,
  LEVELS.map((level) => ({ z: everest.levels[level].z[sample], c: everest.levels[level].c[sample] })),
);
let wet = 0;
for (const row of file.rain) wet = Math.max(wet, ...row);
console.log(
  JSON.stringify(
    {
      fetched_at: file.fetched_at,
      hours: times.length,
      from: times[0],
      to: times[times.length - 1],
      grid: grid.length,
      reaches: reaches.length,
      peaks: peaks.length,
      max_rain_tenths: wet,
      everest_at: times[sample],
      everest: everestDeck,
      everest_temp_c: everest.temp[sample] == null ? null : everest.temp[sample] / 10,
      track_points: track?.points?.length ?? 0,
      track_error,
      last_track: track?.points?.slice(-2) ?? null,
      over_nepal: track?.over_nepal ?? null,
    },
    null,
    2,
  ),
);

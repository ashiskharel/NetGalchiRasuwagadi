import * as satellite from "satellite.js";
import corridor from "../data/corridor.json";
import spacecraft from "../data/spacecraft.json";

declare const L: {
  map: (el: HTMLElement, opts: object) => MapHandle;
  tileLayer: (url: string, opts: object) => TileHandle;
  imageOverlay: (url: string, b: [[number, number], [number, number]], opts: object) => OverlayHandle;
  circleMarker: (ll: [number, number], opts: object) => Layer;
  rectangle: (b: [[number, number], [number, number]], opts: object) => Layer;
};

interface MapHandle {
  setView: (ll: [number, number], z: number) => MapHandle;
  removeLayer: (l: Layer | OverlayHandle) => void;
}
interface TileHandle {
  addTo: (m: MapHandle) => TileHandle;
  setUrl?: (u: string) => void;
  options: { time?: string };
}
interface OverlayHandle {
  addTo: (m: MapHandle) => OverlayHandle;
}
interface Layer {
  addTo: (m: MapHandle) => Layer;
  bindPopup: (html: string) => Layer;
}

type Tle = { OBJECT_NAME?: string; TLE_LINE1?: string; TLE_LINE2?: string };
type S1Still = {
  date: string;
  startTime: string;
  platform: string;
  direction: string;
  browse: string;
  south: number;
  west: number;
  north: number;
  east: number;
  scene: string;
};

const AOI: [[number, number], [number, number]] = [
  [spacecraft.aoi.south, spacecraft.aoi.west],
  [spacecraft.aoi.north, spacecraft.aoi.east],
];
const OBS = spacecraft.observer;
const MIN_EL = spacecraft.minElevationDeg;
const RE = 6378.137;
const GEO_H = 35786;

function rad(d: number) {
  return (d * Math.PI) / 180;
}
function deg(r: number) {
  return (r * 180) / Math.PI;
}

function waitForLeaflet(): Promise<void> {
  if (typeof L !== "undefined") return Promise.resolve();
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const t = setInterval(() => {
      if (typeof L !== "undefined") {
        clearInterval(t);
        resolve();
      } else if (Date.now() - started > 8000) {
        clearInterval(t);
        reject(new Error("leaflet"));
      }
    }, 40);
  });
}

function shiftDay(iso: string, delta: number, min: string, max: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  const next = d.toISOString().slice(0, 10);
  if (next < min) return min;
  if (next > max) return max;
  return next;
}

function gibsUrl(time: string): string {
  return `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_SNPP_CorrectedReflectance_TrueColor/default/${time}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`;
}

function geoLookFromSlot(slotEast: number) {
  const lat = rad(OBS.lat);
  const dlon = rad(slotEast - OBS.lng);
  const gamma = Math.acos(Math.max(-1, Math.min(1, Math.cos(lat) * Math.cos(dlon))));
  const el = Math.atan2(Math.cos(gamma) - RE / (RE + GEO_H), Math.sin(gamma));
  const az = Math.atan2(Math.sin(dlon), Math.cos(lat) * Math.tan(0) - Math.sin(lat) * Math.cos(dlon));
  return {
    lat: 0,
    lng: ((slotEast + 540) % 360) - 180,
    alt: GEO_H,
    elevation: deg(el),
    azimuth: (deg(az) + 360) % 360,
    orbit: "geo" as const,
  };
}

function lookFromEci(position: { x: number; y: number; z: number }, gmst: number) {
  const observerGd = {
    longitude: rad(OBS.lng),
    latitude: rad(OBS.lat),
    height: OBS.heightKm,
  };
  const positionEcf = satellite.eciToEcf(position, gmst);
  const look = satellite.ecfToLookAngles(observerGd, positionEcf);
  return { elevation: deg(look.elevation), azimuth: (deg(look.azimuth) + 360) % 360 };
}

function propagate(row: Tle, when: Date, orbit: string) {
  const a = row.TLE_LINE1;
  const b = row.TLE_LINE2;
  if (!a || !b) return null;
  const satrec = satellite.twoline2satrec(a, b);
  const pv = satellite.propagate(satrec, when);
  if (!pv.position) return null;
  const gmst = satellite.gstime(when);
  const geo = satellite.eciToGeodetic(pv.position, gmst);
  const lat = satellite.degreesLat(geo.latitude);
  const lng = satellite.degreesLong(geo.longitude);
  const alt = geo.height;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  const look = lookFromEci(pv.position, gmst);
  return {
    name: (row.OBJECT_NAME || "").trim(),
    lat,
    lng,
    alt,
    elevation: look.elevation,
    azimuth: look.azimuth,
    orbit,
  };
}

async function loadTles(base: string): Promise<{ tle: Tle; orbit: string; slotEast?: number; name: string }[]> {
  const packed: { tle: Tle; orbit: string; slotEast?: number; name: string }[] = [];
  for (const sat of spacecraft.satellites) {
    let tle: Tle | null = null;
    try {
      const res = await fetch(`https://db.satnogs.org/api/tle/?norad_cat_id=${sat.norad}`, {
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const data = (await res.json()) as { tle0?: string; tle1?: string; tle2?: string }[];
        const row = Array.isArray(data) ? data[0] : data;
        if (row?.tle1 && row?.tle2) {
          tle = {
            OBJECT_NAME: String(row.tle0 || sat.name).replace(/^0 /, ""),
            TLE_LINE1: row.tle1,
            TLE_LINE2: row.tle2,
          };
        }
      }
    } catch {
      /* fallback below */
    }
    packed.push({
      tle: tle || { OBJECT_NAME: sat.name },
      orbit: sat.orbit,
      slotEast: sat.slotEast,
      name: sat.name,
      nation: sat.nation,
      group: sat.group,
      feed: sat.feed,
      feedLabel: sat.feedLabel,
    });
  }
  if (packed.some((p) => p.tle.TLE_LINE1)) return packed;
  try {
    const res = await fetch(`${base}/data/tles.json`);
    if (!res.ok) return packed;
    const data = (await res.json()) as { records?: Tle[] };
    const byName = new Map((data.records || []).map((r) => [r.OBJECT_NAME, r]));
    return packed.map((p) => ({ ...p, tle: byName.get(p.name) || p.tle }));
  } catch {
    return packed;
  }
}

type S1Catalog = { stills: S1Still[] };

async function loadS1(base: string): Promise<S1Still[]> {
  const wkt = `POLYGON((${spacecraft.aoi.west} ${spacecraft.aoi.south},${spacecraft.aoi.east} ${spacecraft.aoi.south},${spacecraft.aoi.east} ${spacecraft.aoi.north},${spacecraft.aoi.west} ${spacecraft.aoi.north},${spacecraft.aoi.west} ${spacecraft.aoi.south}))`;
  const live = `https://api.daac.asf.alaska.edu/services/search/param?platform=SENTINEL-1&processingLevel=GRD_HD&beamMode=IW&intersectsWith=${encodeURIComponent(wkt)}&start=${spacecraft.imageryStart}T00:00:00Z&maxResults=80&output=geojson`;
  const urls = [live, `${base}/data/sentinel1.json`];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = (await res.json()) as S1Catalog | { features?: { properties: Record<string, unknown>; geometry?: { coordinates?: number[][][] } }[] };
      if ("stills" in data && Array.isArray(data.stills)) return data.stills;
      const feats = "features" in data ? data.features || [] : [];
      return normalizeS1(feats);
    } catch {
      /* next */
    }
  }
  return [];
}

function normalizeS1(
  feats: { properties: Record<string, unknown>; geometry?: { coordinates?: number[][][] } }[],
): S1Still[] {
  const stills: S1Still[] = [];
  const seen = new Set<string>();
  for (const f of feats) {
    const p = f.properties || {};
    const start = String(p.startTime || p.starttime || "");
    const date = start.slice(0, 10);
    if (!date || seen.has(date)) continue;
    const browse = Array.isArray(p.browse) ? String(p.browse[0] || "") : String(p.browse || "");
    if (!browse) continue;
    const ring = f.geometry?.coordinates?.[0] || [];
    const lons = ring.map((c) => c[0]);
    const lats = ring.map((c) => c[1]);
    if (!lons.length) continue;
    seen.add(date);
    stills.push({
      date,
      startTime: start,
      platform: String(p.platform || "Sentinel-1"),
      direction: String(p.flightDirection || ""),
      browse,
      south: Math.min(...lats),
      west: Math.min(...lons),
      north: Math.max(...lats),
      east: Math.max(...lons),
      scene: String(p.sceneName || ""),
    });
  }
  stills.sort((a, b) => a.date.localeCompare(b.date));
  return stills;
}

function nearestStill(stills: S1Still[], date: string): S1Still | null {
  if (!stills.length) return null;
  const exact = stills.find((s) => s.date === date);
  if (exact) return exact;
  const before = [...stills].reverse().find((s) => s.date <= date);
  return before || stills[0];
}

async function initMap() {
  const el = document.getElementById("sat-map");
  if (!el) return;
  await waitForLeaflet();
  const dateInput = document.getElementById("sat-date") as HTMLInputElement | null;
  const pre = el.dataset.pre || "2026-08-25";
  const start = el.dataset.start || "2026-08-26";
  const max = dateInput?.max || new Date().toISOString().slice(0, 10);
  const base = el.dataset.base || "";

  const map = L.map(el, { scrollWheelZoom: false }).setView([28.12, 85.32], 9);
  L.rectangle(AOI, { color: "#b42318", weight: 2, fill: false }).addTo(map);
  for (const p of corridor.places) {
    if (p.lat == null || p.lng == null) continue;
    L.circleMarker([p.lat, p.lng], {
      radius: 4,
      color: "#1a1a18",
      weight: 1,
      fillColor: "#f4efe6",
      fillOpacity: 1,
    })
      .addTo(map)
      .bindPopup(p.name_en);
  }

  let time = dateInput?.value || start;
  const gibs = L.tileLayer(gibsUrl(time), {
    time,
    tileSize: 256,
    maxNativeZoom: 9,
    maxZoom: 13,
    attribution: "NASA GIBS / VIIRS SNPP",
  }).addTo(map);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap",
    opacity: 0.28,
    maxZoom: 13,
  }).addTo(map);

  const stills = await loadS1(base);
  let radar: OverlayHandle | null = null;

  function showRadar(still: S1Still | null) {
    if (radar) {
      map.removeLayer(radar);
      radar = null;
    }
    if (!still) return;
    radar = L.imageOverlay(still.browse, [
      [still.south, still.west],
      [still.north, still.east],
    ], { opacity: 0.72, attribution: "ASF / Sentinel-1" }).addTo(map);
  }

  function paintThumbs(active: string) {
    const strip = document.getElementById("s1-stills");
    if (!strip) return;
    if (!stills.length) {
      strip.innerHTML = `<p class="note">${strip.dataset.empty || ""}</p>`;
      return;
    }
    strip.innerHTML = stills
      .map((s) => {
        const on = s.date === active || s.date === nearestStill(stills, active)?.date;
        return `<button type="button" class="s1-thumb${on ? " is-on" : ""}" data-date="${s.date}" title="${s.platform} ${s.date}">
          <img src="${s.browse}" alt="Sentinel-1 ${s.date}" width="120" height="80" />
          <span>${s.date}<br />${s.platform.replace("Sentinel-", "S-")}</span>
        </button>`;
      })
      .join("");
    strip.querySelectorAll<HTMLButtonElement>(".s1-thumb").forEach((btn) => {
      btn.addEventListener("click", () => {
        const d = btn.dataset.date;
        if (d) applyDate(d);
      });
    });
  }

  function applyDate(next: string) {
    time = next;
    if (dateInput) dateInput.value = next;
    if (typeof gibs.setUrl === "function") gibs.setUrl(gibsUrl(next));
    gibs.options.time = next;
    showRadar(nearestStill(stills, next));
    paintThumbs(next);
  }

  document.getElementById("sat-prev")?.addEventListener("click", () => applyDate(shiftDay(time, -1, pre, max)));
  document.getElementById("sat-next")?.addEventListener("click", () => applyDate(shiftDay(time, 1, pre, max)));
  dateInput?.addEventListener("change", () => {
    if (dateInput.value) applyDate(dateInput.value);
  });

  const playBtn = document.getElementById("sat-play") as HTMLButtonElement | null;
  let timer: number | null = null;
  playBtn?.addEventListener("click", () => {
    if (timer != null) {
      window.clearInterval(timer);
      timer = null;
      playBtn.textContent = playBtn.dataset.play || "Play";
      return;
    }
    applyDate(pre);
    playBtn.textContent = playBtn.dataset.stop || "Stop";
    timer = window.setInterval(() => {
      const n = shiftDay(time, 1, pre, max);
      applyDate(n);
      if (n >= max && timer != null) {
        window.clearInterval(timer);
        timer = null;
        playBtn.textContent = playBtn.dataset.play || "Play";
      }
    }, 900);
  });

  applyDate(time);
}

async function initLive() {
  const box = document.getElementById("sat-live");
  const mapEl = document.getElementById("sat-map");
  if (!box) return;
  const ui = JSON.parse(box.dataset.ui || "{}") as {
    loading: string;
    error: string;
    noneNear: string;
    altKm: string;
    elev: string;
    az: string;
    leo: string;
    geo: string;
    openFeed: string;
  };
  const base = mapEl?.dataset.base || "";
  const catalog = await loadTles(base);
  if (!catalog.length) {
    box.textContent = ui.error;
    return;
  }

  const list = document.createElement("div");
  box.replaceChildren(list);

  const tick = () => {
    const now = new Date();
    const rows: {
      name: string;
      lat: number;
      lng: number;
      alt: number;
      elevation: number;
      azimuth: number;
      orbit: string;
      nation: string;
      group: string;
      feed?: string;
      feedLabel?: string;
    }[] = [];
    for (const item of catalog) {
      let pos = item.tle.TLE_LINE1 ? propagate(item.tle, now, item.orbit) : null;
      if (!pos && item.orbit === "geo" && item.slotEast != null) {
        const g = geoLookFromSlot(item.slotEast);
        pos = { name: item.name, ...g };
      }
      if (!pos || pos.elevation < MIN_EL) continue;
      rows.push({
        ...pos,
        nation: item.nation,
        group: item.group,
        feed: item.feed,
        feedLabel: item.feedLabel,
      });
    }
    rows.sort((a, b) => b.elevation - a.elevation);
    if (!rows.length) {
      list.innerHTML = `<p class="note">${ui.noneNear}</p>`;
      return;
    }
    const leo = rows.filter((r) => r.orbit !== "geo");
    const geo = rows.filter((r) => r.orbit === "geo");
    const esc = (s: string) =>
      String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/"/g, "&quot;");
    const card = (r: (typeof rows)[0]) => {
      const cls = r.orbit === "geo" ? "unknown" : "up";
      const inner = `<h3>${esc(r.name)}</h3>
        <p class="note">${esc(r.nation)}${r.group ? ` · ${esc(r.group)}` : ""}</p>
        <p class="note">${ui.elev} ${r.elevation.toFixed(0)}° · ${ui.az} ${r.azimuth.toFixed(0)}° · ${ui.altKm} ${r.alt.toFixed(0)}
        <br />nadir ${r.lat.toFixed(1)}°, ${r.lng.toFixed(1)}°</p>
        ${r.feed ? `<p class="note"><strong>${esc(ui.openFeed)}</strong>${r.feedLabel ? ` — ${esc(r.feedLabel)}` : ""}</p>` : ""}`;
      if (r.feed) {
        return `<a class="card sat-card ${cls}" href="${esc(r.feed)}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
      }
      return `<article class="card ${cls}">${inner}</article>`;
    };
    list.innerHTML = `${leo.length ? `<h3>${ui.leo}</h3><div class="grid chips">${leo.map(card).join("")}</div>` : ""}
      ${geo.length ? `<h3>${ui.geo}</h3><div class="grid chips">${geo.map(card).join("")}</div>` : ""}`;
  };

  tick();
  window.setInterval(tick, 4000);
}

initMap().catch(() => {
  const el = document.getElementById("sat-map");
  if (el) el.textContent = "Map failed to load.";
});
initLive();

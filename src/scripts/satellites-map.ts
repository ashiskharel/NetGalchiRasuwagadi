import * as satellite from "satellite.js";
import corridor from "../data/corridor.json";
import spacecraft from "../data/spacecraft.json";

declare const L: {
  map: (el: HTMLElement, opts: object) => MapHandle;
  tileLayer: (url: string, opts: object) => TileHandle;
  circleMarker: (ll: [number, number], opts: object) => Layer;
  rectangle: (b: [[number, number], [number, number]], opts: object) => Layer;
  latLngBounds: (a: [number, number], b: [number, number]) => unknown;
};

interface MapHandle {
  setView: (ll: [number, number], z: number) => MapHandle;
  fitBounds: (b: unknown, opts?: object) => void;
  removeLayer: (l: Layer) => void;
}
interface TileHandle {
  addTo: (m: MapHandle) => TileHandle;
  setUrl?: (u: string) => void;
  options: { time?: string };
}
interface Layer {
  addTo: (m: MapHandle) => Layer;
  bindPopup: (html: string) => Layer;
  setLatLng?: (ll: [number, number]) => void;
}

type Tle = { OBJECT_NAME?: string; object_name?: string; TLE_LINE1?: string; TLE_LINE2?: string; tle_line1?: string; tle_line2?: string };

const AOI: [[number, number], [number, number]] = [
  [27.78, 84.98],
  [28.45, 85.65],
];
const NEAR_DEG = 6;

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

function nameOf(row: Tle): string {
  return (row.OBJECT_NAME || row.object_name || "").trim();
}

function linesOf(row: Tle): [string, string] | null {
  const a = row.TLE_LINE1 || row.tle_line1;
  const b = row.TLE_LINE2 || row.tle_line2;
  if (a && b) return [a, b];
  return null;
}

function inNear(lat: number, lng: number): boolean {
  const [[minLat, minLng], [maxLat, maxLng]] = AOI;
  return lat >= minLat - NEAR_DEG && lat <= maxLat + NEAR_DEG && lng >= minLng - NEAR_DEG && lng <= maxLng + NEAR_DEG;
}

async function loadTles(base: string): Promise<Tle[]> {
  const out: Tle[] = [];
  for (const sat of spacecraft.satellites) {
    try {
      const res = await fetch(`https://db.satnogs.org/api/tle/?norad_cat_id=${sat.norad}`, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) continue;
      const data = (await res.json()) as { tle0?: string; tle1?: string; tle2?: string }[];
      const row = Array.isArray(data) ? data[0] : data;
      if (!row?.tle1 || !row?.tle2) continue;
      out.push({
        OBJECT_NAME: String(row.tle0 || sat.name).replace(/^0 /, ""),
        TLE_LINE1: row.tle1,
        TLE_LINE2: row.tle2,
      });
    } catch {
      /* next */
    }
  }
  if (out.length) return out;
  try {
    const res = await fetch(`${base}/data/tles.json`);
    if (!res.ok) return [];
    const data = (await res.json()) as { records?: Tle[] };
    return data.records || [];
  } catch {
    return [];
  }
}

function propagate(row: Tle, when: Date) {
  const lines = linesOf(row);
  if (!lines) return null;
  const satrec = satellite.twoline2satrec(lines[0], lines[1]);
  const pv = satellite.propagate(satrec, when);
  if (!pv.position) return null;
  const gmst = satellite.gstime(when);
  const geo = satellite.eciToGeodetic(pv.position, gmst);
  const lat = satellite.degreesLat(geo.latitude);
  const lng = satellite.degreesLong(geo.longitude);
  const alt = geo.height;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { name: nameOf(row), lat, lng, alt };
}

async function initMap() {
  const el = document.getElementById("sat-map");
  if (!el) return;
  await waitForLeaflet();
  const dateInput = document.getElementById("sat-date") as HTMLInputElement | null;
  const pre = el.dataset.pre || "2026-08-25";
  const start = el.dataset.start || "2026-08-26";
  const max = dateInput?.max || new Date().toISOString().slice(0, 10);

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

  function applyDate(next: string) {
    time = next;
    if (dateInput) dateInput.value = next;
    if (typeof gibs.setUrl === "function") gibs.setUrl(gibsUrl(next));
    gibs.options.time = next;
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
  };
  const base = mapEl?.dataset.base || "";
  let catalog: Tle[] = [];
  try {
    catalog = await loadTles(base);
  } catch {
    box.textContent = ui.error;
    return;
  }
  if (!catalog.length) {
    box.textContent = ui.error;
    return;
  }

  const list = document.createElement("div");
  list.className = "grid chips";
  box.replaceChildren(list);

  const tick = () => {
    const now = new Date();
    const rows: { name: string; lat: number; lng: number; alt: number }[] = [];
    for (const tle of catalog) {
      const pos = propagate(tle, now);
      if (!pos || !inNear(pos.lat, pos.lng)) continue;
      rows.push(pos);
    }
    rows.sort((a, b) => a.name.localeCompare(b.name));
    if (!rows.length) {
      list.innerHTML = `<p class="note">${ui.noneNear}</p>`;
      return;
    }
    list.innerHTML = rows
      .map(
        (r) =>
          `<article class="card"><h3>${r.name}</h3><p class="note">${r.lat.toFixed(2)}°, ${r.lng.toFixed(2)}° · ${ui.altKm} ${r.alt.toFixed(0)}</p></article>`,
      )
      .join("");
  };

  tick();
  window.setInterval(tick, 4000);
}

initMap().catch(() => {
  const el = document.getElementById("sat-map");
  if (el) el.textContent = "Map failed to load.";
});
initLive();

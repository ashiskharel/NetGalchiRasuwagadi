import reachesFile from "../data/reaches.json";
import watchFile from "../data/flood-watch.json";
import { assess, worst, type Level } from "../lib/flood";

interface LeafletNs {
  map: (el: HTMLElement, opts: object) => MapHandle;
  tileLayer: ((url: string, opts: object) => TileLayer) & {
    wms: (url: string, opts: object) => TileLayer;
  };
  geoJSON: (data: unknown, opts: object) => GeoLayer;
  polyline: (ll: [number, number][], opts: object) => Layer;
  circleMarker: (ll: [number, number], opts: object) => Layer;
}

declare const L: LeafletNs;

interface MapHandle {
  setView: (ll: [number, number], z: number) => MapHandle;
  fitBounds: (b: [number, number][], opts?: object) => void;
  removeLayer: (layer: unknown) => void;
}

interface TileLayer {
  addTo: (m: MapHandle) => TileLayer;
  setParams: (p: object) => void;
}

interface Layer {
  addTo: (m: MapHandle) => Layer;
  bindPopup: (html: string) => Layer;
  on: (ev: string, fn: (e: { target: Layer }) => void) => void;
}

interface GeoLayer extends Layer {
  eachLayer: (fn: (layer: { feature?: { properties?: Record<string, string> }; setStyle: (s: object) => void }) => void) => void;
  resetStyle: (layer: unknown) => void;
}

const COLOR: Record<Level, string> = {
  quiet: "#1b7f4e",
  watch: "#c47b00",
  danger: "#b42318",
};

type Reach = (typeof reachesFile.reaches)[number];
type Hydro = (typeof watchFile.reaches)[string];

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

function hydroOf(id: string): Hydro {
  return watchFile.reaches[id as keyof typeof watchFile.reaches];
}

function provinceLevel(id: string): Level {
  const levels = reachesFile.reaches
    .filter((r) => r.province === id || (r.also as string[]).includes(id))
    .map((r) => assess(r, hydroOf(r.id) as never).level);
  return worst(levels);
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
}

async function init() {
  const el = document.getElementById("flood-map");
  if (!el) return;
  const lang = el.dataset.lang === "ne" ? "ne" : "en";
  const base = (el.dataset.base ?? "").replace(/\/$/, "");
  try {
    await waitForLeaflet();
  } catch {
    el.replaceChildren(document.createTextNode(lang === "ne" ? "नक्सा खुलेन।" : "Map library failed to load."));
    return;
  }

  const map = L.map(el, { scrollWheelZoom: false }).setView([28.2, 84.1], 7);
  const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap",
    maxZoom: 16,
  }).addTo(map);

  const gibs = L.tileLayer.wms("https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi", {
    layers: "VIIRS_NOAA20_CorrectedReflectance_TrueColor",
    format: "image/jpeg",
    transparent: false,
    version: "1.1.1",
    time: "2026-10-28",
    attribution: "NASA GIBS / VIIRS",
  });

  const dateInput = document.getElementById("gibs-date") as HTMLInputElement | null;
  const gibsToggle = document.getElementById("gibs-toggle") as HTMLInputElement | null;
  const syncGibs = () => {
    const on = gibsToggle?.checked ?? false;
    if (on) {
      map.removeLayer(osm as unknown as Layer);
      gibs.addTo(map);
      gibs.setParams({ time: dateInput?.value || "2026-10-28" });
    } else {
      map.removeLayer(gibs as unknown as Layer);
      osm.addTo(map);
    }
  };
  gibsToggle?.addEventListener("change", syncGibs);
  dateInput?.addEventListener("change", syncGibs);

  const byIso = Object.fromEntries(reachesFile.provinces.map((p) => [p.iso, p.id]));
  let provinces: GeoLayer | null = null;
  try {
    const res = await fetch(`${base}/data/provinces.geojson`);
    if (!res.ok) throw new Error(String(res.status));
    const geo = await res.json();
    provinces = L.geoJSON(geo, {
      style: (feature: { properties?: { shapeISO?: string } }) => {
        const id = byIso[feature?.properties?.shapeISO ?? ""] ?? "";
        const level = provinceLevel(id);
        return { color: COLOR[level], weight: 1.5, fillColor: COLOR[level], fillOpacity: 0.28 };
      },
      onEachFeature: (feature: { properties?: { shapeISO?: string } }, layer: Layer) => {
        const id = byIso[feature?.properties?.shapeISO ?? ""] ?? "";
        const prov = reachesFile.provinces.find((p) => p.id === id);
        const name = lang === "ne" ? prov?.name_ne : prov?.name_en;
        const level = provinceLevel(id);
        const rows = reachesFile.reaches
          .filter((r) => r.province === id || (r.also as string[]).includes(id))
          .map((r) => {
            const a = assess(r, hydroOf(r.id) as never);
            const river = lang === "ne" ? r.river_ne : r.river_en;
            return `<li><a href="#reach-${r.id}">${esc(river)}</a> — ${esc(levelWord(a.level, lang))}</li>`;
          })
          .join("");
        layer.bindPopup(`<strong>${esc(name ?? id)}</strong><p>${esc(levelWord(level, lang))}</p><ul>${rows}</ul>`);
      },
    }).addTo(map);
    const bounds: [number, number][] = [];
    for (const r of reachesFile.reaches) {
      for (const p of r.line) bounds.push(p as [number, number]);
    }
    if (bounds.length) map.fitBounds(bounds, { padding: [16, 16] });
  } catch {
    /* markers still draw */
  }

  for (const reach of reachesFile.reaches) {
    const a = assess(reach, hydroOf(reach.id) as never);
    const line = reach.line as [number, number][];
    L.polyline(line, { color: COLOR[a.level], weight: 4, opacity: 0.9 }).addTo(map);
    const exit = line[line.length - 1];
    const river = lang === "ne" ? reach.river_ne : reach.river_en;
    L.circleMarker(exit, {
      radius: 7,
      color: "#1c1915",
      weight: 1,
      fillColor: COLOR[a.level],
      fillOpacity: 0.95,
    })
      .addTo(map)
      .bindPopup(
        `<strong>${esc(river)}</strong><br>${esc(levelWord(a.level, lang))}<br><a href="#reach-${reach.id}">${
          lang === "ne" ? "विवरण" : "Details"
        }</a>`,
      );
  }

  void provinces;
}

function levelWord(level: Level, lang: "en" | "ne"): string {
  if (lang === "ne") return level === "danger" ? "खतरा" : level === "watch" ? "सतर्क" : "शान्त";
  return level === "danger" ? "Danger" : level === "watch" ? "Watch" : "Quiet";
}

void init();

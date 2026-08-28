import corridor from "../data/corridor.json";
import sitesFile from "../data/sites.json";

type Place = (typeof corridor.places)[number];

declare const L: {
  map: (el: HTMLElement, opts: object) => MapHandle;
  tileLayer: (url: string, opts: object) => { addTo: (m: MapHandle) => void };
  circleMarker: (ll: [number, number], opts: object) => Layer;
  polyline: (ll: [number, number][], opts: object) => Layer;
};

interface MapHandle {
  setView: (ll: [number, number], z: number) => MapHandle;
  fitBounds: (b: [number, number][], opts: object) => void;
}

interface Layer {
  addTo: (m: MapHandle) => Layer;
  bindPopup: (html: string) => Layer;
}

const STATUS_COLOR: Record<string, string> = {
  up: "#1b7f4e",
  degraded: "#c47b00",
  down: "#b42318",
  unknown: "#5c5c5c",
  unlicensed: "#5b3d99",
};

const TECH_DASH: Record<string, string> = {
  fiber: "1",
  microwave: "8 8",
  "cross-border": "1",
  "south-gateway": "4 6",
};

function placeById(id: string): Place | undefined {
  return corridor.places.find((p) => p.id === id);
}

function dual(nameEn: string, nameNe: string, lang: string): string {
  return lang === "ne" ? `${nameNe} (${nameEn})` : `${nameEn} (${nameNe})`;
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

async function init() {
  const el = document.getElementById("corridor-map");
  if (!el) return;
  const lang = el.dataset.lang ?? "en";
  try {
    await waitForLeaflet();
  } catch {
    el.replaceChildren(document.createTextNode("Map library failed to load."));
    return;
  }

  const map = L.map(el, { scrollWheelZoom: false }).setView([28.05, 85.35], 8);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap",
    maxZoom: 16,
  }).addTo(map);

  const bounds: [number, number][] = [];

  for (const place of corridor.places) {
    if (place.lat == null || place.lng == null) continue;
    bounds.push([place.lat, place.lng]);
    L.circleMarker([place.lat, place.lng], {
      radius: 6,
      color: "#1a1a18",
      weight: 1,
      fillColor: "#f4efe6",
      fillOpacity: 1,
    })
      .addTo(map)
      .bindPopup(dual(place.name_en, place.name_ne, lang));
  }

  for (const seg of corridor.segments) {
    if (seg.pointOnly) continue;
    const hopIds = [seg.from, ...(seg.via ?? []), seg.to];
    const latlngs = hopIds
      .map((id) => placeById(id))
      .filter((p): p is Place => p?.lat != null && p.lng != null)
      .map((p) => [p.lat as number, p.lng as number] as [number, number]);
    if (latlngs.length < 2) continue;
    L.polyline(latlngs, {
      color: STATUS_COLOR[seg.status] ?? "#5c5c5c",
      weight: seg.tech === "microwave" ? 3 : 4,
      opacity: 0.9,
      dashArray: TECH_DASH[seg.tech] ?? "1",
    })
      .addTo(map)
      .bindPopup(lang === "ne" ? seg.title_ne : seg.title_en);
  }

  for (const site of sitesFile.sites) {
    if (site.lat == null || site.lng == null) continue;
    bounds.push([site.lat, site.lng]);
    L.circleMarker([site.lat, site.lng], {
      radius: 5,
      color: STATUS_COLOR[site.status] ?? "#5c5c5c",
      weight: 2,
      fillColor: STATUS_COLOR[site.status] ?? "#5c5c5c",
      fillOpacity: 0.85,
    })
      .addTo(map)
      .bindPopup(`${dual(site.name_en, site.name_ne, lang)} · ${site.operator}`);
  }

  if (bounds.length) map.fitBounds(bounds, { padding: [28, 28] });
}

init();

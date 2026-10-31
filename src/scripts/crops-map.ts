import agri from "../data/agri.json";

interface LatLng {
  lat: number;
  lng: number;
}

interface MapHandle {
  setView: (ll: [number, number], z: number) => MapHandle;
  fitBounds: (b: [[number, number], [number, number]], opts?: object) => void;
  on: (ev: string, fn: (e: { latlng: LatLng }) => void) => void;
  getCenter: () => LatLng;
}

interface Layer {
  addTo: (m: MapHandle) => Layer;
  remove: () => void;
  bindPopup: (html: string) => Layer;
  on: (ev: string, fn: () => void) => Layer;
}

interface LeafletNs {
  map: (el: HTMLElement, opts: object) => MapHandle;
  tileLayer: (url: string, opts: object) => { addTo: (m: MapHandle) => void };
  circleMarker: (ll: [number, number], opts: object) => Layer;
  rectangle: (b: [[number, number], [number, number]], opts: object) => Layer;
}

declare const L: LeafletNs;

interface Box {
  id: number;
  south: number;
  west: number;
  north: number;
  east: number;
  layer: Layer;
}

interface Ui {
  locWait: string;
  locOk: string;
  locDeny: string;
  locMissing: string;
  drawFirst: string;
  drawSecond: string;
  drawDone: string;
  noBox: string;
  copied: string;
  copyFail: string;
  boxLabel: string;
  use: string;
  remove: string;
  lakeBox: string;
  lakeShore: string;
  copernicus: string;
  worldview: string;
  eobrowser: string;
  planet: string;
  skywatch: string;
  up42: string;
}

const GIBS_DAY = "2026-10-30";

function round(n: number): string {
  return n.toFixed(5);
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => {
    if (ch === "&") return "&amp;";
    if (ch === "<") return "&lt;";
    if (ch === ">") return "&gt;";
    if (ch === '"') return "&quot;";
    return "&#39;";
  });
}

function centerOf(box: Box): { lat: number; lng: number } {
  return { lat: (box.south + box.north) / 2, lng: (box.west + box.east) / 2 };
}

function makeBox(a: LatLng, b: LatLng): Omit<Box, "id" | "layer"> {
  return {
    south: Math.min(a.lat, b.lat),
    north: Math.max(a.lat, b.lat),
    west: Math.min(a.lng, b.lng),
    east: Math.max(a.lng, b.lng),
  };
}

function linksFor(box: Box): { href: string; label: string; buy: boolean }[] {
  const c = centerOf(box);
  const lat = round(c.lat);
  const lng = round(c.lng);
  const wv = `https://worldview.earthdata.nasa.gov/?v=${box.west},${box.south},${box.east},${box.north}&l=VIIRS_SNPP_CorrectedReflectance_TrueColor,Coastlines_15m&t=${GIBS_DAY}-T00%3A00%3A00Z`;
  return [
    {
      href: `https://browser.dataspace.copernicus.eu/?zoom=14&lat=${lat}&lng=${lng}&datasetId=S2_L2A_CDAS`,
      label: "copernicus",
      buy: false,
    },
    { href: wv, label: "worldview", buy: false },
    {
      href: `https://apps.sentinel-hub.com/eo-browser/?zoom=13&lat=${lat}&lng=${lng}`,
      label: "eobrowser",
      buy: false,
    },
    {
      href: `https://www.planet.com/explorer/#/center/${lng},${lat}/zoom/14`,
      label: "planet",
      buy: true,
    },
    { href: "https://explore.skywatch.com/", label: "skywatch", buy: true },
    { href: "https://up42.com/marketplace", label: "up42", buy: true },
  ];
}

function boot(): void {
  const el = document.getElementById("crop-map");
  const uiEl = document.getElementById("crop-ui");
  if (!el || !uiEl) return;
  const ui = JSON.parse(uiEl.textContent || "{}") as Ui;
  const status = document.getElementById("crop-status");
  const list = document.getElementById("crop-boxes");
  const linkRow = document.getElementById("crop-links");
  const locBtn = document.getElementById("crop-loc");
  const drawBtn = document.getElementById("crop-draw");
  const copyBtn = document.getElementById("crop-copy");

  const map = L.map(el, { scrollWheelZoom: false }).setView([28.15, 84.6], 7);
  L.tileLayer(
    `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_SNPP_CorrectedReflectance_TrueColor/default/${GIBS_DAY}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`,
    {
      attribution: "NASA GIBS / VIIRS SNPP",
      maxNativeZoom: 9,
      maxZoom: 14,
    },
  ).addTo(map);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap",
    opacity: 0.35,
    maxZoom: 14,
  }).addTo(map);

  const boxes: Box[] = [];
  let nextId = 1;
  let selected = 0;
  let drawMode = false;
  let first: LatLng | null = null;
  const lang = el.dataset.lang === "ne" ? "ne" : "en";

  function say(text: string): void {
    if (status) status.textContent = text;
  }

  function paintLinks(): void {
    if (!linkRow) return;
    linkRow.replaceChildren();
    const box = boxes.find((item) => item.id === selected);
    if (!box) {
      const note = document.createElement("p");
      note.className = "note";
      note.textContent = ui.noBox;
      linkRow.append(note);
      return;
    }
    const labels: Record<string, string> = {
      copernicus: ui.copernicus,
      worldview: ui.worldview,
      eobrowser: ui.eobrowser,
      planet: ui.planet,
      skywatch: ui.skywatch,
      up42: ui.up42,
    };
    for (const link of linksFor(box)) {
      const a = document.createElement("a");
      a.className = link.buy ? "btn" : "btn secondary";
      a.href = link.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = labels[link.label] || link.label;
      linkRow.append(a);
    }
  }

  function paintList(): void {
    if (!list) return;
    list.replaceChildren();
    for (const box of boxes) {
      const li = document.createElement("li");
      const c = centerOf(box);
      const label = document.createElement("span");
      label.textContent = `${ui.boxLabel} ${box.id}: ${round(c.lat)}, ${round(c.lng)}`;
      const use = document.createElement("button");
      use.type = "button";
      use.className = "btn secondary";
      use.textContent = ui.use;
      use.addEventListener("click", () => {
        selected = box.id;
        map.fitBounds(
          [
            [box.south, box.west],
            [box.north, box.east],
          ],
          { padding: [20, 20] },
        );
        paintLinks();
      });
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "btn secondary";
      remove.textContent = ui.remove;
      remove.addEventListener("click", () => {
        box.layer.remove();
        const index = boxes.findIndex((item) => item.id === box.id);
        if (index >= 0) boxes.splice(index, 1);
        if (selected === box.id) selected = boxes.at(-1)?.id ?? 0;
        paintList();
        paintLinks();
      });
      li.append(label, use, remove);
      list.append(li);
    }
    paintLinks();
  }

  function addBox(raw: Omit<Box, "id" | "layer">, sayDone: boolean): void {
    const id = nextId++;
    const layer = L.rectangle(
      [
        [raw.south, raw.west],
        [raw.north, raw.east],
      ],
      { color: "#b42318", weight: 2, fillColor: "#b42318", fillOpacity: 0.12 },
    ).addTo(map);
    const box: Box = { id, ...raw, layer };
    boxes.push(box);
    selected = id;
    layer.on("click", () => {
      selected = id;
      paintLinks();
    });
    paintList();
    if (sayDone) say(ui.drawDone);
  }

  for (const lake of agri.lakes) {
    const name = lang === "ne" ? lake.name_ne : lake.name_en;
    L.circleMarker([lake.lat, lake.lng], {
      radius: 7,
      color: "#1a1a18",
      weight: 1,
      fillColor: "#1d4e89",
      fillOpacity: 0.9,
    })
      .addTo(map)
      .bindPopup(
        `<div><strong>${escapeHtml(name)}</strong><br>${escapeHtml(ui.lakeShore)}<br><button type="button" data-lake-box="${escapeHtml(lake.id)}">${escapeHtml(ui.lakeBox)}</button></div>`,
      );
  }

  el.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const id = target.closest("[data-lake-box]")?.getAttribute("data-lake-box");
    if (!id) return;
    const lake = agri.lakes.find((item) => item.id === id);
    if (!lake) return;
    event.stopPropagation();
    addBox(
      {
        south: lake.lat - 0.02,
        north: lake.lat + 0.02,
        west: lake.lng - 0.02,
        east: lake.lng + 0.02,
      },
      true,
    );
  });

  locBtn?.addEventListener("click", () => {
    if (!navigator.geolocation) {
      say(ui.locMissing);
      return;
    }
    say(ui.locWait);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        map.setView([pos.coords.latitude, pos.coords.longitude], 13);
        say(ui.locOk);
      },
      () => say(ui.locDeny),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
    );
  });

  drawBtn?.addEventListener("click", () => {
    drawMode = true;
    first = null;
    drawBtn?.setAttribute("aria-pressed", "true");
    say(ui.drawFirst);
  });

  map.on("click", (event) => {
    if (!drawMode) return;
    if (!first) {
      first = event.latlng;
      say(ui.drawSecond);
      return;
    }
    const raw = makeBox(first, event.latlng);
    if (Math.abs(raw.north - raw.south) < 0.0002 && Math.abs(raw.east - raw.west) < 0.0002) {
      say(ui.drawSecond);
      return;
    }
    first = null;
    drawMode = false;
    drawBtn?.setAttribute("aria-pressed", "false");
    addBox(raw, true);
  });

  copyBtn?.addEventListener("click", async () => {
    const box = boxes.find((item) => item.id === selected);
    if (!box) {
      say(ui.noBox);
      return;
    }
    const c = centerOf(box);
    const text = `${round(c.lat)}, ${round(c.lng)}\n${round(box.south)}, ${round(box.west)}, ${round(box.north)}, ${round(box.east)}`;
    try {
      await navigator.clipboard.writeText(text);
      say(ui.copied);
    } catch {
      say(`${ui.copyFail} ${text}`);
    }
  });

  say(ui.noBox);
  paintLinks();
}

boot();

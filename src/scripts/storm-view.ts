import reachesFile from "../data/reaches.json";
import watchFile from "../data/flood-watch.json";
import { assess, formatMinutes, type Level } from "../lib/flood";
import { deckAt, LEVELS } from "../lib/cloud-deck.mjs";

interface Point {
  x: number;
  y: number;
}

interface MapHandle {
  setView: (ll: [number, number], z: number) => MapHandle;
  fitBounds: (b: [number, number][], opts?: object) => void;
  createPane: (name: string) => HTMLElement;
  getSize: () => Point;
  containerPointToLayerPoint: (p: [number, number]) => Point;
  latLngToContainerPoint: (ll: [number, number]) => Point;
  on: (ev: string, fn: () => void) => void;
  invalidateSize: () => void;
}

interface Marker {
  addTo: (m: MapHandle) => Marker;
  bindPopup: (html: string) => Marker;
  setStyle: (style: object) => void;
  setPopupContent: (html: string) => void;
  getPopup: () => { isOpen: () => boolean } | undefined;
}

interface LeafletNs {
  map: (el: HTMLElement, opts: object) => MapHandle;
  tileLayer: (url: string, opts: object) => { addTo: (m: MapHandle) => void };
  geoJSON: (data: unknown, opts: object) => { addTo: (m: MapHandle) => void };
  circleMarker: (ll: [number, number], opts: object) => Marker;
  DomUtil: { setPosition: (el: HTMLElement, p: Point) => void };
}

declare const L: LeafletNs;

type DeckState = "clear" | "under" | "in" | "above" | "between";

interface TrackPoint {
  time: string;
  lat: number;
  lng: number;
  wind_ms: number;
  status_en: string;
  status_ne: string;
  observed: boolean;
}

interface Peak {
  id: string;
  name_en: string;
  name_ne: string;
  lat: number;
  lng: number;
  elev_m: number;
  low: number[];
  mid: number[];
  high: number[];
  temp: (number | null)[];
  rain: number[];
  levels: Record<string, { z: (number | null)[]; c: (number | null)[] }>;
}

interface ReachSeries {
  id: string;
  lat: number;
  lng: number;
  low: number[];
  mid: number[];
  high: number[];
  rain: number[];
}

interface CloudFile {
  fetched_at: string;
  times: string[];
  grid: [number, number][];
  low: number[][];
  mid: number[][];
  high: number[][];
  rain: number[][];
  reaches: ReachSeries[];
  peaks: Peak[];
  track: {
    note_en: string;
    note_ne: string;
    points: TrackPoint[];
    over_nepal: boolean;
  } | null;
  track_error: string | null;
  live: {
    forecast: string;
    grid_model: string;
    grid_hourly: string;
    peak_model: string;
    peak_hourly: string;
    forecast_days: number;
    timezone: string;
  };
}

interface HourRead {
  level: Level;
  dayMm: number;
  burst: number;
  capped: boolean;
  exitMin: number | null;
  exitSource: "published" | "desk";
  disagree: boolean;
}

const LEVEL_COLOR: Record<Level, string> = {
  quiet: "#1b7f4e",
  watch: "#c47b00",
  danger: "#b42318",
};

const PEAK_FILL: Record<DeckState, string> = {
  clear: "#d9f0e4",
  under: "#d7e8fb",
  in: "#3f3a34",
  above: "#fffcf7",
  between: "#f7e7c1",
};

function waitForLeaflet(): Promise<void> {
  if (typeof L !== "undefined") return Promise.resolve();
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const timer = setInterval(() => {
      if (typeof L !== "undefined") {
        clearInterval(timer);
        resolve();
      } else if (Date.now() - started > 8000) {
        clearInterval(timer);
        reject(new Error("leaflet"));
      }
    }, 40);
  });
}

function esc(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch] ?? ch);
}

function neDigits(value: string): string {
  return value.replace(/\d/g, (digit) => "०१२३४५६७८९"[Number(digit)]);
}

function nptMs(iso: string): number {
  const [date, time] = iso.split("T");
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = (time ?? "00:00").split(":").map(Number);
  return Date.UTC(year, month - 1, day, hour, minute || 0) - (5 * 60 + 45) * 60 * 1000;
}

function fmtWhen(iso: string, ne: boolean): string {
  const [date, time] = iso.split("T");
  const [, month, day] = date.split("-").map(Number);
  const hm = (time ?? "00:00").slice(0, 5);
  const months = ne
    ? ["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जुन", "जुलाई", "अगस्ट", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर"]
    : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const line = `${day} ${months[month - 1]} ${hm}`;
  return ne ? `${neDigits(line)} नेपाली समय` : `${line} NPT`;
}

function indexNow(times: string[]): number {
  const now = Date.now();
  let index = 0;
  for (let i = 0; i < times.length; i++) if (nptMs(times[i]) <= now) index = i;
  return index;
}

function forecastUrl(live: CloudFile["live"], params: Record<string, string>): string {
  const parts = Object.entries(params).map(
    ([key, value]) => `${key}=${encodeURIComponent(value).replace(/%2C/g, ",")}`,
  );
  return `${live.forecast}?${parts.join("&")}`;
}

async function getJson(url: string): Promise<unknown> {
  const res = await fetch(url, { signal: AbortSignal.timeout(25000) });
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

function asList(data: unknown): { hourly: Record<string, (number | null)[]> & { time: string[] } }[] {
  const list = Array.isArray(data) ? data : [data];
  if (!list.length || !list[0] || typeof list[0] !== "object" || !("hourly" in list[0])) {
    throw new Error("shape");
  }
  return list as { hourly: Record<string, (number | null)[]> & { time: string[] } }[];
}

function ints(values: (number | null)[], scale = 1): number[] {
  return values.map((value) => (value == null || Number.isNaN(value) ? 0 : Math.round(value * scale)));
}

function nullableInts(values: (number | null)[], scale = 1): (number | null)[] {
  return values.map((value) => (value == null || Number.isNaN(value) ? null : Math.round(value * scale)));
}

async function fetchLive(base: CloudFile): Promise<CloudFile> {
  const { live } = base;
  const samples = base.grid.concat(base.reaches.map((reach) => [reach.lat, reach.lng] as [number, number]));
  const gridUrl = forecastUrl(live, {
    latitude: samples.map((p) => p[0]).join(","),
    longitude: samples.map((p) => p[1]).join(","),
    hourly: live.grid_hourly,
    models: live.grid_model,
    forecast_days: String(live.forecast_days),
    timezone: live.timezone,
  });
  const peakUrl = forecastUrl(live, {
    latitude: base.peaks.map((peak) => peak.lat).join(","),
    longitude: base.peaks.map((peak) => peak.lng).join(","),
    elevation: base.peaks.map((peak) => peak.elev_m).join(","),
    hourly: live.peak_hourly,
    models: live.peak_model,
    forecast_days: String(live.forecast_days),
    timezone: live.timezone,
  });
  const [gridBody, peakBody] = await Promise.all([getJson(gridUrl), getJson(peakUrl)]);
  const gridList = asList(gridBody);
  const peakList = asList(peakBody);
  if (gridList.length !== samples.length || peakList.length !== base.peaks.length) throw new Error("count");
  const times = gridList[0].hourly.time;
  if (!times?.length || peakList[0].hourly.time.length !== times.length) throw new Error("time");
  const surface = gridList.map((block) => ({
    low: ints(block.hourly.cloud_cover_low),
    mid: ints(block.hourly.cloud_cover_mid),
    high: ints(block.hourly.cloud_cover_high),
    rain: ints(block.hourly.precipitation, 10),
  }));
  const gridN = base.grid.length;
  return {
    ...base,
    fetched_at: new Date().toISOString(),
    times,
    low: surface.slice(0, gridN).map((cell) => cell.low),
    mid: surface.slice(0, gridN).map((cell) => cell.mid),
    high: surface.slice(0, gridN).map((cell) => cell.high),
    rain: surface.slice(0, gridN).map((cell) => cell.rain),
    reaches: base.reaches.map((reach, index) => ({ ...reach, ...surface[gridN + index] })),
    peaks: base.peaks.map((peak, index) => {
      const hourly = peakList[index].hourly;
      const levels: Peak["levels"] = {};
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
    }),
  };
}

function hydroOf(id: string) {
  return watchFile.reaches[id as keyof typeof watchFile.reaches];
}

function readHour(reach: (typeof reachesFile.reaches)[number], series: ReachSeries, times: string[], hour: number): HourRead {
  const hydro = hydroOf(reach.id);
  const judged = assess(reach, hydro as never);
  const day = times[hour].slice(0, 10);
  let dayMm = 0;
  for (let i = 0; i <= hour; i++) if (times[i].slice(0, 10) === day) dayMm += series.rain[i] / 10;
  let burst = 0;
  for (let i = Math.max(0, hour - 2); i <= hour; i++) burst += series.rain[i] / 10;
  const danger = dayMm >= reach.danger_mm || burst >= reach.burst_danger_mm;
  const watch = dayMm >= reach.watch_mm || burst >= reach.burst_watch_mm;
  let level: Level = "quiet";
  if (danger) level = judged.disagree ? "watch" : "danger";
  else if (watch) level = "watch";
  return {
    level,
    dayMm: Math.round(dayMm * 10) / 10,
    burst: Math.round(burst * 10) / 10,
    capped: danger && judged.disagree,
    exitMin: judged.exit_min,
    exitSource: judged.exit_source,
    disagree: judged.disagree,
  };
}

function deckOf(peak: Peak, hour: number) {
  const levels = LEVELS.map((level) => {
    const row = peak.levels[String(level)];
    return { z: row?.z[hour] ?? Number.NaN, c: row?.c[hour] ?? Number.NaN };
  });
  return deckAt(peak.elev_m, levels) as { base_m: number | null; top_m: number | null; state: DeckState };
}

function radiusPx(map: MapHandle, lat: number, lng: number, meters: number): number {
  const origin = map.latLngToContainerPoint([lat, lng]);
  const dLng = meters / (111320 * Math.cos((lat * Math.PI) / 180));
  const shifted = map.latLngToContainerPoint([lat, lng + dLng]);
  return Math.abs(shifted.x - origin.x);
}

function trackAt(points: TrackPoint[], ms: number): (TrackPoint & { ended: boolean }) | null {
  if (!points.length) return null;
  const last = points[points.length - 1];
  if (ms >= Date.parse(last.time)) return { ...last, ended: true };
  if (ms <= Date.parse(points[0].time)) return { ...points[0], ended: false };
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const start = Date.parse(a.time);
    const end = Date.parse(b.time);
    if (ms <= end) {
      const t = (ms - start) / (end - start);
      return {
        ...b,
        lat: a.lat + (b.lat - a.lat) * t,
        lng: a.lng + (b.lng - a.lng) * t,
        observed: a.observed && b.observed,
        ended: false,
      };
    }
  }
  return { ...last, ended: true };
}

async function init() {
  const root = document.getElementById("storm-root");
  const mapEl = document.getElementById("storm-map");
  if (!root || !mapEl) return;
  const ne = root.dataset.lang === "ne";
  const base = (root.dataset.base ?? "").replace(/\/$/, "");
  const copy = ne
    ? {
        play: "चलाउनुहोस्",
        pause: "रोक्नुहोस्",
        saved: "सेभ गरिएको ECMWF रन",
        live: "Open-Meteo बाट अद्यावधिक",
        noShort: "यो घण्टा कुनै छोटो नदी वर्षाको रेखामाथि छैन।",
        laterRun: "यो रनमा पछि",
        probable: "सम्भावित असर — निकास ३ घण्टाभित्र",
        also: "रेखा काटेका, निकास लामो",
        inCloud: "बादलको तहभित्रका टुप्पो",
        noneIn: "यो घण्टा ५०% को तहभित्र कुनै टुप्पो छैन।",
        snow: "हिउँ",
        heaviest: "यो घण्टाको सबैभन्दा भारी कोष्ठ",
        capped: "ECMWF ले खतरा रेखा काट्छ। मोडेल बाझिएकाले सतर्कमै।",
        measured: "मापन",
        desk: "डेस्क छाल",
        day: "आज",
        burst: "३ घण्टा",
        mapFail: "नक्सा खुलेन।",
        missing: "बादलको फाइल खुलेन। सेभ गरिएको रन छैन।",
        states: {
          clear: "५०% को तह छैन",
          under: "तहको बेस टुप्पोभन्दा माथि",
          in: "टुप्पो तहभित्र",
          above: "टुप्पो तहभन्दा माथि",
          between: "दुई तहको बिचमा खाली",
        } as Record<DeckState, string>,
        forecast: "पूर्वानुमान",
        observed: "अवलोकित",
        ended: "बुलेटिनको पूर्वानुमान यहीँ सकिन्छ",
      }
    : {
        play: "Play",
        pause: "Pause",
        saved: "Saved ECMWF run",
        live: "Updated from Open-Meteo",
        noShort: "No short river is over its rain line this hour.",
        laterRun: "Later in this run",
        probable: "Probable impact — exit under 3 hours",
        also: "Over the line, longer exit",
        inCloud: "Summits inside a cloud deck",
        noneIn: "No listed summit is inside a 50% deck this hour.",
        snow: "snow",
        heaviest: "Heaviest cell this hour",
        capped: "ECMWF crosses its danger line. Kept at watch because the models disagree.",
        measured: "measured",
        desk: "desk wave",
        day: "today",
        burst: "3 h",
        mapFail: "Map library failed to load.",
        missing: "The cloud file did not load.",
        states: {
          clear: "No 50% deck",
          under: "Deck base is above the summit",
          in: "Summit is inside the deck",
          above: "Summit is above the deck",
          between: "Clear air between two decks",
        } as Record<DeckState, string>,
        forecast: "forecast",
        observed: "observed",
        ended: "This advisory’s forecast ends here",
      };

  const playBtn = document.getElementById("storm-play");
  const range = document.getElementById("storm-range") as HTMLInputElement | null;
  const when = document.getElementById("storm-when");
  const badge = document.getElementById("storm-live");
  const impact = document.getElementById("storm-impact");
  const trackBox = document.getElementById("storm-track");
  const trackNote = document.getElementById("storm-track-note");

  let model: CloudFile;
  try {
    const res = await fetch(`${base}/data/clouds.json`);
    if (!res.ok) throw new Error(String(res.status));
    model = (await res.json()) as CloudFile;
  } catch {
    if (impact) impact.textContent = copy.missing;
    return;
  }

  let hour = indexNow(model.times);
  let playing = false;
  let timer = 0;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setBadge(live: boolean) {
    if (!badge) return;
    badge.textContent = live ? copy.live : copy.saved;
    badge.className = live ? "badge up" : "badge unknown";
  }
  setBadge(false);

  function stop() {
    playing = false;
    window.clearInterval(timer);
    if (playBtn) playBtn.textContent = copy.play;
  }

  function start() {
    if (hour >= model.times.length - 1) hour = 0;
    playing = true;
    if (playBtn) playBtn.textContent = copy.pause;
    timer = window.setInterval(() => {
      if (hour >= model.times.length - 1) {
        stop();
        render();
        return;
      }
      hour += 1;
      render();
    }, 700);
  }

  playBtn?.addEventListener("click", () => {
    if (playing) stop();
    else start();
  });
  range?.addEventListener("input", () => {
    stop();
    hour = Number(range.value);
    render();
  });

  let map: MapHandle | null = null;
  let canvas: HTMLCanvasElement | null = null;
  const reachMarkers: { id: string; marker: Marker }[] = [];
  const peakMarkers: { id: string; marker: Marker }[] = [];

  try {
    await waitForLeaflet();
    map = L.map(mapEl, { scrollWheelZoom: false }).setView([28.3, 84.4], 7);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
      maxZoom: 12,
    }).addTo(map);
    const pane = map.createPane("stormclouds");
    pane.style.zIndex = "350";
    pane.style.pointerEvents = "none";
    canvas = document.createElement("canvas");
    canvas.style.pointerEvents = "none";
    pane.appendChild(canvas);
    map.fitBounds(
      [
        [26.35, 80.05],
        [30.45, 88.2],
      ],
      { padding: [12, 12] },
    );
    map.on("move", draw);
    map.on("zoom", draw);
    map.on("resize", draw);
    try {
      const gj = await fetch(`${base}/data/provinces.geojson`);
      if (gj.ok) {
        L.geoJSON(await gj.json(), {
          interactive: false,
          style: { color: "#1a1a18", weight: 1.1, fillOpacity: 0 },
        }).addTo(map);
      }
    } catch {
      /* The country outline is optional. The field still draws. */
    }
    const reachById = new Map(model.reaches.map((reach) => [reach.id, reach]));
    for (const reach of reachesFile.reaches) {
      const series = reachById.get(reach.id);
      if (!series) continue;
      const marker = L.circleMarker([series.lat, series.lng], {
        pane: "markerPane",
        radius: 5,
        weight: 1,
        color: "#fffcf7",
        fillColor: LEVEL_COLOR.quiet,
        fillOpacity: 0.95,
      })
        .addTo(map)
        .bindPopup("");
      reachMarkers.push({ id: reach.id, marker });
    }
    for (const peak of model.peaks) {
      const marker = L.circleMarker([peak.lat, peak.lng], {
        pane: "markerPane",
        radius: peak.elev_m >= 8000 ? 7 : 5,
        weight: 1.5,
        color: "#1a1a18",
        fillColor: PEAK_FILL.clear,
        fillOpacity: 0.95,
      })
        .addTo(map)
        .bindPopup("");
      peakMarkers.push({ id: peak.id, marker });
    }
    requestAnimationFrame(() => {
      map?.invalidateSize();
      draw();
    });
  } catch {
    mapEl.replaceChildren(document.createTextNode(copy.mapFail));
  }

  function draw() {
    if (!map || !canvas) return;
    const size = map.getSize();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    L.DomUtil.setPosition(canvas, map.containerPointToLayerPoint([0, 0]));
    canvas.style.width = `${size.x}px`;
    canvas.style.height = `${size.y}px`;
    canvas.width = Math.round(size.x * dpr);
    canvas.height = Math.round(size.y * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size.x, size.y);
    const bands: { key: "low" | "mid" | "high"; rgb: string; radius: number; gain: number }[] = [
      { key: "low", rgb: "70, 78, 88", radius: 34000, gain: 0.45 },
      { key: "mid", rgb: "150, 162, 176", radius: 24000, gain: 0.4 },
      { key: "high", rgb: "255, 255, 255", radius: 16000, gain: 0.55 },
    ];
    for (const band of bands) {
      const rows = model[band.key];
      model.grid.forEach((ll, index) => {
        const cover = rows[index]?.[hour] ?? 0;
        if (cover < 8) return;
        const at = map!.latLngToContainerPoint(ll);
        const radius = radiusPx(map!, ll[0], ll[1], band.radius);
        if (radius < 2) return;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${band.rgb}, ${Math.min(band.gain, (cover / 100) * band.gain)})`;
        ctx.arc(at.x, at.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    const paintRain = (ll: [number, number], tenths: number, strong: boolean) => {
      const mm = tenths / 10;
      if (mm < 0.3) return;
      const at = map!.latLngToContainerPoint(ll);
      const radius = radiusPx(map!, ll[0], ll[1], (strong ? 7000 : 8000) + mm * (strong ? 6000 : 9000));
      if (radius < 2) return;
      ctx.beginPath();
      ctx.fillStyle = `rgba(20, 68, 130, ${Math.min(0.78, (strong ? 0.4 : 0.25) + mm / 14)})`;
      ctx.arc(at.x, at.y, radius, 0, Math.PI * 2);
      ctx.fill();
    };
    model.grid.forEach((ll, index) => paintRain(ll, model.rain[index]?.[hour] ?? 0, false));
    for (const reach of model.reaches) paintRain([reach.lat, reach.lng], reach.rain[hour] ?? 0, true);
  }

  function renderTrack() {
    if (!trackBox) return;
    const points = model.track?.points ?? [];
    if (!points.length) {
      trackBox.textContent = model.track_error ? model.track_error : ne ? "ट्र्याक फाइलमा छैन।" : "No track in the file.";
      return;
    }
    const width = 640;
    const height = 250;
    const xOf = (lng: number) => ((lng - 79) / 12) * width;
    const yOf = (lat: number) => ((31 - lat) / 16) * height;
    const line = (rows: TrackPoint[]) => rows.map((point) => `${xOf(point.lng).toFixed(1)},${yOf(point.lat).toFixed(1)}`).join(" ");
    const split = points.findIndex((point) => !point.observed);
    const observed = split === -1 ? points : points.slice(0, split);
    const forecast = split === -1 ? [] : points.slice(Math.max(split - 1, 0));
    const spot = trackAt(points, nptMs(model.times[hour]));
    const nx = xOf(80.05);
    const ny = yOf(30.45);
    const nw = xOf(88.2) - nx;
    const nh = yOf(26.35) - ny;
    const label = spot ? `${ne ? spot.status_ne : spot.status_en}${spot.observed ? "" : ` · ${copy.forecast}`}` : "";
    const lx = spot ? Math.min(xOf(spot.lng) + 8, width - 180) : 0;
    const ly = spot ? Math.max(yOf(spot.lat) - 8, 16) : 0;
    trackBox.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img">
      <rect width="${width}" height="${height}" fill="#f7f4ee"/>
      <rect x="${nx.toFixed(1)}" y="${ny.toFixed(1)}" width="${nw.toFixed(1)}" height="${nh.toFixed(1)}" fill="#d9f0e4" stroke="#1b7f4e" stroke-width="1.4"/>
      <text x="${(nx + 8).toFixed(1)}" y="${(ny + 18).toFixed(1)}" fill="#1a1a18" font-size="14" font-family="sans-serif">${ne ? "नेपाल" : "Nepal"}</text>
      <polyline points="${line(observed)}" fill="none" stroke="#9f1239" stroke-width="2.5"/>
      <polyline points="${line(forecast)}" fill="none" stroke="#9f1239" stroke-width="2.5" stroke-dasharray="7 5"/>
      ${points
        .map((point) => {
          const fill = point.observed ? "#9f1239" : "none";
          return `<circle cx="${xOf(point.lng).toFixed(1)}" cy="${yOf(point.lat).toFixed(1)}" r="${point.observed ? 3.5 : 3}" fill="${fill}" stroke="#9f1239" stroke-width="1.4"/>`;
        })
        .join("")}
      ${
        spot
          ? `<circle cx="${xOf(spot.lng).toFixed(1)}" cy="${yOf(spot.lat).toFixed(1)}" r="${Math.max(5, Math.min(14, 4 + spot.wind_ms / 6)).toFixed(1)}" fill="#b42318" fill-opacity="0.85" stroke="#fffcf7" stroke-width="1.5"/>
             <text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" fill="#1a1a18" font-size="13" font-family="sans-serif">${esc(label)}</text>`
          : ""
      }
    </svg>`;
    if (trackNote) trackNote.textContent = ne ? model.track?.note_ne ?? "" : model.track?.note_en ?? "";
  }

  function renderImpact() {
    if (!impact) return;
    const reachById = new Map(model.reaches.map((reach) => [reach.id, reach]));
    const hits: { reach: (typeof reachesFile.reaches)[number]; read: HourRead }[] = [];
    for (const reach of reachesFile.reaches) {
      const series = reachById.get(reach.id);
      if (!series) continue;
      const read = readHour(reach, series, model.times, hour);
      if (read.level !== "quiet") hits.push({ reach, read });
    }
    hits.sort((a, b) => (a.read.exitMin ?? 9999) - (b.read.exitMin ?? 9999));
    const probable = hits.filter((hit) => (hit.read.exitMin ?? 9999) <= 180);
    const later = hits.filter((hit) => (hit.read.exitMin ?? 9999) > 180);
    const inDeck: string[] = [];
    const snow: string[] = [];
    for (const peak of model.peaks) {
      const deck = deckOf(peak, hour);
      const name = ne ? peak.name_ne : peak.name_en;
      const temp = peak.temp[hour];
      const snowing = temp != null && temp < 0 && peak.rain[hour] > 0;
      if (deck.state === "in") inDeck.push(snowing ? `${name} (${copy.snow})` : name);
      else if (snowing) snow.push(name);
    }
    let wet = 0;
    let wetAt: [number, number] = [0, 0];
    model.rain.forEach((row, index) => {
      const value = row[hour] ?? 0;
      if (value > wet) {
        wet = value;
        wetAt = model.grid[index];
      }
    });
    const item = (hit: (typeof hits)[number]) => {
      const name = ne ? hit.reach.river_ne : hit.reach.river_en;
      const source = hit.read.exitSource === "published" ? copy.measured : copy.desk;
      return `<li class="storm-hit"><span class="badge ${hit.read.level}">${hit.read.level === "danger" ? (ne ? "खतरा" : "Danger") : ne ? "सतर्क" : "Watch"}</span> <a href="#reach-${hit.reach.id}"><strong>${esc(name)}</strong></a> — ${esc(formatMinutes(hit.read.exitMin, ne ? "ne" : "en"))} (${esc(source)}). ${copy.day} ${hit.read.dayMm} mm, ${copy.burst} ${hit.read.burst} mm.${hit.read.capped ? ` ${esc(copy.capped)}` : ""}</li>`;
    };
    const blocks = [
      `<p><strong>${esc(copy.probable)}</strong></p>`,
      probable.length ? `<ul class="list-plain">${probable.map(item).join("")}</ul>` : `<p>${esc(copy.noShort)}</p>`,
    ];
    if (later.length) {
      blocks.push(`<p><strong>${esc(copy.also)}</strong></p><ul class="list-plain">${later.map(item).join("")}</ul>`);
    }
    const already = new Set(probable.map((hit) => hit.reach.id));
    const ahead: { reach: (typeof reachesFile.reaches)[number]; read: HourRead; when: string }[] = [];
    for (const reach of reachesFile.reaches) {
      if (already.has(reach.id)) continue;
      const series = reachById.get(reach.id);
      if (!series) continue;
      const exitMin = readHour(reach, series, model.times, hour).exitMin;
      if ((exitMin ?? 9999) > 180) continue;
      for (let step = hour + 1; step < model.times.length; step++) {
        const read = readHour(reach, series, model.times, step);
        if (read.level === "quiet") continue;
        ahead.push({ reach, read, when: model.times[step] });
        break;
      }
    }
    ahead.sort((a, b) => a.when.localeCompare(b.when));
    if (ahead.length) {
      const rows = ahead
        .map((hit) => {
          const name = ne ? hit.reach.river_ne : hit.reach.river_en;
          return `<li class="storm-hit"><a href="#reach-${hit.reach.id}"><strong>${esc(name)}</strong></a> — ${esc(fmtWhen(hit.when, ne))}. ${hit.read.dayMm} mm, ${copy.burst} ${hit.read.burst} mm.</li>`;
        })
        .join("");
      blocks.push(`<p><strong>${esc(copy.laterRun)}</strong></p><ul class="list-plain">${rows}</ul>`);
    }
    blocks.push(
      `<p><strong>${esc(copy.inCloud)}</strong></p><p>${inDeck.length ? esc(inDeck.join(", ")) : esc(copy.noneIn)}${snow.length ? ` ${esc(ne ? "तहबाहिर हिउँ" : "Snow outside the deck")}: ${esc(snow.join(", "))}.` : ""}</p>`,
    );
    if (wet >= 5) {
      blocks.push(`<p class="note">${esc(copy.heaviest)}: ${(wet / 10).toFixed(1)} mm · ${wetAt[0].toFixed(1)}°N ${wetAt[1].toFixed(1)}°E</p>`);
    }
    impact.innerHTML = blocks.join("");
  }

  function renderMarkers() {
    const reachById = new Map(model.reaches.map((reach) => [reach.id, reach]));
    for (const row of reachMarkers) {
      const reach = reachesFile.reaches.find((item) => item.id === row.id);
      const series = reachById.get(row.id);
      if (!reach || !series) continue;
      const read = readHour(reach, series, model.times, hour);
      row.marker.setStyle({ fillColor: LEVEL_COLOR[read.level] });
      const name = ne ? reach.river_ne : reach.river_en;
      const html = `<strong>${esc(name)}</strong><br>${copy.day} ${read.dayMm} mm<br>${copy.burst} ${read.burst} mm<br>${esc(formatMinutes(read.exitMin, ne ? "ne" : "en"))}`;
      row.marker.setPopupContent(html);
    }
    for (const row of peakMarkers) {
      const peak = model.peaks.find((item) => item.id === row.id);
      if (!peak) continue;
      const deck = deckOf(peak, hour);
      row.marker.setStyle({ fillColor: PEAK_FILL[deck.state] ?? PEAK_FILL.clear });
      const name = ne ? peak.name_ne : peak.name_en;
      const range = deck.base_m == null ? "—" : `${deck.base_m.toLocaleString("en-US")}–${deck.top_m?.toLocaleString("en-US")} m`;
      const temp = peak.temp[hour] == null ? "—" : `${(peak.temp[hour]! / 10).toFixed(1)}°C`;
      const html = `<strong>${esc(name)}</strong> · ${peak.elev_m.toLocaleString("en-US")} m<br>${esc(copy.states[deck.state])}<br>${range}<br>${ne ? "तल्लो" : "Low"} ${peak.low[hour]}% · ${ne ? "मध्यम" : "Mid"} ${peak.mid[hour]}% · ${ne ? "उच्च" : "High"} ${peak.high[hour]}%<br>${temp} · ${(peak.rain[hour] / 10).toFixed(1)} mm`;
      row.marker.setPopupContent(html);
    }
  }

  function render() {
    if (hour < 0) hour = 0;
    if (hour >= model.times.length) hour = model.times.length - 1;
    if (range) {
      range.max = String(model.times.length - 1);
      range.value = String(hour);
    }
    if (when) when.textContent = fmtWhen(model.times[hour], ne);
    if (playBtn && !playBtn.textContent) playBtn.textContent = copy.play;
    draw();
    renderTrack();
    renderImpact();
    renderMarkers();
  }

  render();
  if (!reduce) start();

  try {
    const next = await fetchLive(model);
    const sameClock = next.times[0] === model.times[0] && next.times.length === model.times.length;
    model = next;
    if (!sameClock) hour = indexNow(model.times);
    setBadge(true);
    render();
  } catch {
    setBadge(false);
  }
}

void init();

import hydro from "../data/hydro.json";

interface MapHandle {
  setView: (ll: [number, number], z: number) => MapHandle;
}
interface Layer {
  addTo: (m: MapHandle | LayerGroup) => Layer;
  bindPopup: (html: string) => Layer;
}
interface LayerGroup {
  addTo: (m: MapHandle) => LayerGroup;
  clearLayers: () => void;
}
interface LeafletNs {
  map: (el: HTMLElement, opts: object) => MapHandle;
  tileLayer: (url: string, opts: object) => { addTo: (m: MapHandle) => void };
  circleMarker: (ll: [number, number], opts: object) => Layer;
  layerGroup: () => LayerGroup;
}
declare const L: LeafletNs;

interface Project {
  id: string;
  name: string;
  status: string;
  capacity_mw: number | null;
  district: string | null;
  promoter: string | null;
  cod_year_ad_approx: number | null;
  lat: number | null;
  lon: number | null;
  nepse_symbol: string | null;
  tier?: string;
}

const COLORS: Record<string, string> = {
  operating: "#1b7f3b",
  "historic / operating (NEA)": "#6a1b9a",
  "operating (NEA, Wikipedia)": "#1b7f3b",
  "generation licence (not yet operating)": "#d97706",
  "survey licence": "#2563eb",
  "GoN studied / project bank": "#0891b2",
};

function color(status: string): string {
  return COLORS[status] ?? "#9ca3af";
}

const TIER_VARS: Record<string, string> = { verified: "--up", partial: "--degraded", risky: "--down", unlinked: "--unknown" };
function tierColor(tier: string | undefined): string {
  const v = TIER_VARS[tier ?? "unlinked"] ?? "--unknown";
  return getComputedStyle(document.documentElement).getPropertyValue(v).trim() || "#5c5c5c";
}

function esc(s: unknown): string {
  return String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c);
}

function init(): void {
  const el = document.getElementById("hydro-map");
  const sel = document.getElementById("hydro-filter") as HTMLSelectElement | null;
  const listed = document.getElementById("hydro-listed") as HTMLInputElement | null;
  const count = document.getElementById("hydro-count");
  const tierSel = document.getElementById("hydro-tier") as HTMLSelectElement | null;
  const colorBy = document.getElementById("hydro-colorby") as HTMLSelectElement | null;
  if (!el || typeof L === "undefined") return;
  const map = L.map(el, { scrollWheelZoom: false }).setView([28.3, 84.1], 7);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
  const group = L.layerGroup().addTo(map);
  const projects = hydro.projects as Project[];

  function draw(): void {
    group.clearLayers();
    const want = sel?.value ?? "operating";
    const onlyListed = listed?.checked ?? false;
    let n = 0;
    for (const p of projects) {
      if (p.lat == null || p.lon == null) continue;
      if (want === "operating" && !p.status.startsWith("operating") && !p.status.startsWith("historic")) continue;
      if (want !== "all" && want !== "operating" && p.status !== want) continue;
      if (onlyListed && !p.nepse_symbol) continue;
      const tw = tierSel?.value ?? "all";
      if (tw !== "all" && (p.tier ?? "unlinked") !== tw) continue;
      const c = (colorBy?.value ?? "tier") === "tier" ? tierColor(p.tier) : color(p.status);
      const mw = p.capacity_mw ?? 0;
      const r = Math.max(3, Math.min(14, 3 + Math.sqrt(mw)));
      L.circleMarker([p.lat, p.lon], { radius: r, color: c, fillColor: c, weight: 1, fillOpacity: 0.6 })
        .bindPopup(
          `<strong>${esc(p.name)}</strong><br>${esc(p.status)}<br>${esc(p.capacity_mw)} MW · ${esc(p.district)}<br>` +
            `${esc(p.promoter)}${p.cod_year_ad_approx ? `<br>COD ≈ ${esc(p.cod_year_ad_approx)}` : ""}` +
            `${p.nepse_symbol ? `<br>NEPSE: <strong>${esc(p.nepse_symbol)}</strong>` : ""}` +
            `<br>Tier: ${esc(p.tier ?? "unlinked")}`,
        )
        .addTo(group);
      n += 1;
    }
    if (count) count.textContent = String(n);
  }
  sel?.addEventListener("change", draw);
  listed?.addEventListener("change", draw);
  tierSel?.addEventListener("change", draw);
  colorBy?.addEventListener("change", draw);
  // company list filter
  const coSel = document.getElementById("company-tier") as HTMLSelectElement | null;
  const coCount = document.getElementById("company-count");
  function filterCompanies(): void {
    const want = coSel?.value ?? "all";
    let k = 0;
    document.querySelectorAll<HTMLElement>("[data-tier-row]").forEach((row) => {
      const show = want === "all" || row.dataset.tier === want;
      row.hidden = !show;
      if (show && row.tagName === "DETAILS") k += 1;
    });
    if (coCount) coCount.textContent = String(k);
  }
  coSel?.addEventListener("change", filterCompanies);
  filterCompanies();
  draw();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();

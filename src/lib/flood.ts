export type Level = "quiet" | "watch" | "danger";

export interface DayRain {
  date: string;
  ecmwf_mm: number;
  gfs_mm: number;
  icon_mm: number;
  ecmwf_1h_mm: number;
  ecmwf_3h_mm: number;
}

export interface Hydro {
  length_km: number;
  slope: number | null;
  speed_ms: number | null;
  wave_speed_ms: number | null;
  parcel_min: number | null;
  wave_min: number | null;
  depth_m: number;
  manning_n: number;
  elevation_up_m: number;
  elevation_down_m: number;
  daily: DayRain[];
  era5?: {
    october_p95_mm?: number;
    october_max_mm?: number;
    october_max_date?: string;
    october_days_ge_50?: number;
    october_days_ge_100?: number;
    monsoon_p95_mm?: number;
    record_mm?: number;
    error?: string;
  } | null;
  glofas?: {
    trust: string;
    daily: { date: string; m3s: number }[];
  } | null;
}

export interface ReachLike {
  id: string;
  regime: string;
  watch_mm: number;
  danger_mm: number;
  burst_watch_mm: number;
  burst_danger_mm: number;
  province: string;
  also?: string[];
  published?: { exit_min?: number | null; speed_ms?: number | null } | null;
  glofas_trust: string;
}

export interface GlofasRead {
  baseline_m3s: number;
  baseline_date: string;
  peak_m3s: number;
  peak_date: string;
  rise: number;
}

export interface Assessment {
  level: Level;
  reasons: string[];
  peak: DayRain;
  two_day_ecmwf_mm: number;
  spread_mm: number;
  disagree: boolean;
  exit_min: number | null;
  exit_source: "published" | "desk";
  glofas: GlofasRead | null;
}

const WINDOW_START = "2026-10-29";
const WINDOW_END = "2026-11-01";

export function inWindow(date: string): boolean {
  return date >= WINDOW_START && date <= WINDOW_END;
}

export function assess(reach: ReachLike, hydro: Hydro): Assessment {
  const days = hydro.daily.filter((d) => inWindow(d.date));
  const peak = days.reduce((best, day) => (day.ecmwf_mm > best.ecmwf_mm ? day : best), days[0]);
  const friday = days.find((d) => d.date === "2026-10-30");
  const saturday = days.find((d) => d.date === "2026-10-31");
  const two = (friday?.ecmwf_mm ?? 0) + (saturday?.ecmwf_mm ?? 0);
  const spread = Math.max(
    ...days.map(
      (d) =>
        Math.max(d.ecmwf_mm, d.gfs_mm, d.icon_mm) - Math.min(d.ecmwf_mm, d.gfs_mm, d.icon_mm),
    ),
  );
  const disagree = spread >= 25;
  const peak3 = Math.max(...days.map((d) => d.ecmwf_3h_mm));
  const anyModel = Math.max(...days.flatMap((d) => [d.ecmwf_mm, d.gfs_mm, d.icon_mm]));

  const reasons: string[] = [];
  let level: Level = "quiet";

  const rainDanger = peak.ecmwf_mm >= reach.danger_mm || peak3 >= reach.burst_danger_mm;
  const rainWatch =
    peak.ecmwf_mm >= reach.watch_mm || peak3 >= reach.burst_watch_mm || anyModel >= reach.danger_mm;

  if (rainDanger) {
    level = disagree ? "watch" : "danger";
    reasons.push(disagree ? "rain-danger-capped" : "rain-danger");
  } else if (rainWatch) {
    level = "watch";
    reasons.push("rain-watch");
  }

  const glofas = readGlofas(hydro);
  if (glofas && reach.glofas_trust === "main" && glofas.rise >= 0.15 && level === "quiet") {
    level = "watch";
    reasons.push("glofas-rise");
  }
  if (glofas && reach.glofas_trust === "weak") {
    const jump = glofas.peak_m3s >= glofas.baseline_m3s * 2 && glofas.peak_m3s >= glofas.baseline_m3s + 10;
    if (jump && level === "quiet") {
      level = "watch";
      reasons.push("glofas-jump");
    }
  }

  const published = reach.published?.exit_min;
  const exit_min = published != null ? published : hydro.wave_min;
  return {
    level,
    reasons,
    peak,
    two_day_ecmwf_mm: Math.round(two * 10) / 10,
    spread_mm: Math.round(spread * 10) / 10,
    disagree,
    exit_min,
    exit_source: published != null ? "published" : "desk",
    glofas,
  };
}

function readGlofas(hydro: Hydro): GlofasRead | null {
  const rows = hydro.glofas?.daily?.filter((d) => d.date >= "2026-10-28" && d.date <= WINDOW_END) ?? [];
  if (rows.length < 2) return null;
  const baseline = rows[0];
  const peak = rows.reduce((best, row) => (row.m3s > best.m3s ? row : best), rows[0]);
  if (baseline.m3s <= 0) return null;
  return {
    baseline_m3s: baseline.m3s,
    baseline_date: baseline.date,
    peak_m3s: peak.m3s,
    peak_date: peak.date,
    rise: peak.m3s / baseline.m3s - 1,
  };
}

export function worst(levels: Level[]): Level {
  if (levels.includes("danger")) return "danger";
  if (levels.includes("watch")) return "watch";
  return "quiet";
}

export function formatMinutes(min: number | null, lang: "en" | "ne"): string {
  if (min == null) return "—";
  const rounded = Math.round(min);
  if (rounded < 90) return lang === "ne" ? `${rounded} मिनेट` : `${rounded} min`;
  const h = Math.floor(rounded / 60);
  const m = rounded % 60;
  if (lang === "ne") return m ? `${h} घण्टा ${m} मि` : `${h} घण्टा`;
  return m ? `${h} h ${m} min` : `${h} h`;
}

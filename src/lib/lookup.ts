import type { Lang } from "./config";
import type { SourceRecord } from "./types";
import sourcesFile from "../data/sources.json";

const sources = sourcesFile.sources as SourceRecord[];

export function sourceById(id: string): SourceRecord | undefined {
  return sources.find((s) => s.id === id);
}

export function sourceTitle(id: string, lang: Lang): string {
  const src = sourceById(id);
  if (!src) return id;
  return lang === "ne" ? src.title_ne : src.title_en;
}

export function localized<T extends { title_en: string; title_ne: string }>(item: T, lang: Lang): string {
  return lang === "ne" ? item.title_ne : item.title_en;
}

export function localizedNote<T extends { note_en?: string; note_ne?: string }>(item: T, lang: Lang): string {
  return (lang === "ne" ? item.note_ne : item.note_en) ?? "";
}

export function localizedName<T extends { name_en: string; name_ne: string }>(item: T, lang: Lang): string {
  return lang === "ne" ? `${item.name_ne} (${item.name_en})` : `${item.name_en} (${item.name_ne})`;
}

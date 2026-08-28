import type { Lang } from "./config";
import type { Messages } from "./i18n";

export type Status = "up" | "degraded" | "down" | "unknown" | "unlicensed";

export function statusLabel(status: Status, messages: Messages): string {
  return messages.status[status];
}

export function place(nameEn: string, nameNe: string, lang: Lang): string {
  return lang === "ne" ? `${nameNe} (${nameEn})` : `${nameEn} (${nameNe})`;
}

export function formatNpt(iso: string, lang: Lang): string {
  const date = new Date(iso);
  const locale = lang === "ne" ? "ne-NP" : "en-GB";
  return new Intl.DateTimeFormat(locale, {
    timeZone: "Asia/Kathmandu",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function formatNptDate(iso: string, lang: Lang): string {
  const date = new Date(iso);
  const locale = lang === "ne" ? "ne-NP" : "en-GB";
  return new Intl.DateTimeFormat(locale, {
    timeZone: "Asia/Kathmandu",
    dateStyle: "medium",
  }).format(date);
}

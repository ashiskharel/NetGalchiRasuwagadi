import type { Lang } from "./config";
import en from "../i18n/en.json";
import ne from "../i18n/ne.json";

const catalogs = { en, ne } as const;

export type Messages = typeof en;

export function t(lang: Lang): Messages {
  return catalogs[lang];
}

export function switchLangPath(pathname: string, next: Lang, base: string): string {
  const prefix = base.endsWith("/") ? base.slice(0, -1) : base;
  let rest = pathname.startsWith(prefix) ? pathname.slice(prefix.length) : pathname;
  if (!rest.startsWith("/")) rest = `/${rest}`;
  const parts = rest.split("/").filter(Boolean);
  if (parts[0] === "en" || parts[0] === "ne") {
    parts[0] = next;
  } else {
    parts.unshift(next);
  }
  return `${prefix}/${parts.join("/")}`;
}

export function langPath(lang: Lang, slug: string, base: string): string {
  const prefix = base.endsWith("/") ? base.slice(0, -1) : base;
  const clean = slug.replace(/^\/+|\/+$/g, "");
  return clean ? `${prefix}/${lang}/${clean}` : `${prefix}/${lang}`;
}

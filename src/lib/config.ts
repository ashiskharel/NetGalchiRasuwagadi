export const SITE = {
  repo: "ashiskharel/NetGalchiRasuwagadi",
  sourceapp: "netgalchi-rasuwagadhi",
  ripePrefix: "202.70.64.0/19",
  ntcAsn: 23752,
  githubIssuesLabel: "field-report",
} as const;

export const LANGS = ["en", "ne"] as const;
export type Lang = (typeof LANGS)[number];

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

# Contributing

## Status data

1. Find a public source (NTC statement, named news outlet, RIPEstat/HE.net observation).
2. Add or reuse an entry in `src/data/sources.json`.
3. Update `snapshot.json`, `corridor.json`, and/or `sites.json` with `as_of` and that source id.
4. Open a pull request. English and Nepali titles/notes should stay in sync.

## Bulletins

Add two Markdown files that share the same `pair` value, one under `src/content/bulletins/en/` and one under `src/content/bulletins/ne/`. Cite URLs in frontmatter `sources`.

## Field reports

Use the **Field report** issue template. Do not file NTC customer-care tickets here. Do not include how-to steps for unlicensed satellite terminals.

Maintainers: if a report is corroborated, copy it into `sites.json` and close or comment on the issue. Never auto-ingest issue text into the map.

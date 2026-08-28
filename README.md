# Net Galchi–Rasuwagadhi

Public bilingual (English / Nepali) bulletin board for **Nepal’s northern internet and telephony routing**: the Galchhi → Rasuwagadhi fiber, China Telecom Global (CTGNet AS23764) at Rasuwagadhi–Kerung, microwave radio restoration, satellite notes, and live BGP paths.

Live: **https://ashiskharel.github.io/NetGalchiRasuwagadi/**

Not affiliated with Nepal Telecom, Ncell, NTA, or China Telecom.

## Update the board

Status chips, corridor segments, and tower lists are git files — not scraped.

| File | What to edit |
| --- | --- |
| `src/data/snapshot.json` | Dashboard chips, district roll-ups, incident blurb |
| `src/data/corridor.json` | Map segments and place coordinates |
| `src/data/sites.json` | Named towers / repeaters |
| `src/data/asns.json` | Tracked ASNs |
| `src/data/sources.json` | Citations |
| `src/content/bulletins/{en,ne}/*.md` | Paired bulletins (`pair:` must match) |
| `src/i18n/{en,ne}.json` | UI strings |

Every status needs `as_of` and a `source` id that exists in `sources.json`. Do not invent site status.

Field reports arrive as GitHub Issues with the `field-report` label (create that label once on the repo). Copy verified items into `sites.json` by hand. They are never merged automatically.

```bash
npm install
npm run dev
```

Production URL uses the GitHub Pages base path `/NetGalchiRasuwagadi`. Enable **Pages → GitHub Actions** on the repo after the first push to `main`.

## Routing data

The routing page fetches RIPE RIS in the browser (`sourceapp=netgalchi-rasuwagadhi`) and links out to Hurricane Electric. HE.net has no public JSON API; we do not scrape it. China-side paths can be under-counted in RIS — see the caveat on that page.

## Licence

Site code is MIT. Routing data remains RIPE NCC / RIS; map tiles OpenStreetMap.

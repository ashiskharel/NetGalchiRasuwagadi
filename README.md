# Ground check

Public name **Ground check** (जमिन जाँच). Bilingual board for official ground reports, rain, weather-model calls, and a tally of which forecast held once a cited observation exists.

The GitHub repository and the Pages path stay `NetGalchiRasuwagadi`. The August 2026 Galchhi–Rasuwagadhi fiber board stays on the same site. It is a different incident from Cyclone Arnab. That split can be revisited. Do not mark the fiber up from BGP.

Live: **https://ashiskharel.github.io/NetGalchiRasuwagadi/**

Not a warning from NDRRMA or the Department of Hydrology and Meteorology. Not affiliated with NDRRMA, DHM, Nepal Telecom, Ncell, NTA, or China Telecom.

## Update the board

Status chips, corridor segments, and tower lists are git files — not scraped.

| File | What to edit |
| --- | --- |
| `src/data/snapshot.json` | Dashboard chips, district roll-ups, incident blurb |
| `src/data/corridor.json` | Map segments and place coordinates |
| `src/data/sites.json` | Named towers / repeaters |
| `src/data/asns.json` | Tracked ASNs |
| `src/data/sources.json` | Citations |
| `src/data/tally.json` | Forecast against measured rain and river level. Do not invent a gauge. Do not score mismatched clocks. |
| `src/content/bulletins/{en,ne}/*.md` | Paired bulletins (`pair:` must match) |
| `src/i18n/{en,ne}.json` | UI strings |

Every status needs `as_of` and a `source` id that exists in `sources.json`. Do not invent site status.

Field reports arrive as GitHub Issues with the `field-report` label (create that label once on the repo). Copy verified items into `sites.json` by hand. They are never merged automatically.

```bash
npm install
npm run dev
npm run draft    # RIPEstat + news RSS → drafts/ (does not change chips)
```

The daily Action **Daily restoration draft** commits `drafts/` around 07:00 NPT and upserts a paired **daily digest** under `src/content/bulletins/{en,ne}/YYYY-MM-DD-digest.md` (headlines on telecom/towers/fiber/internet plus RIPEstat). It does not edit `snapshot.json` chips. See `drafts/README.md`.

**Satellites** (`/en/satellites`): NASA GIBS daily true-color of the valley from 25 Aug 2026, plus live ISS / Landsat / Terra / Aqua / NOAA positions. Not people or phones. Starlink overhead is not shown as a service.

**Check** (`/en/check`): Cyclone Arnab forecasts beside DHM rain gauges and river gauges. No casualty table. A trailing 24-hour total is not a model calendar day. One model is not scored against another.

**Rivers** (`/en/flood`): Cyclone Arnab desk. How fast a rise leaves a narrow gorge or an embanked bend, 24-hour rain lines for those reaches, ECMWF IFS against GFS and ICON, a 2006–2025 ERA5 October comparison, and GloFAS only as a rise/fall signal. Not a DHM warning. Refresh with `npm run flood` (add `--era5` to refetch the 20-year archive). The committed `src/data/flood-watch.json` is the snapshot the site builds.

The same page plays an hourly cloud field: low, mid and high bands from the 9 km IFS, summit height against the 0.25° pressure-level deck, and the GDACS/JTWC track for ARNAB-26. Forecast positions stay forecasts. The track is not extended into Nepal. Refresh that file with `npm run clouds`. The committed `public/data/clouds.json` is the fallback if Open-Meteo does not answer in the browser.

Production URL uses the GitHub Pages base path `/NetGalchiRasuwagadi`. Enable **Pages → GitHub Actions** on the repo after the first push to `main`.

## Routing data

The routing page fetches RIPE RIS in the browser (`sourceapp=netgalchi-rasuwagadhi`) and links out to Hurricane Electric. HE.net has no public JSON API; we do not scrape it. China-side paths can be under-counted in RIS — see the caveat on that page.

## Licence

Site code is MIT. Routing data remains RIPE NCC / RIS; map tiles OpenStreetMap.

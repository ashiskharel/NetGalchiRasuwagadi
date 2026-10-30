# Restoration draft — 2026-10-30T12:50 NPT

Machine fetch only. **Do not copy into `snapshot.json` without a named public source.**

## Suggested human actions
- Northern CTGNet (AS23764) is **visible in RIS**. Keep the northern-transit chip as degraded/unknown until a named NTC source says the Galchhi–Rasuwagadhi fiber is repaired. Do **not** mark fiber `up` from BGP.
- Southern India transits (Airtel/Tata) still appear. National internet is likely still on those paths.
- Fiber, microwave, district site counts, Starlink: **no machine source**. Only update from a named NTC/news quote in `sources.json`.

## RIPEstat (AS23752)
- Prefix: `202.70.64.0/19`
- Upstreams (left): AS23764, AS4755, AS6453, AS9498
- Customers (right): AS131341, AS136794, AS139022, AS142008, AS14789, AS45353, AS58456
- Path observations: north 134 · south 224 · other 0
- Latest path confirm: 2026-10-30T07:05:11.020000 UTC

Distinct AS paths (prepending stripped, top 16):

- `AS23764 → AS23752` ×8 (north)
- `AS8218 → AS23764 → AS23752` ×7 (north)
- `AS6461 → AS9498 → AS23752` ×5 (south)
- `AS24482 → AS9498 → AS23752` ×5 (south)
- `AS9002 → AS6453 → AS23752` ×4 (south)
- `AS24482 → AS23764 → AS23752` ×4 (north)
- `AS14840 → AS9498 → AS23752` ×4 (south)
- `AS199524 → AS9498 → AS23752` ×4 (south)
- `AS47147 → AS3320 → AS6453 → AS23752` ×4 (south)
- `AS2914 → AS23764 → AS23752` ×3 (north)
- `AS3491 → AS9498 → AS23752` ×3 (south)
- `AS12779 → AS23764 → AS23752` ×3 (north)
- `AS48185 → AS9498 → AS23752` ×3 (south)
- `AS3214 → AS9498 → AS23752` ×3 (south)
- `AS49544 → AS23764 → AS23752` ×3 (north)
- `AS35280 → AS6453 → AS23752` ×3 (south)

## News headlines (publisher RSS; Google News is optional and often blocked from Actions)

### onlinekhabar-en (en)
- [Flash flood causes damage in Bhutan, glacial lake outburst suspected](https://english.onlinekhabar.com/flash-flood-causes-damage-in-bhutan-glacial-lake-outburst-suspected.html) — Fri, 30 Oct 2026 05:53:07 +0000
- [Relief delivered by drone to Budhigandaki flood-affected areas](https://english.onlinekhabar.com/relief-delivered-by-drone.html) — Fri, 30 Oct 2026 03:39:08 +0000

### onlinekhabar-ne (ne)
- [बूढीगण्डकी बाढी प्रभावित क्षेत्रमा ड्रोनमार्फत् पुर्‍याइयो राहत](https://www.onlinekhabar.com/2026/10/2047043/relief-delivered-via-drone-to-budhigandaki-flood-affected-areas) — Fri, 30 Oct 2026 02:45:25 +0000
- [भुटानमा आकस्मिक बाढीले पुर्‍यायो क्षति, हिमताल विस्फोटको आशंका](https://www.onlinekhabar.com/2026/10/2047021/flash-floods-cause-damage-in-bhutan-fears-of-glacial-lake-eruption) — Fri, 30 Oct 2026 01:53:09 +0000

### rising-nepal (en)
No items.

### kathmandu-post (en)
- [Bhutan glacial lake outburst triggers flood, no injuries reported](https://kathmandupost.com/world/2026/10/30/bhutan-glacial-lake-outburst-triggers-flood-no-injuries-reported) — 
- [Nepal plans temporary bridges to reopen flood-hit Rasuwagadhi border crossing](https://kathmandupost.com/money/2026/10/30/nepal-plans-temporary-bridges-to-reopen-flood-hit-rasuwagadhi-border-crossing) — 
- [Annapurna Circuit sees trekking arrivals rebound after floods](https://kathmandupost.com/money/2026/10/29/annapurna-circuit-sees-trekking-arrivals-rebound-after-floods) — 

### ratopati (ne)
- [चक्रवात ‘अर्नब’ को प्रभाव : कोशी र नारायणीसहित प्रमुख नदी जलाधारमा बाढीको जोखिम](https://www.ratopati.com/story/602198/flood) — Fri, 30 Oct 2026 05:35:20 +0000

### gnews-en (en)
Fetch failed: 503 https://news.google.com/rss/search?q=Nepal+Telecom+Rasuwa+OR+Rasuwagadhi+OR+Galchhi+OR+Bhotekoshi&hl=en-US&gl=US&ceid=US:en

## Open field reports
None open.

## How to apply
1. Confirm a headline against the original article.
2. Add/reuse `src/data/sources.json`.
3. Edit `snapshot.json` / `corridor.json` / `sites.json` with `as_of`.
4. Optional paired bulletin under `src/content/bulletins/{en,ne}/`.
5. `git add src && git commit && git push`.

# Restoration draft — 2026-11-18T14:17 NPT

Machine fetch only. **Do not copy into `snapshot.json` without a named public source.**

## Suggested human actions
- Northern CTGNet (AS23764) is **visible in RIS**. Keep the northern-transit chip as degraded/unknown until a named NTC source says the Galchhi–Rasuwagadhi fiber is repaired. Do **not** mark fiber `up` from BGP.
- Southern India transits (Airtel/Tata) still appear. National internet is likely still on those paths.
- Fiber, microwave, district site counts, Starlink: **no machine source**. Only update from a named NTC/news quote in `sources.json`.

## RIPEstat (AS23752)
- Prefix: `202.70.64.0/19`
- Upstreams (left): AS23764, AS4755, AS6453, AS9498
- Customers (right): AS131341, AS136794, AS139022, AS142008, AS14789, AS45353, AS58456
- Path observations: north 132 · south 229 · other 0
- Latest path confirm: 2026-11-18T08:31:59.930000 UTC

Distinct AS paths (prepending stripped, top 16):

- `AS23764 → AS23752` ×8 (north)
- `AS8218 → AS23764 → AS23752` ×6 (north)
- `AS24482 → AS9498 → AS23752` ×6 (south)
- `AS6461 → AS9498 → AS23752` ×5 (south)
- `AS24482 → AS23764 → AS23752` ×5 (north)
- `AS9002 → AS6453 → AS23752` ×4 (south)
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
- [Contracts of non-performing Fast Track builders will be cancelled immediately, says Minister Lamsal](https://english.onlinekhabar.com/contracts-fast-track-cancelled.html) — Wed, 18 Nov 2026 07:15:40 +0000

### onlinekhabar-ne (ne)
No items.

### rising-nepal (en)
No items.

### kathmandu-post (en)
- [Flood victims occupy Nepal Electricity Authority land, erect tents](https://kathmandupost.com/national/2026/11/18/flood-victims-occupy-nepal-electricity-authority-land-erect-tents) — 
- [Flood-hit Rani Mahal still awaits cleanup two months on](https://kathmandupost.com/province-no-5/2026/11/17/flood-hit-rani-mahal-still-awaits-cleanup-two-months-on) — 

### ratopati (ne)
- [द्रुतमार्गमा ढिलाइ गर्ने निर्माण कम्पनीको ठेक्का तत्काल रद्द गरिनेछ : मन्त्री लम्साल](https://www.ratopati.com/story/606016/contract-of-construction-company-that-delays-expressway-will-be-cancelled-immediately-minister-lamsal) — Wed, 18 Nov 2026 08:17:00 +0000

### gnews-en (en)
- [Nepal Telecom contributes Rs 100 million to PM Natural Disaster Relief Fund - radionepalonline.com](https://news.google.com/rss/articles/CBMiZEFVX3lxTE04aGJGMXJfZ0k2M0pVTVRlVzg2ZzBoUGxGcUVtbE5zS2p4RmdJbENCdEVnT1lEUm9KU3JQak5aQVUxdzJZckZkLVJGb0hsbmN0UWFYZEhrcGNvc25iaWE3NV9GWXI?oc=5) — Wed, 09 Sep 2026 07:00:00 GMT
- [Nepal Telecom suffers over NPR 88 million in infrastructure damage in Bhotekoshi floods - ET Telecom](https://news.google.com/rss/articles/CBMi7AFBVV95cUxNTUNIYUV2RGFPSEVnSWJSQVZZNmxyWHluaDhsSVZRZmY4SllfbWJ2Uy1WVlpKbjhFTXRuVlFYY1RjeldnMmFWc0NfQ0xTQ0k4THlZRjZ2b29iajlKTmNnVTVuN29ta2czWkNqSFpHUzVBN1JsVWtnR1RiWFBTN3RlbVcyaS1MY1EtRDUzNWt2RUxqNmt4RnpSeDlIeFdXYnhBSjEyWFZoSlBTWEt5VmFWMHFEbHA2T1NjU1BGcVlyV3A0QnREelg2aXkybWQ1eWdIOHNESE1neWxaa0xCYTlKZGhNYldNcHowY2NIeg?oc=5) — Thu, 01 Oct 2026 07:00:00 GMT
- [Nepal Telecom reports NPR 88 million in infrastructure damage following Bhotekoshi floods - Telecompaper](https://news.google.com/rss/articles/CBMizAFBVV95cUxNQm1IaEpqdzRtVnJCTGRuU1hOT3RvQ2tLcG9qX2dkQnloYjc2LUtwQTFKc0NIQlNTZ0xERlVrbnQ1Tm1XNzdYNjUwSlNoOVpIeHlLd0ExbEJBQVlEQVR5UGtFbDh5SnoxTXhQSW0yZjZqU0RublhSTm9mTlhmV1VIS2Q3TkNLWDhqTkVpSVdaZTdMZW53R2p6eWRjdEE2Rm45SGtWbGYta0dpWUwwNDBmNVZubGxkSEQydDVzcC1YWWRWT0l1cklqMVlKeWw?oc=5) — Thu, 01 Oct 2026 12:01:12 GMT
- [Nepal Telecom restores services at 80 of 120 flood-affected sites - Nepalnews.com](https://news.google.com/rss/articles/CBMiuAFBVV95cUxQbVBaY1lnQUFYcThETFBudVh1Q3piVjBnQm84c2FiSzd6UGoxYWx3M0lob2ZmN2N3ZVFyaFF0SzBuQWM4R2ZqYTY1dUZjTWQtb241U1Rld29mdEM3YTdzZGJOMGJCN29UYWpETUh4Wk1BVG1DNTJ4cmw3MzloaVlPRnJYeU1OalI5Y0hDM1pXQndibVFjd2RNUU9fMGxKTnNpcW9iSWVvbjltRWlIRS1BTWgzYTVWNVZT?oc=5) — Fri, 28 Aug 2026 07:00:00 GMT
- [Nepal Telecom employees contribute over Rs 20 million to disaster relief fund - myRepublica](https://news.google.com/rss/articles/CBMiygFBVV95cUxQYUlENk5sMXplQURGTkpXQWJJc3lZNkFNQWZJYTBIbUx2YThyVXFoMjA1bk9sZVI1MW85YzV2eTlEdVctTm5rSl9qc2F2YldMaEJINWFGdmVmVkhOQ0psWFVsem8tcjJuUUM0UGNjYnpiZ3lkSzE2Skp0Q1l4d0Z1Zl96Q3NjMERYNExWUklhZ3hUWGNrVE1CNEFxYnAyRmw2MFZqRlpZaWZ4RlhEQzd6NzdJOTJYWVdGdEI1dFZZTnJZZnljdGZVVlh3?oc=5) — Tue, 08 Sep 2026 07:00:00 GMT
- [NTC provides free telephone, SMS and internet service in flood-hit areas - The Rising Nepal](https://news.google.com/rss/articles/CBMiUEFVX3lxTE56LUplMEYyaVNVNWxIZnR3RVc2a282WGZDcEpQejRhS1o2V0h2S0x5d0FGVVp5REl0Mzd1cmVzNFNCekt2ektsdGktb0xrZ1B3?oc=5) — Wed, 26 Aug 2026 08:13:12 GMT
- [Bhotekoshi floods expose gaps in Nepal’s emergency communications - The Kathmandu Post](https://news.google.com/rss/articles/CBMisAFBVV95cUxQT1h4Y2ppQ2x1Z1lUbmVOMUVJZC1xOTlLWGJQWUdma1dtMU9TYTJfYVB2UmgxcTg4MVYtaTAtRzRBazdSeUZNeDk1M1VZWWEtb3psQldDb2cyUXRKdEp2UVBCMFlxTkFPZ2Rha2ZsVVctaGdJaHBUZlFhaXg3NHR2WGFwWVdGRWZsTlFPb3k2UkVVTm1yRl94U2ZSMTlMU1FVN3pfUlRTN2RMMUdweTM4UQ?oc=5) — Thu, 03 Sep 2026 07:00:00 GMT
- [87 telecom towers disrupted in Rasuwa, Nuwakot and Dhading after flood - OnlineKhabar English News](https://news.google.com/rss/articles/CBMieEFVX3lxTE5tUTIxNEpwTF9VRmctbjdyS1I0SzBCNjZnMmNiNFhlMHo3T3dUUFVVNUhLenhWTUZIcXNfdkd0NEVid2pHRlE5T1FITVdrWURDYVZ5UGhYdmNBWk01VERpSlJFNTktVHRhYUR4cmtsc01RVTJjTnZ3cQ?oc=5) — Thu, 27 Aug 2026 07:00:00 GMT
- [Nepal Telecom’s relief and telecom services in Bhotekoshi flood-hit areas - NepaliTelecom](https://news.google.com/rss/articles/CBMitgFBVV95cUxNRk0xdUU0QUItb2I3UnB3MHBTLXBiaThhOUZuOHlIU0JXVU8tV0xDZmpuT1FGT3M0MVJMOUFuekZkTTRVMk10VzlrTlQ3eGtvcDJvd2lfU2h0MUtKUDFvRVZDeGFDSklFWmVEekxSZkpBUFFKODJteDh6V3JBcUdGYlFFdFZKb25wOUZyNUNzZDAwVHV5UEtRT3U1V2FBTTFRUUVCY244Qm1VMXZIOVF3X3ZSWEZOZw?oc=5) — Mon, 21 Sep 2026 07:00:00 GMT
- [Nepal Telecom Services Disrupted by Flood Damage in Rasuwa and Nuwakot - Ratopati](https://news.google.com/rss/articles/CBMiwAFBVV95cUxQaS0zX3pVb25uRXFCTzZ0YTA3NTk3UkNzZHB6UnAyMVdob01hUElsMzVvc2llbzlsOG9OTzM5Z2VFTk42bzlFTzkyWTVhWHVDOW12bUJ2WTdLOGFKUjgwRWRNbm45eDJtMmFQY19aT3V6N2xYcmJFSERWTFZMbW15LTUzdDNGU0toYkNrb2hIVWdwRGhlR2tLZWxtMEs4aEozcVBNTG90MHBnS19Fd0gydjE3aHVfVG5HVXE5Y1FPNXQ?oc=5) — Wed, 26 Aug 2026 06:16:07 GMT
- [Nepal Telecom Extends Free Service by Three Days in the Bhotekoshi Flood-Affected Area - Ekantipur](https://news.google.com/rss/articles/CBMi2AFBVV95cUxOTWtuZkdrdFdwOHRmYk9TNWJjSzYxMHZveVBDakZyQmROSFd5azJaZlJjUHZ1RVFVWUxUMXN1QzFfaW9nenVWTm9zZ29qVUtSS3FTYmQ5a0U5dVhBVE52OWg2ak4wUEZkOVRQM0hyTWZyYVpjWGFrUzRxLXhLU1NkMVNkU1N1OWhCT1lMRXIyNFN6TWZoLTdLZkxaaUNVTnlubmNyZXBfM2VJS2REUk1Vc0QtenQ4dTZDMXdsYUxsd0xjWGxGMXlaRndDR0dTajZnYjZ6S0N4a08?oc=5) — Thu, 27 Aug 2026 07:00:00 GMT
- [Nepal Telecom suffers Rs 88.51 million in damages from August 26 flood - myRepublica](https://news.google.com/rss/articles/CBMiwgFBVV95cUxQYVJfOTVQZFp6Z195aW9WZmtZcGdDc3ZwcGh2cUFvVTZwTWIxVTlvRFJsSmJIbzJzdVVfMmhCc0gwazYxby1ocXlyaDhxeXo4UUdXQk1sTFB4RnNnUks1LXdSMFY1S3MtcXU3VDlKcmk3UEVWdDZxeXZwRXdJYWUwdTlHeVFmak9iWThkLVpVVHRtLWsyYVpGd05yeVpiX0Ricm1Bc0NOQmR6ZEJFTVFHR2NHVEg5dUFtak9kMFJTaDUtZw?oc=5) — Wed, 30 Sep 2026 07:00:00 GMT

## Open field reports
GitHub API: 403 https://api.github.com/repos/ashiskharel/NetGalchiRasuwagadi/issues?labels=field-report&state=open&per_page=20

## How to apply
1. Confirm a headline against the original article.
2. Add/reuse `src/data/sources.json`.
3. Edit `snapshot.json` / `corridor.json` / `sites.json` with `as_of`.
4. Optional paired bulletin under `src/content/bulletins/{en,ne}/`.
5. `git add src && git commit && git push`.

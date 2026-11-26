# Restoration draft — 2026-11-26T15:15 NPT

Machine fetch only. **Do not copy into `snapshot.json` without a named public source.**

## Suggested human actions
- Northern CTGNet (AS23764) is **visible in RIS**. Keep the northern-transit chip as degraded/unknown until a named NTC source says the Galchhi–Rasuwagadhi fiber is repaired. Do **not** mark fiber `up` from BGP.
- Southern India transits (Airtel/Tata) still appear. National internet is likely still on those paths.
- Fiber, microwave, district site counts, Starlink: **no machine source**. Only update from a named NTC/news quote in `sources.json`.

## RIPEstat (AS23752)
- Prefix: `202.70.64.0/19`
- Upstreams (left): AS23764, AS4755, AS6453, AS9498
- Customers (right): AS131341, AS136794, AS139022, AS142008, AS14789, AS45353, AS58456
- Path observations: north 130 · south 232 · other 0
- Latest path confirm: 2026-11-26T09:30:50.070000 UTC

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
No items.

### onlinekhabar-ne (ne)
- [दोषीलाई कारबाही गर्छौं, बेथितिको फाइल खोल्न सुरु गरेका छौं : उपकुलपति थापा](https://www.onlinekhabar.com/2026/11/2065516/we-will-take-action-against-the-guilty-we-have-started-opening-the-file-of-the-incident-vice-chancellor-thapa) — Thu, 26 Nov 2026 05:21:32 +0000

### rising-nepal (en)
- [No compromise should be made in quality of telecom services: Communication Minister](https://risingnepaldaily.com/news/89056) — Thu, 26 Nov 2026 14:43:43 +0545

### kathmandu-post (en)
- [Three months on, flood-hit communities in Nuwakot remain cut off from district headquarters](https://kathmandupost.com/province-no-3/2026/11/25/three-months-on-flood-hit-communities-in-nuwakot-remain-cut-off-from-district-headquarters) — 

### ratopati (ne)
No items.

### gnews-en (en)
- [Nepal Telecom reports NPR 88 million in infrastructure damage following Bhotekoshi floods - Telecompaper](https://news.google.com/rss/articles/CBMizAFBVV95cUxNQm1IaEpqdzRtVnJCTGRuU1hOT3RvQ2tLcG9qX2dkQnloYjc2LUtwQTFKc0NIQlNTZ0xERlVrbnQ1Tm1XNzdYNjUwSlNoOVpIeHlLd0ExbEJBQVlEQVR5UGtFbDh5SnoxTXhQSW0yZjZqU0RublhSTm9mTlhmV1VIS2Q3TkNLWDhqTkVpSVdaZTdMZW53R2p6eWRjdEE2Rm45SGtWbGYta0dpWUwwNDBmNVZubGxkSEQydDVzcC1YWWRWT0l1cklqMVlKeWw?oc=5) — Thu, 01 Oct 2026 07:00:00 GMT
- [Nepal Telecom contributes Rs 100 million to PM Natural Disaster Relief Fund - Nepalnews.com](https://news.google.com/rss/articles/CBMitgFBVV95cUxObnp0bzdfRURUa2toTEFXNENwb3ZWVHBjUlp4UHQySE0yOWM1ZW83Vl82Rm1yMS1IM2lMUVp3em43aHFNWm0tYmo5d2ZXUnVJWEFBN1B6TWF0NnU3amNqSXd6cXV5ZDk0ZGtHMFU0aDRiV1RQZU44MkFMdFFhTHFPbzJqY1pxT1Z6LVZiRzM5WEtxSktEeEd4ZF81d0NXQ1VDSXg4VDZJYnhWMFlzdDJTUGZpbEhvQQ?oc=5) — Wed, 09 Sep 2026 07:00:00 GMT
- [Nepal Telecom suffers Rs 88.51 million in damages from August 26 flood - myRepublica](https://news.google.com/rss/articles/CBMiwgFBVV95cUxQYVJfOTVQZFp6Z195aW9WZmtZcGdDc3ZwcGh2cUFvVTZwTWIxVTlvRFJsSmJIbzJzdVVfMmhCc0gwazYxby1ocXlyaDhxeXo4UUdXQk1sTFB4RnNnUks1LXdSMFY1S3MtcXU3VDlKcmk3UEVWdDZxeXZwRXdJYWUwdTlHeVFmak9iWThkLVpVVHRtLWsyYVpGd05yeVpiX0Ricm1Bc0NOQmR6ZEJFTVFHR2NHVEg5dUFtak9kMFJTaDUtZw?oc=5) — Wed, 30 Sep 2026 07:00:00 GMT
- [Mobile services restored in flood-affected areas - The Rising Nepal](https://news.google.com/rss/articles/CBMiUEFVX3lxTE13ckNCOGRZdmJ4a0NVakxoQVhULUVvelN6S1lBZDd4MWpRSGhscHIxSDZ6RE51dnZpUC1DeThMSWx3X2tWajh4ZGlUWHB1cm5h?oc=5) — Sat, 29 Aug 2026 00:40:00 GMT
- [Nepal Telecom Services Disrupted by Flood Damage in Rasuwa and Nuwakot - Ratopati](https://news.google.com/rss/articles/CBMiwAFBVV95cUxQaS0zX3pVb25uRXFCTzZ0YTA3NTk3UkNzZHB6UnAyMVdob01hUElsMzVvc2llbzlsOG9OTzM5Z2VFTk42bzlFTzkyWTVhWHVDOW12bUJ2WTdLOGFKUjgwRWRNbm45eDJtMmFQY19aT3V6N2xYcmJFSERWTFZMbW15LTUzdDNGU0toYkNrb2hIVWdwRGhlR2tLZWxtMEs4aEozcVBNTG90MHBnS19Fd0gydjE3aHVfVG5HVXE5Y1FPNXQ?oc=5) — Wed, 26 Aug 2026 06:16:07 GMT
- [Nepal Telecom’s relief and telecom services in Bhotekoshi flood-hit areas - NepaliTelecom](https://news.google.com/rss/articles/CBMitgFBVV95cUxNRk0xdUU0QUItb2I3UnB3MHBTLXBiaThhOUZuOHlIU0JXVU8tV0xDZmpuT1FGT3M0MVJMOUFuekZkTTRVMk10VzlrTlQ3eGtvcDJvd2lfU2h0MUtKUDFvRVZDeGFDSklFWmVEekxSZkpBUFFKODJteDh6V3JBcUdGYlFFdFZKb25wOUZyNUNzZDAwVHV5UEtRT3U1V2FBTTFRUUVCY244Qm1VMXZIOVF3X3ZSWEZOZw?oc=5) — Mon, 21 Sep 2026 07:00:00 GMT
- [Bhotekoshi floods expose gaps in Nepal’s emergency communications - The Kathmandu Post](https://news.google.com/rss/articles/CBMisAFBVV95cUxQT1h4Y2ppQ2x1Z1lUbmVOMUVJZC1xOTlLWGJQWUdma1dtMU9TYTJfYVB2UmgxcTg4MVYtaTAtRzRBazdSeUZNeDk1M1VZWWEtb3psQldDb2cyUXRKdEp2UVBCMFlxTkFPZ2Rha2ZsVVctaGdJaHBUZlFhaXg3NHR2WGFwWVdGRWZsTlFPb3k2UkVVTm1yRl94U2ZSMTlMU1FVN3pfUlRTN2RMMUdweTM4UQ?oc=5) — Thu, 03 Sep 2026 07:00:00 GMT
- [87 telecom towers disrupted in Rasuwa, Nuwakot and Dhading after flood - OnlineKhabar English News](https://news.google.com/rss/articles/CBMieEFVX3lxTE5tUTIxNEpwTF9VRmctbjdyS1I0SzBCNjZnMmNiNFhlMHo3T3dUUFVVNUhLenhWTUZIcXNfdkd0NEVid2pHRlE5T1FITVdrWURDYVZ5UGhYdmNBWk01VERpSlJFNTktVHRhYUR4cmtsc01RVTJjTnZ3cQ?oc=5) — Thu, 27 Aug 2026 07:00:00 GMT
- [Nepal Telecom Extends Free Service by Three Days in the Bhotekoshi Flood-Affected Area - Ekantipur](https://news.google.com/rss/articles/CBMi2AFBVV95cUxOTWtuZkdrdFdwOHRmYk9TNWJjSzYxMHZveVBDakZyQmROSFd5azJaZlJjUHZ1RVFVWUxUMXN1QzFfaW9nenVWTm9zZ29qVUtSS3FTYmQ5a0U5dVhBVE52OWg2ak4wUEZkOVRQM0hyTWZyYVpjWGFrUzRxLXhLU1NkMVNkU1N1OWhCT1lMRXIyNFN6TWZoLTdLZkxaaUNVTnlubmNyZXBfM2VJS2REUk1Vc0QtenQ4dTZDMXdsYUxsd0xjWGxGMXlaRndDR0dTajZnYjZ6S0N4a08?oc=5) — Thu, 27 Aug 2026 07:00:00 GMT
- [Nepal Telecom restores services at 80 of 120 flood-affected sites - Nepalnews.com](https://news.google.com/rss/articles/CBMiuAFBVV95cUxQbVBaY1lnQUFYcThETFBudVh1Q3piVjBnQm84c2FiSzd6UGoxYWx3M0lob2ZmN2N3ZVFyaFF0SzBuQWM4R2ZqYTY1dUZjTWQtb241U1Rld29mdEM3YTdzZGJOMGJCN29UYWpETUh4Wk1BVG1DNTJ4cmw3MzloaVlPRnJYeU1OalI5Y0hDM1pXQndibVFjd2RNUU9fMGxKTnNpcW9iSWVvbjltRWlIRS1BTWgzYTVWNVZT?oc=5) — Fri, 28 Aug 2026 07:00:00 GMT
- [Nepal Telecom Offers Free Voice, Data Until Further Notice for Rasuwa Flood-Hit Areas - NepaliTelecom](https://news.google.com/rss/articles/CBMiwAFBVV95cUxNZzdCMnMyX1NRV1VHUjRZNG52T3JzVVE5aUVSQ2FMcVpTaVRRX2xNVmxRV0xodU9iejl1MzUzVjhZTlR3THhEYk5aZ0pmZjVERG10Zk5LTnRwVUhEYk5ENmhnbXlYeHEzWFJwVlFnaWxVeUJyRnZiOGUwblgxb1BVajNCcElMNU1DX3c5QnpjWjlqdzFwVnZYMHdINXZPZnFxTUlGRVVSZXdOYkktMm1kaWJ2X2FuT01sZWduVXlvT2g?oc=5) — Sun, 30 Aug 2026 07:00:00 GMT
- [NTC provides free telephone, SMS and internet service in flood-hit areas - The Rising Nepal](https://news.google.com/rss/articles/CBMiUEFVX3lxTE56LUplMEYyaVNVNWxIZnR3RVc2a282WGZDcEpQejRhS1o2V0h2S0x5d0FGVVp5REl0Mzd1cmVzNFNCekt2ektsdGktb0xrZ1B3?oc=5) — Wed, 26 Aug 2026 08:13:12 GMT

## Open field reports
None open.

## How to apply
1. Confirm a headline against the original article.
2. Add/reuse `src/data/sources.json`.
3. Edit `snapshot.json` / `corridor.json` / `sites.json` with `as_of`.
4. Optional paired bulletin under `src/content/bulletins/{en,ne}/`.
5. `git add src && git commit && git push`.

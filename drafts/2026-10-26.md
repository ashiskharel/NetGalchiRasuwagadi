# Restoration draft — 2026-10-26T11:57 NPT

Machine fetch only. **Do not copy into `snapshot.json` without a named public source.**

## Suggested human actions
- Northern CTGNet (AS23764) is **visible in RIS**. Keep the northern-transit chip as degraded/unknown until a named NTC source says the Galchhi–Rasuwagadhi fiber is repaired. Do **not** mark fiber `up` from BGP.
- Southern India transits (Airtel/Tata) still appear. National internet is likely still on those paths.
- Fiber, microwave, district site counts, Starlink: **no machine source**. Only update from a named NTC/news quote in `sources.json`.

## RIPEstat (AS23752)
- Prefix: `202.70.64.0/19`
- Upstreams (left): AS23764, AS4755, AS6453, AS9498
- Customers (right): AS131341, AS136794, AS139022, AS14789, AS150138, AS45353, AS58456
- Path observations: north 133 · south 231 · other 0
- Latest path confirm: 2026-10-26T06:12:32.880000 UTC

Distinct AS paths (prepending stripped, top 16):

- `AS23764 → AS23752` ×8 (north)
- `AS8218 → AS23764 → AS23752` ×7 (north)
- `AS6461 → AS9498 → AS23752` ×5 (south)
- `AS24482 → AS23764 → AS23752` ×5 (north)
- `AS24482 → AS9498 → AS23752` ×5 (south)
- `AS199524 → AS9498 → AS23752` ×5 (south)
- `AS14840 → AS9498 → AS23752` ×4 (south)
- `AS47147 → AS3320 → AS6453 → AS23752` ×4 (south)
- `AS2914 → AS23764 → AS23752` ×3 (north)
- `AS3491 → AS9498 → AS23752` ×3 (south)
- `AS9002 → AS6453 → AS23752` ×3 (south)
- `AS48185 → AS9498 → AS23752` ×3 (south)
- `AS3214 → AS9498 → AS23752` ×3 (south)
- `AS49544 → AS23764 → AS23752` ×3 (north)
- `AS35280 → AS6453 → AS23752` ×3 (south)
- `AS13030 → AS9498 → AS23752` ×3 (south)

## News headlines (publisher RSS; Google News is optional and often blocked from Actions)

### onlinekhabar-en (en)
- [Bhotekoshi floods caused Rs 79.17 billion in damage to private property, preliminary assessment shows](https://english.onlinekhabar.com/bhotekoshi-floods-damage-2.html) — Mon, 26 Oct 2026 03:52:12 +0000

### onlinekhabar-ne (ne)
- [पीडीएनए प्रारम्भिक नतिजा : रसुवा बाढीले निजी सम्पत्ति र व्यवसायमा ७९ अर्बको क्षति](https://www.onlinekhabar.com/2026/10/2043759/pdna-preliminary-results-rasuwa-floods-cause-rs-79-billion-in-damage-to-private-property-and-businesses) — Sun, 25 Oct 2026 15:23:47 +0000

### rising-nepal (en)
No items.

### kathmandu-post (en)
- [Nepal to expand flood warning systems across six river basins](https://kathmandupost.com/national/2026/10/26/nepal-to-expand-flood-warning-systems-across-six-river-basins) — 
- [Tourism resumes in Manaslu after Budhi Gandaki floods](https://kathmandupost.com/national/2026/10/25/tourism-resumes-in-manaslu-after-budhi-gandaki-floods) — 
- [Nepal resumes power exports to Bangladesh after flood disruption](https://kathmandupost.com/money/2026/10/25/nepal-resumes-power-exports-to-bangladesh-after-flood-disruption) — 

### ratopati (ne)
- [उत्तरगयाका बाढी प्रभावितलाई होल्डिङ सेन्टरमै पुगेर नागरिकताको प्रतिलिपि दिने प्रक्रिया सुरु](https://www.ratopati.com/story/601305/the-process-of-providing-copies-of-citizenship-certificates-to-flood-victims-in-uttar-gaya-has-begun-at-the-holding-center) — Mon, 26 Oct 2026 05:39:10 +0000
- [रसुवा–भोटेकोशी बाढी : ७९ अर्बभन्दा बढीको क्षति, नुवाकोट सबैभन्दा बढी प्रभावित](https://www.ratopati.com/story/601285/rasuwa-bhotekoshi-flood-damage-of-over-rs-79-billion-nuwakot-most-affected) — Mon, 26 Oct 2026 04:26:07 +0000

### gnews-en (en)
- [Nepal Telecom reports NPR 88 million in infrastructure damage following Bhotekoshi floods - Telecompaper](https://news.google.com/rss/articles/CBMizAFBVV95cUxNQm1IaEpqdzRtVnJCTGRuU1hOT3RvQ2tLcG9qX2dkQnloYjc2LUtwQTFKc0NIQlNTZ0xERlVrbnQ1Tm1XNzdYNjUwSlNoOVpIeHlLd0ExbEJBQVlEQVR5UGtFbDh5SnoxTXhQSW0yZjZqU0RublhSTm9mTlhmV1VIS2Q3TkNLWDhqTkVpSVdaZTdMZW53R2p6eWRjdEE2Rm45SGtWbGYta0dpWUwwNDBmNVZubGxkSEQydDVzcC1YWWRWT0l1cklqMVlKeWw?oc=5) — Thu, 01 Oct 2026 12:01:12 GMT
- [Nepal Telecom suffers over NPR 88 million in infrastructure damage in Bhotekoshi floods - ET Telecom](https://news.google.com/rss/articles/CBMi7AFBVV95cUxNTUNIYUV2RGFPSEVnSWJSQVZZNmxyWHluaDhsSVZRZmY4SllfbWJ2Uy1WVlpKbjhFTXRuVlFYY1RjeldnMmFWc0NfQ0xTQ0k4THlZRjZ2b29iajlKTmNnVTVuN29ta2czWkNqSFpHUzVBN1JsVWtnR1RiWFBTN3RlbVcyaS1MY1EtRDUzNWt2RUxqNmt4RnpSeDlIeFdXYnhBSjEyWFZoSlBTWEt5VmFWMHFEbHA2T1NjU1BGcVlyV3A0QnREelg2aXkybWQ1eWdIOHNESE1neWxaa0xCYTlKZGhNYldNcHowY2NIeg?oc=5) — Thu, 01 Oct 2026 07:56:43 GMT
- [Nepal Telecom suffers Rs 88.51 million in damages from August 26 flood - myRepublica](https://news.google.com/rss/articles/CBMixwFBVV95cUxOeFMwdzJHQnFMVTd0Mi11YWJ6UmlpMV8wVWRxU0kzNkZvVFZWVGZMZmFaR1g3ejBPdlp2TlNsck5LWE5BZGVqX0Z3Wi1PUFBqdkluTnYzTmtVZ2dCTENPZVBJOWE5Zmx6am1uMEczUk9FMDdma2RDOUtrNy0wcHBabGpuUHVUV0g5V0kzZF90a29TNUZIcGcwalZWaUNSbnB6eEU4cWJxcFE1VlJIVk5CNDZoRzVPV1dnaEx1STlFWHA1TXFyZW1N?oc=5) — Wed, 30 Sep 2026 15:17:00 GMT
- [Nepal Telecom contributes Rs 100 million to PM Natural Disaster Relief Fund - radionepalonline.com](https://news.google.com/rss/articles/CBMiZEFVX3lxTE04aGJGMXJfZ0k2M0pVTVRlVzg2ZzBoUGxGcUVtbE5zS2p4RmdJbENCdEVnT1lEUm9KU3JQak5aQVUxdzJZckZkLVJGb0hsbmN0UWFYZEhrcGNvc25iaWE3NV9GWXI?oc=5) — Wed, 09 Sep 2026 16:19:13 GMT
- [Bhotekoshi floods expose gaps in Nepal’s emergency communications - The Kathmandu Post](https://news.google.com/rss/articles/CBMisAFBVV95cUxQT1h4Y2ppQ2x1Z1lUbmVOMUVJZC1xOTlLWGJQWUdma1dtMU9TYTJfYVB2UmgxcTg4MVYtaTAtRzRBazdSeUZNeDk1M1VZWWEtb3psQldDb2cyUXRKdEp2UVBCMFlxTkFPZ2Rha2ZsVVctaGdJaHBUZlFhaXg3NHR2WGFwWVdGRWZsTlFPb3k2UkVVTm1yRl94U2ZSMTlMU1FVN3pfUlRTN2RMMUdweTM4UQ?oc=5) — Thu, 03 Sep 2026 07:00:00 GMT
- [Nepal Telecom restores services at 80 of 120 flood-affected sites - Nepalnews.com](https://news.google.com/rss/articles/CBMiuAFBVV95cUxQbVBaY1lnQUFYcThETFBudVh1Q3piVjBnQm84c2FiSzd6UGoxYWx3M0lob2ZmN2N3ZVFyaFF0SzBuQWM4R2ZqYTY1dUZjTWQtb241U1Rld29mdEM3YTdzZGJOMGJCN29UYWpETUh4Wk1BVG1DNTJ4cmw3MzloaVlPRnJYeU1OalI5Y0hDM1pXQndibVFjd2RNUU9fMGxKTnNpcW9iSWVvbjltRWlIRS1BTWgzYTVWNVZT?oc=5) — Fri, 28 Aug 2026 07:00:00 GMT
- [Nepal Telecom Services Disrupted by Flood Damage in Rasuwa and Nuwakot - Ratopati](https://news.google.com/rss/articles/CBMiwAFBVV95cUxQaS0zX3pVb25uRXFCTzZ0YTA3NTk3UkNzZHB6UnAyMVdob01hUElsMzVvc2llbzlsOG9OTzM5Z2VFTk42bzlFTzkyWTVhWHVDOW12bUJ2WTdLOGFKUjgwRWRNbm45eDJtMmFQY19aT3V6N2xYcmJFSERWTFZMbW15LTUzdDNGU0toYkNrb2hIVWdwRGhlR2tLZWxtMEs4aEozcVBNTG90MHBnS19Fd0gydjE3aHVfVG5HVXE5Y1FPNXQ?oc=5) — Wed, 26 Aug 2026 06:16:07 GMT
- [Nepal Telecom, Ncell restoring services in flood-hit areas - The Rising Nepal](https://news.google.com/rss/articles/CBMiUEFVX3lxTE1keTl2RkhJcERRcFNsbjBjRTBSeU54QnZPQVZEX3d1ZnRWMWFVcHBPb0sxSGVORjM0TF96bEpjRXhoTUxGVzdGaDc3ejhnX05s?oc=5) — Thu, 10 Sep 2026 00:46:10 GMT
- [Nepal Telecom restores 113 sites affected by Bhotekoshi flood - Khabarhub](https://news.google.com/rss/articles/CBMiWEFVX3lxTE9nZFdwTWdjZFRXWVZodzluRlRoblBaOGZXaUpKNVBQdXRTU2ZMVjFSYkhvLXB6YS0xS004elhveTUxeXdhanFlSVNLaDU1V3R0NEppVGJKeWw?oc=5) — Tue, 01 Sep 2026 14:22:29 GMT
- [Nepal Telecom Extends Free Service by Three Days in the Bhotekoshi Flood-Affected Area - Ekantipur](https://news.google.com/rss/articles/CBMi2AFBVV95cUxOTWtuZkdrdFdwOHRmYk9TNWJjSzYxMHZveVBDakZyQmROSFd5azJaZlJjUHZ1RVFVWUxUMXN1QzFfaW9nenVWTm9zZ29qVUtSS3FTYmQ5a0U5dVhBVE52OWg2ak4wUEZkOVRQM0hyTWZyYVpjWGFrUzRxLXhLU1NkMVNkU1N1OWhCT1lMRXIyNFN6TWZoLTdLZkxaaUNVTnlubmNyZXBfM2VJS2REUk1Vc0QtenQ4dTZDMXdsYUxsd0xjWGxGMXlaRndDR0dTajZnYjZ6S0N4a08?oc=5) — Thu, 27 Aug 2026 07:00:00 GMT
- [Nepal Telecom employees contribute over Rs 20 million to disaster relief fund - myRepublica](https://news.google.com/rss/articles/CBMiygFBVV95cUxQYUlENk5sMXplQURGTkpXQWJJc3lZNkFNQWZJYTBIbUx2YThyVXFoMjA1bk9sZVI1MW85YzV2eTlEdVctTm5rSl9qc2F2YldMaEJINWFGdmVmVkhOQ0psWFVsem8tcjJuUUM0UGNjYnpiZ3lkSzE2Skp0Q1l4d0Z1Zl96Q3NjMERYNExWUklhZ3hUWGNrVE1CNEFxYnAyRmw2MFZqRlpZaWZ4RlhEQzd6NzdJOTJYWVdGdEI1dFZZTnJZZnljdGZVVlh3?oc=5) — Tue, 08 Sep 2026 07:00:00 GMT
- [Nepal Telecom’s damaged fibre network restored in Rasuwagadhi, Betrawati - Nepalnews.com](https://news.google.com/rss/articles/CBMivwFBVV95cUxQVzlXVmlwUnF5VEh2TTl4OUdwREZMOEFUTk9pRmx6a2ZxZ3I5Q2N5Wkd2LXFNREZnUGZsUlE3dnNsckpKdGJVVFVFOTJMcmp3U1JtMFg3X2lySUlWbW9iRFplckdhUDZhbi1tWjFrV25rSEpGRVExWmdSZGR3a1hJWGJldVBBUEQxUGo0UXVOQjZJYzJzbnZQODAtbDYyampiUGRORktqSmItdzJ4NDJvNkdBUnd6V2YwbnFGeXhWTQ?oc=5) — Wed, 09 Sep 2026 07:00:00 GMT

## Open field reports
None open.

## How to apply
1. Confirm a headline against the original article.
2. Add/reuse `src/data/sources.json`.
3. Edit `snapshot.json` / `corridor.json` / `sites.json` with `as_of`.
4. Optional paired bulletin under `src/content/bulletins/{en,ne}/`.
5. `git add src && git commit && git push`.

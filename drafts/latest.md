# Restoration draft — 2026-10-22T11:51 NPT

Machine fetch only. **Do not copy into `snapshot.json` without a named public source.**

## Suggested human actions
- Northern CTGNet (AS23764) is **visible in RIS**. Keep the northern-transit chip as degraded/unknown until a named NTC source says the Galchhi–Rasuwagadhi fiber is repaired. Do **not** mark fiber `up` from BGP.
- Southern India transits (Airtel/Tata) still appear. National internet is likely still on those paths.
- Fiber, microwave, district site counts, Starlink: **no machine source**. Only update from a named NTC/news quote in `sources.json`.

## RIPEstat (AS23752)
- Prefix: `202.70.64.0/19`
- Upstreams (left): AS23764, AS4755, AS6453, AS9498
- Customers (right): AS131341, AS136794, AS139022, AS142008, AS14789, AS150138, AS45353
- Path observations: north 130 · south 228 · other 0
- Latest path confirm: 2026-10-22T06:06:49.500000 UTC

Distinct AS paths (prepending stripped, top 16):

- `AS23764 → AS23752` ×8 (north)
- `AS8218 → AS23764 → AS23752` ×7 (north)
- `AS6461 → AS9498 → AS23752` ×5 (south)
- `AS24482 → AS9498 → AS23752` ×5 (south)
- `AS199524 → AS9498 → AS23752` ×5 (south)
- `AS9002 → AS6453 → AS23752` ×4 (south)
- `AS24482 → AS23764 → AS23752` ×4 (north)
- `AS14840 → AS9498 → AS23752` ×4 (south)
- `AS47147 → AS3320 → AS6453 → AS23752` ×4 (south)
- `AS2914 → AS23764 → AS23752` ×3 (north)
- `AS3491 → AS9498 → AS23752` ×3 (south)
- `AS48185 → AS9498 → AS23752` ×3 (south)
- `AS3214 → AS9498 → AS23752` ×3 (south)
- `AS49544 → AS23764 → AS23752` ×3 (north)
- `AS35280 → AS6453 → AS23752` ×3 (south)
- `AS13030 → AS9498 → AS23752` ×3 (south)

## News headlines (publisher RSS; Google News is optional and often blocked from Actions)

### onlinekhabar-en (en)
No items.

### onlinekhabar-ne (ne)
- [भोटेकोशीले बगायो थातथलो, शोकले खोस्यो दशैं खुसी (तस्विरहरू)](https://www.onlinekhabar.com/2026/10/2042336/bhotekoshi-floods-flood-the-village-grief-takes-away-the-joy-of-dashain-photos) — Wed, 21 Oct 2026 14:37:47 +0000
- [बाढी प्रभावितको त्रिपालभित्रको दशैं : यसरी लगाए टीका (तस्वीरहरू)](https://www.onlinekhabar.com/2026/10/2042309/dashain-inside-the-tent-of-flood-victims-this-is-how-they-applied-tika-photos) — Wed, 21 Oct 2026 13:02:27 +0000
- [बाढीले खोस्यो दशैंको टीका, बेपत्ता आफन्तको पर्खाइमा खाली निधार](https://www.onlinekhabar.com/2026/10/2042290/floods-wash-away-dashain-tika-empty-foreheads-waiting-for-missing-relatives) — Wed, 21 Oct 2026 12:45:11 +0000

### rising-nepal (en)
Fetch failed: fetch failed (UND_ERR_CONNECT_TIMEOUT)

### kathmandu-post (en)
- [For Timure’s flood survivors, Dashain brings memories of the lives they lost](https://kathmandupost.com/national/2026/10/20/for-timure-s-flood-survivors-dashain-brings-memories-of-the-lives-they-lost) — 
- [In Gorkha’s flood-hit villages, even cooking a meal is a struggle](https://kathmandupost.com/national/2026/10/20/in-gorkha-s-flood-hit-villages-even-cooking-a-meal-is-a-struggle) — 
- [Baglung flood survivors face Dashain without homes as rebuilding stalls](https://kathmandupost.com/national/2026/10/20/baglung-flood-survivors-face-dashain-without-homes-as-rebuilding-stalls) — 

### ratopati (ne)
- [बाढीको छायामा स्थिरता खोजिरहेका खाल्टेका विस्थापित, तस्बिरहरू](https://www.ratopati.com/story/600802/displaced-people-from-khalte-seek-stability-in-the-shadow-of-floods-photos) — Thu, 22 Oct 2026 04:54:47 +0000

### gnews-en (en)
- [Nepal Telecom reports NPR 88 million in infrastructure damage following Bhotekoshi floods - Telecompaper](https://news.google.com/rss/articles/CBMizAFBVV95cUxNQm1IaEpqdzRtVnJCTGRuU1hOT3RvQ2tLcG9qX2dkQnloYjc2LUtwQTFKc0NIQlNTZ0xERlVrbnQ1Tm1XNzdYNjUwSlNoOVpIeHlLd0ExbEJBQVlEQVR5UGtFbDh5SnoxTXhQSW0yZjZqU0RublhSTm9mTlhmV1VIS2Q3TkNLWDhqTkVpSVdaZTdMZW53R2p6eWRjdEE2Rm45SGtWbGYta0dpWUwwNDBmNVZubGxkSEQydDVzcC1YWWRWT0l1cklqMVlKeWw?oc=5) — Thu, 01 Oct 2026 12:01:12 GMT
- [Nepal Telecom contributes Rs 100 million to PM Natural Disaster Relief Fund - radionepalonline.com](https://news.google.com/rss/articles/CBMiZEFVX3lxTE04aGJGMXJfZ0k2M0pVTVRlVzg2ZzBoUGxGcUVtbE5zS2p4RmdJbENCdEVnT1lEUm9KU3JQak5aQVUxdzJZckZkLVJGb0hsbmN0UWFYZEhrcGNvc25iaWE3NV9GWXI?oc=5) — Wed, 09 Sep 2026 16:19:13 GMT
- [Nepal Telecom suffers Rs 88.51 million in damages from August 26 flood - myRepublica](https://news.google.com/rss/articles/CBMixwFBVV95cUxOeFMwdzJHQnFMVTd0Mi11YWJ6UmlpMV8wVWRxU0kzNkZvVFZWVGZMZmFaR1g3ejBPdlp2TlNsck5LWE5BZGVqX0Z3Wi1PUFBqdkluTnYzTmtVZ2dCTENPZVBJOWE5Zmx6am1uMEczUk9FMDdma2RDOUtrNy0wcHBabGpuUHVUV0g5V0kzZF90a29TNUZIcGcwalZWaUNSbnB6eEU4cWJxcFE1VlJIVk5CNDZoRzVPV1dnaEx1STlFWHA1TXFyZW1N?oc=5) — Wed, 30 Sep 2026 15:17:00 GMT
- [Nepal Telecom suffers over NPR 88 million in infrastructure damage in Bhotekoshi floods - Daily Excelsior](https://news.google.com/rss/articles/CBMiuwFBVV95cUxNYU9lOEdobU9TWHVHRVEtUFZSVFdBLV9aRUlKXzZfSUEtY2ZOZ1BlM0ZHT1VHd2hnU0tkcVhKdzZ4Zm5peHEwWmtMNjJIOGFlT2FYNEE5ZnRGTm8tWXhPbl9aUmxSWm5VVWNjY0dybUdrTm10dWZZU1UyNXNnOGRlenBUV2pVN3lUVVI5WC1USTBfNUpuZzFDLUZldVlScWFXd2JodUFNLS1uN2ZVZm55R2ZvMWpfLS1aRmlZ0gG_AUFVX3lxTFAyNmQyQmZvc0FDc0xVMFpnUXRRRkpLcWNfMlA2TXd5ZlI3SnA4MW9DbWM1a2dvZkFkdUFMNmtZNG1uelIzYktDOVlnWjMxQWVjT3AyOXhlYVo1U09UdlRTNkwyQTJNeElQMGR0aFRieHVJSTh3ZGotWjlhNzF4YTVab1VQb3IzUzloV3dIT3BZbFJhaV9jNFB2bUNpWjg0QkVEcDBkYTZ1SVpoMzhnUkZLaGwtLU9DbDRzaTZyWi00?oc=5) — Thu, 01 Oct 2026 22:55:27 GMT
- [Nepal Telecom restores services at 80 of 120 flood-affected sites - Nepalnews.com](https://news.google.com/rss/articles/CBMiuAFBVV95cUxQbVBaY1lnQUFYcThETFBudVh1Q3piVjBnQm84c2FiSzd6UGoxYWx3M0lob2ZmN2N3ZVFyaFF0SzBuQWM4R2ZqYTY1dUZjTWQtb241U1Rld29mdEM3YTdzZGJOMGJCN29UYWpETUh4Wk1BVG1DNTJ4cmw3MzloaVlPRnJYeU1OalI5Y0hDM1pXQndibVFjd2RNUU9fMGxKTnNpcW9iSWVvbjltRWlIRS1BTWgzYTVWNVZT?oc=5) — Fri, 28 Aug 2026 07:00:00 GMT
- [Bhotekoshi floods expose gaps in Nepal’s emergency communications - The Kathmandu Post](https://news.google.com/rss/articles/CBMisAFBVV95cUxQT1h4Y2ppQ2x1Z1lUbmVOMUVJZC1xOTlLWGJQWUdma1dtMU9TYTJfYVB2UmgxcTg4MVYtaTAtRzRBazdSeUZNeDk1M1VZWWEtb3psQldDb2cyUXRKdEp2UVBCMFlxTkFPZ2Rha2ZsVVctaGdJaHBUZlFhaXg3NHR2WGFwWVdGRWZsTlFPb3k2UkVVTm1yRl94U2ZSMTlMU1FVN3pfUlRTN2RMMUdweTM4UQ?oc=5) — Thu, 03 Sep 2026 07:00:00 GMT
- [Nepal Telecom Services Disrupted by Flood Damage in Rasuwa and Nuwakot - Ratopati](https://news.google.com/rss/articles/CBMiwAFBVV95cUxQaS0zX3pVb25uRXFCTzZ0YTA3NTk3UkNzZHB6UnAyMVdob01hUElsMzVvc2llbzlsOG9OTzM5Z2VFTk42bzlFTzkyWTVhWHVDOW12bUJ2WTdLOGFKUjgwRWRNbm45eDJtMmFQY19aT3V6N2xYcmJFSERWTFZMbW15LTUzdDNGU0toYkNrb2hIVWdwRGhlR2tLZWxtMEs4aEozcVBNTG90MHBnS19Fd0gydjE3aHVfVG5HVXE5Y1FPNXQ?oc=5) — Wed, 26 Aug 2026 06:16:07 GMT
- [Nepal Telecom, Ncell restoring services in flood-hit areas - The Rising Nepal](https://news.google.com/rss/articles/CBMiUEFVX3lxTE1keTl2RkhJcERRcFNsbjBjRTBSeU54QnZPQVZEX3d1ZnRWMWFVcHBPb0sxSGVORjM0TF96bEpjRXhoTUxGVzdGaDc3ejhnX05s?oc=5) — Thu, 10 Sep 2026 00:46:10 GMT
- [Nepal Telecom restores 113 sites affected by Bhotekoshi flood - Khabarhub](https://news.google.com/rss/articles/CBMiWEFVX3lxTE9nZFdwTWdjZFRXWVZodzluRlRoblBaOGZXaUpKNVBQdXRTU2ZMVjFSYkhvLXB6YS0xS004elhveTUxeXdhanFlSVNLaDU1V3R0NEppVGJKeWw?oc=5) — Tue, 01 Sep 2026 14:22:29 GMT
- [Nepal Telecom Extends Free Service by Three Days in the Bhotekoshi Flood-Affected Area - Ekantipur](https://news.google.com/rss/articles/CBMi2AFBVV95cUxOTWtuZkdrdFdwOHRmYk9TNWJjSzYxMHZveVBDakZyQmROSFd5azJaZlJjUHZ1RVFVWUxUMXN1QzFfaW9nenVWTm9zZ29qVUtSS3FTYmQ5a0U5dVhBVE52OWg2ak4wUEZkOVRQM0hyTWZyYVpjWGFrUzRxLXhLU1NkMVNkU1N1OWhCT1lMRXIyNFN6TWZoLTdLZkxaaUNVTnlubmNyZXBfM2VJS2REUk1Vc0QtenQ4dTZDMXdsYUxsd0xjWGxGMXlaRndDR0dTajZnYjZ6S0N4a08?oc=5) — Thu, 27 Aug 2026 07:00:00 GMT
- [Nepal Telecom’s damaged fibre network restored in Rasuwagadhi, Betrawati - Nepalnews.com](https://news.google.com/rss/articles/CBMivwFBVV95cUxQVzlXVmlwUnF5VEh2TTl4OUdwREZMOEFUTk9pRmx6a2ZxZ3I5Q2N5Wkd2LXFNREZnUGZsUlE3dnNsckpKdGJVVFVFOTJMcmp3U1JtMFg3X2lySUlWbW9iRFplckdhUDZhbi1tWjFrV25rSEpGRVExWmdSZGR3a1hJWGJldVBBUEQxUGo0UXVOQjZJYzJzbnZQODAtbDYyampiUGRORktqSmItdzJ4NDJvNkdBUnd6V2YwbnFGeXhWTQ?oc=5) — Wed, 09 Sep 2026 07:00:00 GMT
- [Technical report details Bhotekoshi flood’s journey from Tibet to Devghat - Onlinekhabar English](https://news.google.com/rss/articles/CBMidkFVX3lxTE1McldQQXlGN1dJRzhwRlVWd0pMSWNBNFRrblM5TWxFczRvTnJMdDdxcjlETVRsUk16U25HY3diSDQ5YzMyd2FpdDBoSFduXzZUTHZwRjVjbTJRWVRrMkdGVGxEN25tU1BlN3NlWjN4MXRldjl1cWc?oc=5) — Thu, 27 Aug 2026 07:00:00 GMT

## Open field reports
None open.

## How to apply
1. Confirm a headline against the original article.
2. Add/reuse `src/data/sources.json`.
3. Edit `snapshot.json` / `corridor.json` / `sites.json` with `as_of`.
4. Optional paired bulletin under `src/content/bulletins/{en,ne}/`.
5. `git add src && git commit && git push`.

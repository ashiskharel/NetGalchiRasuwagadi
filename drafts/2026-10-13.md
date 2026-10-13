# Restoration draft — 2026-10-13T13:26 NPT

Machine fetch only. **Do not copy into `snapshot.json` without a named public source.**

## Suggested human actions
- Northern CTGNet (AS23764) is **visible in RIS**. Keep the northern-transit chip as degraded/unknown until a named NTC source says the Galchhi–Rasuwagadhi fiber is repaired. Do **not** mark fiber `up` from BGP.
- Southern India transits (Airtel/Tata) still appear. National internet is likely still on those paths.
- Fiber, microwave, district site counts, Starlink: **no machine source**. Only update from a named NTC/news quote in `sources.json`.

## RIPEstat (AS23752)
- Prefix: `202.70.64.0/19`
- Upstreams (left): AS23764, AS4755, AS6453, AS9498
- Customers (right): AS131341, AS136794, AS139022, AS142008, AS14789, AS150138, AS45353, AS58456
- Path observations: north 128 · south 233 · other 0
- Latest path confirm: 2026-10-13T07:41:55.180000 UTC

Distinct AS paths (prepending stripped, top 16):

- `AS8218 → AS23764 → AS23752` ×7 (north)
- `AS23764 → AS23752` ×7 (north)
- `AS24482 → AS9498 → AS23752` ×6 (south)
- `AS6461 → AS9498 → AS23752` ×5 (south)
- `AS24482 → AS23764 → AS23752` ×5 (north)
- `AS199524 → AS9498 → AS23752` ×5 (south)
- `AS9002 → AS6453 → AS23752` ×4 (south)
- `AS14840 → AS9498 → AS23752` ×4 (south)
- `AS47147 → AS3320 → AS6453 → AS23752` ×4 (south)
- `AS2914 → AS23764 → AS23752` ×3 (north)
- `AS3491 → AS9498 → AS23752` ×3 (south)
- `AS12779 → AS23764 → AS23752` ×3 (north)
- `AS48185 → AS6461 → AS9498 → AS23752` ×3 (south)
- `AS3214 → AS9498 → AS23752` ×3 (south)
- `AS35280 → AS6453 → AS23752` ×3 (south)
- `AS13030 → AS9498 → AS23752` ×3 (south)

## News headlines (publisher RSS; Google News is optional and often blocked from Actions)

### onlinekhabar-en (en)
No items.

### onlinekhabar-ne (ne)
- [सशस्त्र प्रहरी परिवार महिला संघद्वारा भोटेकोशी बाढी प्रभावितलाई राहत रकम हस्तान्तरण](https://www.onlinekhabar.com/2026/10/2038366/armed-police-family-womens-association-hands-over-relief-funds-to-bhotekoshi-flood-victims) — Tue, 13 Oct 2026 07:27:08 +0000
- [बूढीगण्डकी बाढी : धार्चेबाहेक सबै ठाउँमा विद्युत् आपूर्ति पुनः सञ्चालन](https://www.onlinekhabar.com/2026/10/2038291/budhi-gandaki-flood-power-supply-restored-to-all-areas-except-dharche) — Tue, 13 Oct 2026 06:36:49 +0000
- [बूढीगण्डकीको बाढीले उठाएका थप प्रश्नहरू](https://www.onlinekhabar.com/2026/10/2037786/more-questions-raised-by-the-budhigandaki-floods) — Tue, 13 Oct 2026 04:03:49 +0000

### rising-nepal (en)
- [NCP Coordinator Prachanda hands over houses built by YCL for victims of Bhotekoshi flood](https://risingnepaldaily.com/news/87747) — Tue, 13 Oct 2026 12:54:49 +0545

### kathmandu-post (en)
- [Budhigandaki flood victims struggle to find shelter](https://kathmandupost.com/national/2026/10/13/budhigandaki-flood-victims-struggle-to-find-shelter) — 
- [Their flood videos went viral. They are still haunted by what they saw](https://kathmandupost.com/national/2026/10/13/their-flood-videos-went-viral-they-are-still-haunted-by-what-they-saw) — 
- [Can Himalayan floods bridge the India-China divide?](https://kathmandupost.com/columns/2026/10/12/can-himalayan-floods-bridge-the-india-china-divide) — 
- [Budhigandaki flood: What the report says about the gap between local warnings and official records](https://kathmandupost.com/national/2026/10/12/budhigandaki-flood-what-the-report-says-about-the-gap-between-local-warnings-and-official-records) — 
- [Court ruling leads to cancellation of ‘Perfect Center Fillz’ trademark](https://kathmandupost.com/money/2026/10/12/court-ruling-leads-to-cancellation-of-perfect-center-fillz-trademark) — 
- [Flood cuts off two villages along Budhigandaki in Gorkha](https://kathmandupost.com/gandaki-province/2026/10/12/flood-cuts-off-two-villages-along-budhigandaki-in-gorkha) — 
- [Mud and debris mark the trail of a flash flood in Budhigandaki](https://kathmandupost.com/visual-stories/2026/10/12/mud-and-debris-mark-the-trail-of-a-flash-flood-in-budhigandaki) — 
- [Flood damage makes journeys longer and costlier in Rasuwa](https://kathmandupost.com/national/2026/10/12/flood-damage-makes-journeys-longer-and-costlier-in-rasuwa) — 
- [Locals alerted each other of Budhigandaki flood an hour before official warning](https://kathmandupost.com/national/2026/10/12/locals-alerted-each-other-of-budhigandaki-flood-an-hour-before-official-warning) — 

### ratopati (ne)
- [नेपाल टेलिकमको ‘अटम अफर २०८३’ सार्वजनिक, भ्वाइस र डाटामा नयाँ प्याकेज](https://www.ratopati.com/story/599294/nepal-telecoms-autumn-offer-2083-announced-new-packages-in-voice-and-data) — Tue, 13 Oct 2026 07:24:42 +0000

### gnews-en (en)
- [Nepal Telecom reports NPR 88 million in infrastructure damage following Bhotekoshi floods - Telecompaper](https://news.google.com/rss/articles/CBMizAFBVV95cUxNQm1IaEpqdzRtVnJCTGRuU1hOT3RvQ2tLcG9qX2dkQnloYjc2LUtwQTFKc0NIQlNTZ0xERlVrbnQ1Tm1XNzdYNjUwSlNoOVpIeHlLd0ExbEJBQVlEQVR5UGtFbDh5SnoxTXhQSW0yZjZqU0RublhSTm9mTlhmV1VIS2Q3TkNLWDhqTkVpSVdaZTdMZW53R2p6eWRjdEE2Rm45SGtWbGYta0dpWUwwNDBmNVZubGxkSEQydDVzcC1YWWRWT0l1cklqMVlKeWw?oc=5) — Thu, 01 Oct 2026 12:01:52 GMT
- [Nepal Telecom suffers Rs 88.51 million in damages from August 26 flood - myRepublica](https://news.google.com/rss/articles/CBMixwFBVV95cUxOeFMwdzJHQnFMVTd0Mi11YWJ6UmlpMV8wVWRxU0kzNkZvVFZWVGZMZmFaR1g3ejBPdlp2TlNsck5LWE5BZGVqX0Z3Wi1PUFBqdkluTnYzTmtVZ2dCTENPZVBJOWE5Zmx6am1uMEczUk9FMDdma2RDOUtrNy0wcHBabGpuUHVUV0g5V0kzZF90a29TNUZIcGcwalZWaUNSbnB6eEU4cWJxcFE1VlJIVk5CNDZoRzVPV1dnaEx1STlFWHA1TXFyZW1N?oc=5) — Wed, 30 Sep 2026 15:17:00 GMT
- [Nepal Telecom Suffers NPR 88.5 Million Damage In Bhotekoshi Floods - The Earth News](https://news.google.com/rss/articles/CBMikgFBVV95cUxOWVEyZVRuaXdBZ0FKTGZDaEtvYjQyeXNyeWdPZThVaDQ2bUl5UGV1aGlnZlB0dm1yMXZnQnF5OVJvVm5ITFo4NlZyaW4yT0NaSm1vNHhMRHJWTkVLUjRuUmZTY09kZS1XTzlzZ2tTNjlqVDRyOGFrd3FLTGdNZlRUaUJBRTZiWGx2cEp5SG8yRGRhQQ?oc=5) — Fri, 02 Oct 2026 07:34:03 GMT
- [Nepal Telecom suffers over NPR 88 million in infrastructure damage in Bhotekoshi floods - Daily Excelsior](https://news.google.com/rss/articles/CBMiuwFBVV95cUxNYU9lOEdobU9TWHVHRVEtUFZSVFdBLV9aRUlKXzZfSUEtY2ZOZ1BlM0ZHT1VHd2hnU0tkcVhKdzZ4Zm5peHEwWmtMNjJIOGFlT2FYNEE5ZnRGTm8tWXhPbl9aUmxSWm5VVWNjY0dybUdrTm10dWZZU1UyNXNnOGRlenBUV2pVN3lUVVI5WC1USTBfNUpuZzFDLUZldVlScWFXd2JodUFNLS1uN2ZVZm55R2ZvMWpfLS1aRmlZ0gG_AUFVX3lxTFAyNmQyQmZvc0FDc0xVMFpnUXRRRkpLcWNfMlA2TXd5ZlI3SnA4MW9DbWM1a2dvZkFkdUFMNmtZNG1uelIzYktDOVlnWjMxQWVjT3AyOXhlYVo1U09UdlRTNkwyQTJNeElQMGR0aFRieHVJSTh3ZGotWjlhNzF4YTVab1VQb3IzUzloV3dIT3BZbFJhaV9jNFB2bUNpWjg0QkVEcDBkYTZ1SVpoMzhnUkZLaGwtLU9DbDRzaTZyWi00?oc=5) — Thu, 01 Oct 2026 22:55:27 GMT
- [Nepal Telecom restores services at 80 of 120 flood-affected sites - Nepalnews.com](https://news.google.com/rss/articles/CBMiuAFBVV95cUxQbVBaY1lnQUFYcThETFBudVh1Q3piVjBnQm84c2FiSzd6UGoxYWx3M0lob2ZmN2N3ZVFyaFF0SzBuQWM4R2ZqYTY1dUZjTWQtb241U1Rld29mdEM3YTdzZGJOMGJCN29UYWpETUh4Wk1BVG1DNTJ4cmw3MzloaVlPRnJYeU1OalI5Y0hDM1pXQndibVFjd2RNUU9fMGxKTnNpcW9iSWVvbjltRWlIRS1BTWgzYTVWNVZT?oc=5) — Fri, 28 Aug 2026 07:00:00 GMT
- [Mobile services restored in flood-affected areas - The Rising Nepal](https://news.google.com/rss/articles/CBMiUEFVX3lxTE13ckNCOGRZdmJ4a0NVakxoQVhULUVvelN6S1lBZDd4MWpRSGhscHIxSDZ6RE51dnZpUC1DeThMSWx3X2tWajh4ZGlUWHB1cm5h?oc=5) — Sat, 29 Aug 2026 07:00:00 GMT
- [Bhotekoshi floods expose gaps in Nepal’s emergency communications - The Kathmandu Post](https://news.google.com/rss/articles/CBMisAFBVV95cUxQT1h4Y2ppQ2x1Z1lUbmVOMUVJZC1xOTlLWGJQWUdma1dtMU9TYTJfYVB2UmgxcTg4MVYtaTAtRzRBazdSeUZNeDk1M1VZWWEtb3psQldDb2cyUXRKdEp2UVBCMFlxTkFPZ2Rha2ZsVVctaGdJaHBUZlFhaXg3NHR2WGFwWVdGRWZsTlFPb3k2UkVVTm1yRl94U2ZSMTlMU1FVN3pfUlRTN2RMMUdweTM4UQ?oc=5) — Thu, 03 Sep 2026 07:00:00 GMT
- [Nepal Telecom Installs Solar System for Timure Telephone Tower - Ratopati](https://news.google.com/rss/articles/CBMilAFBVV95cUxQNk1xWDExLUVyeU9kQTVKNFNsSGpqSFd6SW9wUl9yOGhTYUlndDFqVXpjSVIzWlhRUExtcDlWOTNxM1N5NVl3cEZxU0dNam5nd2J1bTRxb3IzdVZUUjJOaXRQZFYzVkJHbU5lY3AxeW94UXZmLUtFTjN6M1RsclBESGpFbnY1ZzVtQmg1OFpZT2hySy1O?oc=5) — Mon, 28 Sep 2026 10:59:06 GMT
- [Nepal Telecom contributes Rs 100 million to PM Disaster Relief Fund - Nepal Khabar](https://news.google.com/rss/articles/CBMiWEFVX3lxTE5lcGxaNEZrVkpqdml5MHcyRHFRVU1Db0VEXzZxMzNQdEp3OFZSaHYta0F2VnI2bmI3UWV6TElULVJBOUNpQnZnWnk3dFFuSzluakI2Ri1rU1M?oc=5) — Wed, 09 Sep 2026 00:00:00 GMT
- [87 telecom towers disrupted in Rasuwa, Nuwakot and Dhading after flood - OnlineKhabar English News](https://news.google.com/rss/articles/CBMieEFVX3lxTE5tUTIxNEpwTF9VRmctbjdyS1I0SzBCNjZnMmNiNFhlMHo3T3dUUFVVNUhLenhWTUZIcXNfdkd0NEVid2pHRlE5T1FITVdrWURDYVZ5UGhYdmNBWk01VERpSlJFNTktVHRhYUR4cmtsc01RVTJjTnZ3cQ?oc=5) — Thu, 27 Aug 2026 07:00:00 GMT
- [Nepal Telecom restores mobile services up to Nepal-China border - Khabarhub](https://news.google.com/rss/articles/CBMiWEFVX3lxTE5nX1BCWFIzbDJsSXVaNzlqNlpHbTA1UWVUaUp1b1pIVHRFM3FxVWhIcl9FQzNwYW8ybHN2SzJ2R2FwdVBQMjRpcUFZeXZvVHFUeXd0MDRLblE?oc=5) — Sun, 30 Aug 2026 07:00:00 GMT
- [Nepal Telecom employees contribute over Rs 20 million to disaster relief fund - myRepublica](https://news.google.com/rss/articles/CBMiygFBVV95cUxQYUlENk5sMXplQURGTkpXQWJJc3lZNkFNQWZJYTBIbUx2YThyVXFoMjA1bk9sZVI1MW85YzV2eTlEdVctTm5rSl9qc2F2YldMaEJINWFGdmVmVkhOQ0psWFVsem8tcjJuUUM0UGNjYnpiZ3lkSzE2Skp0Q1l4d0Z1Zl96Q3NjMERYNExWUklhZ3hUWGNrVE1CNEFxYnAyRmw2MFZqRlpZaWZ4RlhEQzd6NzdJOTJYWVdGdEI1dFZZTnJZZnljdGZVVlh3?oc=5) — Tue, 08 Sep 2026 07:00:00 GMT

## Open field reports
None open.

## How to apply
1. Confirm a headline against the original article.
2. Add/reuse `src/data/sources.json`.
3. Edit `snapshot.json` / `corridor.json` / `sites.json` with `as_of`.
4. Optional paired bulletin under `src/content/bulletins/{en,ne}/`.
5. `git add src && git commit && git push`.

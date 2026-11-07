# Restoration draft — 2026-11-07T12:54 NPT

Machine fetch only. **Do not copy into `snapshot.json` without a named public source.**

## Suggested human actions
- Northern CTGNet (AS23764) is **visible in RIS**. Keep the northern-transit chip as degraded/unknown until a named NTC source says the Galchhi–Rasuwagadhi fiber is repaired. Do **not** mark fiber `up` from BGP.
- Southern India transits (Airtel/Tata) still appear. National internet is likely still on those paths.
- Fiber, microwave, district site counts, Starlink: **no machine source**. Only update from a named NTC/news quote in `sources.json`.

## RIPEstat (AS23752)
- Prefix: `202.70.64.0/19`
- Upstreams (left): AS23764, AS4755, AS6453, AS9498
- Customers (right): AS131341, AS136794, AS139022, AS142008, AS14789, AS45353, AS58456
- Path observations: north 129 · south 233 · other 0
- Latest path confirm: 2026-11-07T07:09:31.560000 UTC

Distinct AS paths (prepending stripped, top 16):

- `AS23764 → AS23752` ×8 (north)
- `AS8218 → AS23764 → AS23752` ×7 (north)
- `AS24482 → AS9498 → AS23752` ×6 (south)
- `AS6461 → AS9498 → AS23752` ×5 (south)
- `AS9002 → AS6453 → AS23752` ×4 (south)
- `AS24482 → AS23764 → AS23752` ×4 (north)
- `AS14840 → AS9498 → AS23752` ×4 (south)
- `AS199524 → AS9498 → AS23752` ×4 (south)
- `AS47147 → AS3320 → AS6453 → AS23752` ×4 (south)
- `AS2914 → AS23764 → AS23752` ×3 (north)
- `AS3491 → AS9498 → AS23752` ×3 (south)
- `AS48185 → AS9498 → AS23752` ×3 (south)
- `AS3214 → AS9498 → AS23752` ×3 (south)
- `AS49544 → AS23764 → AS23752` ×3 (north)
- `AS35280 → AS6453 → AS23752` ×3 (south)
- `AS34019 → AS3303 → AS6453 → AS23752` ×3 (south)

## News headlines (publisher RSS; Google News is optional and often blocked from Actions)

### onlinekhabar-en (en)
- [Nepali Congress to provide warm clothes and mental health counselling to flood-hit communities](https://english.onlinekhabar.com/nepali-congress-to-provide-warm-clothes-and-mental-health-counselling-to-flood-hit-communities.html) — Fri, 06 Nov 2026 11:35:12 +0000

### onlinekhabar-ne (ne)
- [रसुवा बाढी : अर्थतन्त्रमा पौने ५ खर्ब क्षति, पुनरुत्थानमा ७ खर्ब आवश्यक](https://www.onlinekhabar.com/2026/11/2053002/rasuwa-flood-500-million-rupees-damage-to-economy-700-million-rupees-needed-for-reconstruction) — Fri, 06 Nov 2026 15:43:28 +0000
- [कस्तो छ विदुरको अस्थायी सेल्टरमा बसेका बाढीपीडितको अवस्था ? (फोटो फिचर)](https://www.onlinekhabar.com/2026/11/2052676/what-is-the-condition-of-flood-victims-living-in-temporary-shelters-in-bidur-photo-feature) — Fri, 06 Nov 2026 15:35:18 +0000

### rising-nepal (en)
No items.

### kathmandu-post (en)
No items.

### ratopati (ne)
No items.

### gnews-en (en)
- [Nepal Telecom suffers over NPR 88 million in infrastructure damage in Bhotekoshi floods - ET Telecom](https://news.google.com/rss/articles/CBMi7AFBVV95cUxNTUNIYUV2RGFPSEVnSWJSQVZZNmxyWHluaDhsSVZRZmY4SllfbWJ2Uy1WVlpKbjhFTXRuVlFYY1RjeldnMmFWc0NfQ0xTQ0k4THlZRjZ2b29iajlKTmNnVTVuN29ta2czWkNqSFpHUzVBN1JsVWtnR1RiWFBTN3RlbVcyaS1MY1EtRDUzNWt2RUxqNmt4RnpSeDlIeFdXYnhBSjEyWFZoSlBTWEt5VmFWMHFEbHA2T1NjU1BGcVlyV3A0QnREelg2aXkybWQ1eWdIOHNESE1neWxaa0xCYTlKZGhNYldNcHowY2NIeg?oc=5) — Thu, 01 Oct 2026 07:00:00 GMT
- [Nepal Telecom reports NPR 88 million in infrastructure damage following Bhotekoshi floods - Telecompaper](https://news.google.com/rss/articles/CBMizAFBVV95cUxNQm1IaEpqdzRtVnJCTGRuU1hOT3RvQ2tLcG9qX2dkQnloYjc2LUtwQTFKc0NIQlNTZ0xERlVrbnQ1Tm1XNzdYNjUwSlNoOVpIeHlLd0ExbEJBQVlEQVR5UGtFbDh5SnoxTXhQSW0yZjZqU0RublhSTm9mTlhmV1VIS2Q3TkNLWDhqTkVpSVdaZTdMZW53R2p6eWRjdEE2Rm45SGtWbGYta0dpWUwwNDBmNVZubGxkSEQydDVzcC1YWWRWT0l1cklqMVlKeWw?oc=5) — Thu, 01 Oct 2026 12:01:12 GMT
- [Bhotekoshi floods expose gaps in Nepal’s emergency communications - The Kathmandu Post](https://news.google.com/rss/articles/CBMisAFBVV95cUxQT1h4Y2ppQ2x1Z1lUbmVOMUVJZC1xOTlLWGJQWUdma1dtMU9TYTJfYVB2UmgxcTg4MVYtaTAtRzRBazdSeUZNeDk1M1VZWWEtb3psQldDb2cyUXRKdEp2UVBCMFlxTkFPZ2Rha2ZsVVctaGdJaHBUZlFhaXg3NHR2WGFwWVdGRWZsTlFPb3k2UkVVTm1yRl94U2ZSMTlMU1FVN3pfUlRTN2RMMUdweTM4UQ?oc=5) — Thu, 03 Sep 2026 07:00:00 GMT
- [Nepal Telecom contributes Rs 100 million to PM Natural Disaster Relief Fund - Nepalnews.com](https://news.google.com/rss/articles/CBMitgFBVV95cUxObnp0bzdfRURUa2toTEFXNENwb3ZWVHBjUlp4UHQySE0yOWM1ZW83Vl82Rm1yMS1IM2lMUVp3em43aHFNWm0tYmo5d2ZXUnVJWEFBN1B6TWF0NnU3amNqSXd6cXV5ZDk0ZGtHMFU0aDRiV1RQZU44MkFMdFFhTHFPbzJqY1pxT1Z6LVZiRzM5WEtxSktEeEd4ZF81d0NXQ1VDSXg4VDZJYnhWMFlzdDJTUGZpbEhvQQ?oc=5) — Wed, 09 Sep 2026 07:00:00 GMT
- [Nepal Telecom suffers Rs 88.51 million in damages from August 26 flood - myRepublica](https://news.google.com/rss/articles/CBMixwFBVV95cUxOeFMwdzJHQnFMVTd0Mi11YWJ6UmlpMV8wVWRxU0kzNkZvVFZWVGZMZmFaR1g3ejBPdlp2TlNsck5LWE5BZGVqX0Z3Wi1PUFBqdkluTnYzTmtVZ2dCTENPZVBJOWE5Zmx6am1uMEczUk9FMDdma2RDOUtrNy0wcHBabGpuUHVUV0g5V0kzZF90a29TNUZIcGcwalZWaUNSbnB6eEU4cWJxcFE1VlJIVk5CNDZoRzVPV1dnaEx1STlFWHA1TXFyZW1N?oc=5) — Wed, 30 Sep 2026 07:00:00 GMT
- [Nepal Telecom’s damaged fibre network restored in Rasuwagadhi, Betrawati - Khabarhub](https://news.google.com/rss/articles/CBMiWEFVX3lxTE40MUU0OF8za1RtVXRLOUtvSjhfTVBkZExaeGxPcjlsSTY0N2YtZElSd1VwdVJ1cHo2UVFNUkxscjlTa2ZwTjlIMG4tWkxBSjJEY2lfNlZpS3Q?oc=5) — Wed, 09 Sep 2026 07:00:00 GMT
- [Nepal Telecom Services Disrupted by Flood Damage in Rasuwa and Nuwakot - Ratopati](https://news.google.com/rss/articles/CBMiwAFBVV95cUxQaS0zX3pVb25uRXFCTzZ0YTA3NTk3UkNzZHB6UnAyMVdob01hUElsMzVvc2llbzlsOG9OTzM5Z2VFTk42bzlFTzkyWTVhWHVDOW12bUJ2WTdLOGFKUjgwRWRNbm45eDJtMmFQY19aT3V6N2xYcmJFSERWTFZMbW15LTUzdDNGU0toYkNrb2hIVWdwRGhlR2tLZWxtMEs4aEozcVBNTG90MHBnS19Fd0gydjE3aHVfVG5HVXE5Y1FPNXQ?oc=5) — Wed, 26 Aug 2026 06:16:07 GMT
- [NTC provides free telephone, SMS and internet service in flood-hit areas - The Rising Nepal](https://news.google.com/rss/articles/CBMiUEFVX3lxTE56LUplMEYyaVNVNWxIZnR3RVc2a282WGZDcEpQejRhS1o2V0h2S0x5d0FGVVp5REl0Mzd1cmVzNFNCekt2ektsdGktb0xrZ1B3?oc=5) — Wed, 26 Aug 2026 08:13:12 GMT
- [87 telecom towers disrupted in Rasuwa, Nuwakot and Dhading after flood - OnlineKhabar English News](https://news.google.com/rss/articles/CBMieEFVX3lxTE5tUTIxNEpwTF9VRmctbjdyS1I0SzBCNjZnMmNiNFhlMHo3T3dUUFVVNUhLenhWTUZIcXNfdkd0NEVid2pHRlE5T1FITVdrWURDYVZ5UGhYdmNBWk01VERpSlJFNTktVHRhYUR4cmtsc01RVTJjTnZ3cQ?oc=5) — Thu, 27 Aug 2026 07:00:00 GMT
- [Nepal Telecom restores services at 80 of 120 flood-affected sites - Nepalnews.com](https://news.google.com/rss/articles/CBMiuAFBVV95cUxQbVBaY1lnQUFYcThETFBudVh1Q3piVjBnQm84c2FiSzd6UGoxYWx3M0lob2ZmN2N3ZVFyaFF0SzBuQWM4R2ZqYTY1dUZjTWQtb241U1Rld29mdEM3YTdzZGJOMGJCN29UYWpETUh4Wk1BVG1DNTJ4cmw3MzloaVlPRnJYeU1OalI5Y0hDM1pXQndibVFjd2RNUU9fMGxKTnNpcW9iSWVvbjltRWlIRS1BTWgzYTVWNVZT?oc=5) — Fri, 28 Aug 2026 07:00:00 GMT
- [Nepal Telecom Employees Donate Over NPR 20 Million For Bhote Koshi Flood Victims - Hamro Patro](https://news.google.com/rss/articles/CBMiuwFBVV95cUxPbjV3QnF4dUJ6azJ2LUFvN3N6ZDVna2hIVGJUSm81NUprRGZyek8zXzhFV2xjX1ZSRkZ5cm9jb0hZblM3TFNsS3NRcDNLZnNnT0tVNFBtYV9Wb2dXRklYOUV3dFpGWXRDYjU0U0tEMW5zOFE3QTZFTEUtTDVhZzJJRG16eUstTFplZkxIZGdrWTVRLUxvMFV1UEloNEZCbFFucnNRUnhTUnA0eUptbWFDei12R1lkTWxlcjV3?oc=5) — Tue, 08 Sep 2026 07:00:00 GMT
- [Nepal Telecom, Ncell restoring services in flood-hit areas - The Rising Nepal](https://news.google.com/rss/articles/CBMiUEFVX3lxTE1keTl2RkhJcERRcFNsbjBjRTBSeU54QnZPQVZEX3d1ZnRWMWFVcHBPb0sxSGVORjM0TF96bEpjRXhoTUxGVzdGaDc3ejhnX05s?oc=5) — Thu, 10 Sep 2026 00:46:10 GMT

## Open field reports
None open.

## How to apply
1. Confirm a headline against the original article.
2. Add/reuse `src/data/sources.json`.
3. Edit `snapshot.json` / `corridor.json` / `sites.json` with `as_of`.
4. Optional paired bulletin under `src/content/bulletins/{en,ne}/`.
5. `git add src && git commit && git push`.

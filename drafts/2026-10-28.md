# Restoration draft — 2026-10-28T12:36 NPT

Machine fetch only. **Do not copy into `snapshot.json` without a named public source.**

## Suggested human actions
- Northern CTGNet (AS23764) is **visible in RIS**. Keep the northern-transit chip as degraded/unknown until a named NTC source says the Galchhi–Rasuwagadhi fiber is repaired. Do **not** mark fiber `up` from BGP.
- Southern India transits (Airtel/Tata) still appear. National internet is likely still on those paths.
- Fiber, microwave, district site counts, Starlink: **no machine source**. Only update from a named NTC/news quote in `sources.json`.

## RIPEstat (AS23752)
- Prefix: `202.70.64.0/19`
- Upstreams (left): AS23764, AS4755, AS6453, AS9498
- Customers (right): AS131341, AS136794, AS139022, AS142008, AS14789, AS45353, AS58456
- Path observations: north 137 · south 224 · other 0
- Latest path confirm: 2026-10-28T06:51:14.110000 UTC

Distinct AS paths (prepending stripped, top 16):

- `AS23764 → AS23752` ×8 (north)
- `AS8218 → AS23764 → AS23752` ×7 (north)
- `AS6461 → AS9498 → AS23752` ×5 (south)
- `AS24482 → AS23764 → AS23752` ×5 (north)
- `AS24482 → AS9498 → AS23752` ×5 (south)
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
No items.

### rising-nepal (en)
No items.

### kathmandu-post (en)
- [Users turn to Nepal Telecom as private ISPs raise internet prices](https://kathmandupost.com/money/2026/10/28/users-turn-to-nepal-telecom-as-private-isps-raise-internet-prices) — 
- [Nuwakot flood victims form struggle committee to pressure federal government for help](https://kathmandupost.com/national/2026/10/27/nuwakot-flood-victims-form-struggle-committee-to-pressure-federal-government-for-help) — 

### ratopati (ne)
- [बुढीगण्डकी बाढीले विस्थापित शान्ति बजारका परिवार टेन्टमा (तस्बिरहरू)](https://www.ratopati.com/story/601761/families-of-shanti-bazaar-displaced-by-budhigandaki-floods-in-tents-photos) — Wed, 28 Oct 2026 06:40:00 +0000
- [भोटेकोशी बाढीमा बेपत्ता भएकाको मृत घोषणा प्रक्रिया बल्ल अघि बढ्यो](https://www.ratopati.com/story/601748/the-process-of-declaring-the-missing-in-the-bhotekoshi-flood-as-dead-has-finally-moved-forward) — Wed, 28 Oct 2026 05:02:14 +0000

### gnews-en (en)
- [Nepal Telecom reports NPR 88 million in infrastructure damage following Bhotekoshi floods - Telecompaper](https://news.google.com/rss/articles/CBMizAFBVV95cUxNQm1IaEpqdzRtVnJCTGRuU1hOT3RvQ2tLcG9qX2dkQnloYjc2LUtwQTFKc0NIQlNTZ0xERlVrbnQ1Tm1XNzdYNjUwSlNoOVpIeHlLd0ExbEJBQVlEQVR5UGtFbDh5SnoxTXhQSW0yZjZqU0RublhSTm9mTlhmV1VIS2Q3TkNLWDhqTkVpSVdaZTdMZW53R2p6eWRjdEE2Rm45SGtWbGYta0dpWUwwNDBmNVZubGxkSEQydDVzcC1YWWRWT0l1cklqMVlKeWw?oc=5) — Thu, 01 Oct 2026 12:01:12 GMT
- [Nepal Telecom suffers over NPR 88 million in infrastructure damage in Bhotekoshi floods - ET Telecom](https://news.google.com/rss/articles/CBMi7AFBVV95cUxNTUNIYUV2RGFPSEVnSWJSQVZZNmxyWHluaDhsSVZRZmY4SllfbWJ2Uy1WVlpKbjhFTXRuVlFYY1RjeldnMmFWc0NfQ0xTQ0k4THlZRjZ2b29iajlKTmNnVTVuN29ta2czWkNqSFpHUzVBN1JsVWtnR1RiWFBTN3RlbVcyaS1MY1EtRDUzNWt2RUxqNmt4RnpSeDlIeFdXYnhBSjEyWFZoSlBTWEt5VmFWMHFEbHA2T1NjU1BGcVlyV3A0QnREelg2aXkybWQ1eWdIOHNESE1neWxaa0xCYTlKZGhNYldNcHowY2NIeg?oc=5) — Thu, 01 Oct 2026 07:56:43 GMT
- [Nepal Telecom suffers Rs 88.51 million in damages from August 26 flood - myRepublica](https://news.google.com/rss/articles/CBMiwgFBVV95cUxQYVJfOTVQZFp6Z195aW9WZmtZcGdDc3ZwcGh2cUFvVTZwTWIxVTlvRFJsSmJIbzJzdVVfMmhCc0gwazYxby1ocXlyaDhxeXo4UUdXQk1sTFB4RnNnUks1LXdSMFY1S3MtcXU3VDlKcmk3UEVWdDZxeXZwRXdJYWUwdTlHeVFmak9iWThkLVpVVHRtLWsyYVpGd05yeVpiX0Ricm1Bc0NOQmR6ZEJFTVFHR2NHVEg5dUFtak9kMFJTaDUtZw?oc=5) — Wed, 30 Sep 2026 15:17:00 GMT
- [Bhotekoshi floods expose gaps in Nepal’s emergency communications - The Kathmandu Post](https://news.google.com/rss/articles/CBMisAFBVV95cUxQT1h4Y2ppQ2x1Z1lUbmVOMUVJZC1xOTlLWGJQWUdma1dtMU9TYTJfYVB2UmgxcTg4MVYtaTAtRzRBazdSeUZNeDk1M1VZWWEtb3psQldDb2cyUXRKdEp2UVBCMFlxTkFPZ2Rha2ZsVVctaGdJaHBUZlFhaXg3NHR2WGFwWVdGRWZsTlFPb3k2UkVVTm1yRl94U2ZSMTlMU1FVN3pfUlRTN2RMMUdweTM4UQ?oc=5) — Thu, 03 Sep 2026 07:00:00 GMT
- [Nepal Telecom restores services at 80 of 120 flood-affected sites - Nepalnews.com](https://news.google.com/rss/articles/CBMiuAFBVV95cUxQbVBaY1lnQUFYcThETFBudVh1Q3piVjBnQm84c2FiSzd6UGoxYWx3M0lob2ZmN2N3ZVFyaFF0SzBuQWM4R2ZqYTY1dUZjTWQtb241U1Rld29mdEM3YTdzZGJOMGJCN29UYWpETUh4Wk1BVG1DNTJ4cmw3MzloaVlPRnJYeU1OalI5Y0hDM1pXQndibVFjd2RNUU9fMGxKTnNpcW9iSWVvbjltRWlIRS1BTWgzYTVWNVZT?oc=5) — Fri, 28 Aug 2026 07:00:00 GMT
- [Mobile services restored in flood-affected areas - The Rising Nepal](https://news.google.com/rss/articles/CBMiUEFVX3lxTE13ckNCOGRZdmJ4a0NVakxoQVhULUVvelN6S1lBZDd4MWpRSGhscHIxSDZ6RE51dnZpUC1DeThMSWx3X2tWajh4ZGlUWHB1cm5h?oc=5) — Sat, 29 Aug 2026 00:40:00 GMT
- [Nepal Telecom Services Disrupted by Flood Damage in Rasuwa and Nuwakot - Ratopati](https://news.google.com/rss/articles/CBMiwAFBVV95cUxQaS0zX3pVb25uRXFCTzZ0YTA3NTk3UkNzZHB6UnAyMVdob01hUElsMzVvc2llbzlsOG9OTzM5Z2VFTk42bzlFTzkyWTVhWHVDOW12bUJ2WTdLOGFKUjgwRWRNbm45eDJtMmFQY19aT3V6N2xYcmJFSERWTFZMbW15LTUzdDNGU0toYkNrb2hIVWdwRGhlR2tLZWxtMEs4aEozcVBNTG90MHBnS19Fd0gydjE3aHVfVG5HVXE5Y1FPNXQ?oc=5) — Wed, 26 Aug 2026 06:16:07 GMT
- [87 telecom towers disrupted in Rasuwa, Nuwakot and Dhading after flood - OnlineKhabar English News](https://news.google.com/rss/articles/CBMieEFVX3lxTE5tUTIxNEpwTF9VRmctbjdyS1I0SzBCNjZnMmNiNFhlMHo3T3dUUFVVNUhLenhWTUZIcXNfdkd0NEVid2pHRlE5T1FITVdrWURDYVZ5UGhYdmNBWk01VERpSlJFNTktVHRhYUR4cmtsc01RVTJjTnZ3cQ?oc=5) — Thu, 27 Aug 2026 07:00:00 GMT
- [Nepal Telecom restores mobile services up to Nepal-China border - Khabarhub](https://news.google.com/rss/articles/CBMiWEFVX3lxTE5nX1BCWFIzbDJsSXVaNzlqNlpHbTA1UWVUaUp1b1pIVHRFM3FxVWhIcl9FQzNwYW8ybHN2SzJ2R2FwdVBQMjRpcUFZeXZvVHFUeXd0MDRLblE?oc=5) — Sun, 30 Aug 2026 07:00:00 GMT
- [Nepal Telecom contributes Rs 100 million to PM Natural Disaster Relief Fund - Nepalnews.com](https://news.google.com/rss/articles/CBMitgFBVV95cUxObnp0bzdfRURUa2toTEFXNENwb3ZWVHBjUlp4UHQySE0yOWM1ZW83Vl82Rm1yMS1IM2lMUVp3em43aHFNWm0tYmo5d2ZXUnVJWEFBN1B6TWF0NnU3amNqSXd6cXV5ZDk0ZGtHMFU0aDRiV1RQZU44MkFMdFFhTHFPbzJqY1pxT1Z6LVZiRzM5WEtxSktEeEd4ZF81d0NXQ1VDSXg4VDZJYnhWMFlzdDJTUGZpbEhvQQ?oc=5) — Wed, 09 Sep 2026 07:00:00 GMT
- [NT works to restore services in flood-hit areas - The Rising Nepal](https://news.google.com/rss/articles/CBMiUEFVX3lxTE4yRWswam81cUpzM0lPSVR6dGRoZHRsZmFRQ3dDRzVpOUxxVFROX1R6UElES1VsV3NDSF9kd2N3eHM0RnZzdWE1Z1VBNVdibDlz?oc=5) — Fri, 28 Aug 2026 01:22:39 GMT
- [Nepal Telecom’s damaged fibre network restored in Rasuwagadhi, Betrawati - Nepalnews.com](https://news.google.com/rss/articles/CBMivwFBVV95cUxQVzlXVmlwUnF5VEh2TTl4OUdwREZMOEFUTk9pRmx6a2ZxZ3I5Q2N5Wkd2LXFNREZnUGZsUlE3dnNsckpKdGJVVFVFOTJMcmp3U1JtMFg3X2lySUlWbW9iRFplckdhUDZhbi1tWjFrV25rSEpGRVExWmdSZGR3a1hJWGJldVBBUEQxUGo0UXVOQjZJYzJzbnZQODAtbDYyampiUGRORktqSmItdzJ4NDJvNkdBUnd6V2YwbnFGeXhWTQ?oc=5) — Wed, 09 Sep 2026 07:00:00 GMT

## Open field reports
None open.

## How to apply
1. Confirm a headline against the original article.
2. Add/reuse `src/data/sources.json`.
3. Edit `snapshot.json` / `corridor.json` / `sites.json` with `as_of`.
4. Optional paired bulletin under `src/content/bulletins/{en,ne}/`.
5. `git add src && git commit && git push`.

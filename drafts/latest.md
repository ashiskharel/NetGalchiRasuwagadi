# Restoration draft — 2026-11-13T13:41 NPT

Machine fetch only. **Do not copy into `snapshot.json` without a named public source.**

## Suggested human actions
- Northern CTGNet (AS23764) is **visible in RIS**. Keep the northern-transit chip as degraded/unknown until a named NTC source says the Galchhi–Rasuwagadhi fiber is repaired. Do **not** mark fiber `up` from BGP.
- Southern India transits (Airtel/Tata) still appear. National internet is likely still on those paths.
- Fiber, microwave, district site counts, Starlink: **no machine source**. Only update from a named NTC/news quote in `sources.json`.

## RIPEstat (AS23752)
- Prefix: `202.70.64.0/19`
- Upstreams (left): AS23764, AS4755, AS6453, AS9498
- Customers (right): AS131341, AS136794, AS139022, AS142008, AS14789, AS45353, AS58456
- Path observations: north 139 · south 224 · other 0
- Latest path confirm: 2026-11-13T07:56:29.020000 UTC

Distinct AS paths (prepending stripped, top 16):

- `AS23764 → AS23752` ×8 (north)
- `AS8218 → AS23764 → AS23752` ×6 (north)
- `AS24482 → AS9498 → AS23752` ×6 (south)
- `AS6461 → AS9498 → AS23752` ×5 (south)
- `AS24482 → AS23764 → AS23752` ×5 (north)
- `AS9002 → AS6453 → AS23752` ×4 (south)
- `AS14840 → AS9498 → AS23752` ×4 (south)
- `AS47147 → AS3320 → AS6453 → AS23752` ×4 (south)
- `AS2914 → AS23764 → AS23752` ×3 (north)
- `AS3491 → AS9498 → AS23752` ×3 (south)
- `AS12779 → AS23764 → AS23752` ×3 (north)
- `AS48185 → AS9498 → AS23752` ×3 (south)
- `AS3214 → AS9498 → AS23752` ×3 (south)
- `AS199524 → AS23764 → AS23752` ×3 (north)
- `AS49544 → AS23764 → AS23752` ×3 (north)
- `AS35280 → AS6453 → AS23752` ×3 (south)

## News headlines (publisher RSS; Google News is optional and often blocked from Actions)

### onlinekhabar-en (en)
No items.

### onlinekhabar-ne (ne)
- [तेह्रथुममा अलपत्र मध्यपहाडी लोकमार्गको प्रगति नभए ठेक्का रद्द गरिने](https://www.onlinekhabar.com/2026/11/2056565/contract-to-be-cancelled-if-there-is-no-progress-on-the-stalled-mid-hill-highway-in-tehrathum) — Fri, 13 Nov 2026 03:03:21 +0000

### rising-nepal (en)
No items.

### kathmandu-post (en)
- [Nepal seeks mountain-specific early warning systems after devastating flood](https://kathmandupost.com/national/2026/11/12/nepal-seeks-mountain-specific-early-warning-systems-after-devastating-flood) — 

### ratopati (ne)
No items.

### gnews-en (en)
- [Nepal Telecom suffers over NPR 88 million in infrastructure damage in Bhotekoshi floods - ET Telecom](https://news.google.com/rss/articles/CBMi7AFBVV95cUxNTUNIYUV2RGFPSEVnSWJSQVZZNmxyWHluaDhsSVZRZmY4SllfbWJ2Uy1WVlpKbjhFTXRuVlFYY1RjeldnMmFWc0NfQ0xTQ0k4THlZRjZ2b29iajlKTmNnVTVuN29ta2czWkNqSFpHUzVBN1JsVWtnR1RiWFBTN3RlbVcyaS1MY1EtRDUzNWt2RUxqNmt4RnpSeDlIeFdXYnhBSjEyWFZoSlBTWEt5VmFWMHFEbHA2T1NjU1BGcVlyV3A0QnREelg2aXkybWQ1eWdIOHNESE1neWxaa0xCYTlKZGhNYldNcHowY2NIeg?oc=5) — Thu, 01 Oct 2026 07:00:00 GMT
- [Nepal Telecom reports NPR 88 million in infrastructure damage following Bhotekoshi floods - Telecompaper](https://news.google.com/rss/articles/CBMizAFBVV95cUxNQm1IaEpqdzRtVnJCTGRuU1hOT3RvQ2tLcG9qX2dkQnloYjc2LUtwQTFKc0NIQlNTZ0xERlVrbnQ1Tm1XNzdYNjUwSlNoOVpIeHlLd0ExbEJBQVlEQVR5UGtFbDh5SnoxTXhQSW0yZjZqU0RublhSTm9mTlhmV1VIS2Q3TkNLWDhqTkVpSVdaZTdMZW53R2p6eWRjdEE2Rm45SGtWbGYta0dpWUwwNDBmNVZubGxkSEQydDVzcC1YWWRWT0l1cklqMVlKeWw?oc=5) — Thu, 01 Oct 2026 12:01:12 GMT
- [Nepal Telecom suffers Rs 88.51 million in damages from August 26 flood - myRepublica](https://news.google.com/rss/articles/CBMiwgFBVV95cUxQYVJfOTVQZFp6Z195aW9WZmtZcGdDc3ZwcGh2cUFvVTZwTWIxVTlvRFJsSmJIbzJzdVVfMmhCc0gwazYxby1ocXlyaDhxeXo4UUdXQk1sTFB4RnNnUks1LXdSMFY1S3MtcXU3VDlKcmk3UEVWdDZxeXZwRXdJYWUwdTlHeVFmak9iWThkLVpVVHRtLWsyYVpGd05yeVpiX0Ricm1Bc0NOQmR6ZEJFTVFHR2NHVEg5dUFtak9kMFJTaDUtZw?oc=5) — Wed, 30 Sep 2026 07:00:00 GMT
- [Nepal Telecom contributes Rs 100 million to PM Natural Disaster Relief Fund - Nepalnews.com](https://news.google.com/rss/articles/CBMitgFBVV95cUxObnp0bzdfRURUa2toTEFXNENwb3ZWVHBjUlp4UHQySE0yOWM1ZW83Vl82Rm1yMS1IM2lMUVp3em43aHFNWm0tYmo5d2ZXUnVJWEFBN1B6TWF0NnU3amNqSXd6cXV5ZDk0ZGtHMFU0aDRiV1RQZU44MkFMdFFhTHFPbzJqY1pxT1Z6LVZiRzM5WEtxSktEeEd4ZF81d0NXQ1VDSXg4VDZJYnhWMFlzdDJTUGZpbEhvQQ?oc=5) — Wed, 09 Sep 2026 07:00:00 GMT
- [Bhotekoshi floods expose gaps in Nepal’s emergency communications - The Kathmandu Post](https://news.google.com/rss/articles/CBMisAFBVV95cUxQT1h4Y2ppQ2x1Z1lUbmVOMUVJZC1xOTlLWGJQWUdma1dtMU9TYTJfYVB2UmgxcTg4MVYtaTAtRzRBazdSeUZNeDk1M1VZWWEtb3psQldDb2cyUXRKdEp2UVBCMFlxTkFPZ2Rha2ZsVVctaGdJaHBUZlFhaXg3NHR2WGFwWVdGRWZsTlFPb3k2UkVVTm1yRl94U2ZSMTlMU1FVN3pfUlRTN2RMMUdweTM4UQ?oc=5) — Thu, 03 Sep 2026 07:00:00 GMT
- [Nepal Telecom’s damaged fibre network restored in Rasuwagadhi, Betrawati - Khabarhub](https://news.google.com/rss/articles/CBMiWEFVX3lxTE40MUU0OF8za1RtVXRLOUtvSjhfTVBkZExaeGxPcjlsSTY0N2YtZElSd1VwdVJ1cHo2UVFNUkxscjlTa2ZwTjlIMG4tWkxBSjJEY2lfNlZpS3Q?oc=5) — Wed, 09 Sep 2026 07:00:00 GMT
- [NTC provides free telephone, SMS and internet service in flood-hit areas - The Rising Nepal](https://news.google.com/rss/articles/CBMiUEFVX3lxTE56LUplMEYyaVNVNWxIZnR3RVc2a282WGZDcEpQejRhS1o2V0h2S0x5d0FGVVp5REl0Mzd1cmVzNFNCekt2ektsdGktb0xrZ1B3?oc=5) — Wed, 26 Aug 2026 08:13:12 GMT
- [Nepal Telecom Services Disrupted by Flood Damage in Rasuwa and Nuwakot - Ratopati](https://news.google.com/rss/articles/CBMiwAFBVV95cUxQaS0zX3pVb25uRXFCTzZ0YTA3NTk3UkNzZHB6UnAyMVdob01hUElsMzVvc2llbzlsOG9OTzM5Z2VFTk42bzlFTzkyWTVhWHVDOW12bUJ2WTdLOGFKUjgwRWRNbm45eDJtMmFQY19aT3V6N2xYcmJFSERWTFZMbW15LTUzdDNGU0toYkNrb2hIVWdwRGhlR2tLZWxtMEs4aEozcVBNTG90MHBnS19Fd0gydjE3aHVfVG5HVXE5Y1FPNXQ?oc=5) — Wed, 26 Aug 2026 06:16:07 GMT
- [Nepal Telecom restores mobile, internet services across flood-hit areas - Nepalnews.com](https://news.google.com/rss/articles/CBMivwFBVV95cUxNcm1RZjVyN3FucklXaTg0MHRUS29kUmJ5d1VmTGZxaGNuRm93SVZhcmRNNVJwc0t0XzQ0N2dmeGFIT19GUXFsNkdRNllwTmw1enIwOFZ1TjdwZ2VBOVllaUtwZUZjWGFfNDNsME5MMldxdURmOTI4OTJPWFNVc3k3TzdmMUtFLVZMd0s0VWdfMVFXTjJ6dS1tWU5UR2g2amtIbWo2VF9XWm1SdURhb25ZbXR2OE9zd0c1X1pqbnBiQQ?oc=5) — Wed, 02 Sep 2026 07:00:00 GMT
- [Technical report details Bhotekoshi flood’s journey from Tibet to Devghat - OnlineKhabar English News](https://news.google.com/rss/articles/CBMidkFVX3lxTE1McldQQXlGN1dJRzhwRlVWd0pMSWNBNFRrblM5TWxFczRvTnJMdDdxcjlETVRsUk16U25HY3diSDQ5YzMyd2FpdDBoSFduXzZUTHZwRjVjbTJRWVRrMkdGVGxEN25tU1BlN3NlWjN4MXRldjl1cWc?oc=5) — Thu, 27 Aug 2026 07:00:00 GMT
- [Nepal Telecom, Ncell restoring services in flood-hit areas - The Rising Nepal](https://news.google.com/rss/articles/CBMiUEFVX3lxTE1keTl2RkhJcERRcFNsbjBjRTBSeU54QnZPQVZEX3d1ZnRWMWFVcHBPb0sxSGVORjM0TF96bEpjRXhoTUxGVzdGaDc3ejhnX05s?oc=5) — Thu, 10 Sep 2026 00:46:10 GMT
- [Nepal Telecom Extends Free Communication Services in Flood-Affected Areas - Ratopati](https://news.google.com/rss/articles/CBMiqAFBVV95cUxNYl96d3l1THhGSDd2czZBNkFQSXlGYlJYV1paZVROM2pKdEotdlJqam16WWMwZXFfM3hlWVlMa0dLZ2xaYTFyYWdscVQxcGltVjRNdWhhNXd6VnN2RmRJRDN6cnVnN1hraV80dm9OYldZQlhULTYxYUhHZnh1RUw0YmxUZ0djOWdYOWNPdjZuSXROeVJXY3hqQlFEQ3lRTjNrTnVVZ0x0NTQ?oc=5) — Thu, 27 Aug 2026 09:08:09 GMT

## Open field reports
None open.

## How to apply
1. Confirm a headline against the original article.
2. Add/reuse `src/data/sources.json`.
3. Edit `snapshot.json` / `corridor.json` / `sites.json` with `as_of`.
4. Optional paired bulletin under `src/content/bulletins/{en,ne}/`.
5. `git add src && git commit && git push`.

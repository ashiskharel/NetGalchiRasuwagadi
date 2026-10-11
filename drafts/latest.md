# Restoration draft — 2026-10-11T12:56 NPT

Machine fetch only. **Do not copy into `snapshot.json` without a named public source.**

## Suggested human actions
- Northern CTGNet (AS23764) is **visible in RIS**. Keep the northern-transit chip as degraded/unknown until a named NTC source says the Galchhi–Rasuwagadhi fiber is repaired. Do **not** mark fiber `up` from BGP.
- Southern India transits (Airtel/Tata) still appear. National internet is likely still on those paths.
- Fiber, microwave, district site counts, Starlink: **no machine source**. Only update from a named NTC/news quote in `sources.json`.

## RIPEstat (AS23752)
- Prefix: `202.70.64.0/19`
- Upstreams (left): AS23764, AS4755, AS6453, AS9498
- Customers (right): AS131341, AS136794, AS139022, AS14789, AS150138, AS45353, AS58456
- Path observations: north 131 · south 236 · other 0
- Latest path confirm: 2026-10-11T07:11:22.430000 UTC

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
- [Kathmandu-Dammam flight cancelled amid tensions in Saudi Arabia](https://english.onlinekhabar.com/kathmandu-dammam-flight-cancelled.html) — Sun, 11 Oct 2026 07:03:47 +0000
- [Army says dry landslide blocked Budhigandaki’s flow before flood](https://english.onlinekhabar.com/army-budhigandakis-before-flood.html) — Sun, 11 Oct 2026 06:59:38 +0000
- [Australian PM extends Dashain greetings to Nepali community, expresses solidarity with flood victims](https://english.onlinekhabar.com/australian-pm-extends-dashain-greetings-to-nepali-community-expresses-solidarity-with-flood-victims.html) — Sun, 11 Oct 2026 06:42:37 +0000
- [Dahal urges people to help Budhigandaki flood victims](https://english.onlinekhabar.com/dahal-budhigandaki-flood.html) — Sun, 11 Oct 2026 06:33:17 +0000
- [Budhigandaki flood: 10 people go missing; six bridges swept away](https://english.onlinekhabar.com/budhigandaki-flood-10-people-go-missing-six-bridges-swept-away.html) — Sun, 11 Oct 2026 06:31:56 +0000
- [Scenes from the Budhi Gandaki flood-affected areas (Photos)](https://english.onlinekhabar.com/budhi-gandaki-flood-photos.html) — Sun, 11 Oct 2026 05:43:08 +0000
- [Gandaki provincial health ministry releases preliminary details of Budhigandaki flood damage](https://english.onlinekhabar.com/details-budhigandaki-flood.html) — Sun, 11 Oct 2026 05:40:12 +0000
- [Budhigandaki flood washes away Times Energy buildings, 18 employees flee to safety](https://english.onlinekhabar.com/budhigandaki-flood-times-energy.html) — Sun, 11 Oct 2026 05:26:57 +0000
- [Deuba expresses grief over impact of Budhigandaki flood](https://english.onlinekhabar.com/deuba-grief-budhigandaki-flood.html) — Sun, 11 Oct 2026 05:20:24 +0000
- [Gagan Thapa expresses grief over Budhigandaki flood damage, urges help with rescue](https://english.onlinekhabar.com/gagan-thapa-budhigandaki-flood.html) — Sun, 11 Oct 2026 05:06:06 +0000

### onlinekhabar-ne (ne)
- [बूढीगण्डकी बाढी प्रभावितको सहयोगमा जुट्न प्रचण्डको आग्रह](https://www.onlinekhabar.com/2026/10/2036775/prachanda-urges-people-to-come-together-to-help-those-affected-by-the-budhigandaki-flood) — Sun, 11 Oct 2026 06:25:48 +0000
- [बुढीगण्डकी बाढीबारे सेनाको रिपोर्टिङ : ‘सुक्खा पहिरोले बहाव थुनियो अनि बाढी आयो’](https://www.onlinekhabar.com/2026/10/2036748/army-reporting-on-floods-in-budhi-gandaki-dry-landslide-blocked-the-flow-and-caused-flooding) — Sun, 11 Oct 2026 06:13:00 +0000
- [यस्तो देखिन्छ बूढीगण्डकी बाढी प्रभावित क्षेत्र (तस्वीरहरू)](https://www.onlinekhabar.com/2026/10/2036711/this-is-what-the-budhigandaki-flood-affected-area-looks-like-photos) — Sun, 11 Oct 2026 05:38:08 +0000
- [बूढीगण्डकी बाढी : टाइम्स इनर्जीका भवन बगे, १८ कर्मचारीले भागेर ज्यान जोगाए](https://www.onlinekhabar.com/2026/10/2036720/budhigandaki-flood-times-energy-building-washed-away-18-employees-escape-for-their-lives) — Sun, 11 Oct 2026 05:17:07 +0000
- [बूढीगण्डकीमा बाढी : प्रदेश स्वास्थ्य मन्त्रालयले सार्वजनिक गर्‍यो क्षतिको प्रारम्भिक विवरण](https://www.onlinekhabar.com/2026/10/2036707/floods-in-budhigandaki-provincial-health-ministry-releases-preliminary-details-of-damage) — Sun, 11 Oct 2026 05:15:51 +0000
- [बूढीगण्डकीमा कसरी आयो विनाशकारी बाढी ?](https://www.onlinekhabar.com/2026/10/2036626/how-did-the-devastating-flood-in-budhigandaki-occur) — Sun, 11 Oct 2026 05:13:56 +0000
- [देउवाद्वारा बूढीगण्डकी बाढीले पारेको असरप्रति दुःख व्यक्त](https://www.onlinekhabar.com/2026/10/2036714/deuba-expresses-grief-over-the-impact-of-budhigandaki-floods) — Sun, 11 Oct 2026 05:12:10 +0000
- [बूढीगण्डकी बाढीका कारण जोखिममा परेका ६ जनाको हवाई उद्धार](https://www.onlinekhabar.com/2026/10/2036709/air-rescue-of-6-people-at-risk-due-to-budhigandaki-floods) — Sun, 11 Oct 2026 04:56:24 +0000
- [बूढीगण्डकी बाढीले पुर्‍याएको क्षतिप्रति गगन थापाद्वारा दुःख व्यक्त, उद्धारमा जुट्न आग्रह](https://www.onlinekhabar.com/2026/10/2036704/gagan-thapa-expresses-grief-over-the-damage-caused-by-the-budhigandaki-floods-urges-people-to-join-in-the-rescue-efforts) — Sun, 11 Oct 2026 04:30:26 +0000
- [बूढीगण्डकी बाढीले आरुघाट-धादिङ जोड्ने पुल पनि बगायो](https://www.onlinekhabar.com/2026/10/2036686/the-budhigandaki-flood-also-washed-away-the-bridge-connecting-arughat-dhading) — Sun, 11 Oct 2026 03:53:05 +0000
- [बूढीगण्डकी बाढी : चार जनाको अवस्था अज्ञात](https://www.onlinekhabar.com/2026/10/2036675/budhigandaki-flood-condition-of-four-people-unknown) — Sun, 11 Oct 2026 03:33:54 +0000
- [उत्तरी गोरखावासी भन्छन् – पहिले यस्तो बाढी देखेका थिएनौं](https://www.onlinekhabar.com/2026/10/2036674/residents-of-north-gorkha-say-we-have-not-seen-such-floods-since-our-birth) — Sun, 11 Oct 2026 03:29:43 +0000

### rising-nepal (en)
- [Budhi Gandaki flood: Aarughat bazar being evacuated](https://risingnepaldaily.com/news/87662) — Sun, 11 Oct 2026 09:29:06 +0545
- [Budhi Gandaki flash flood: Salleri bazar, hydro power camp washed away](https://risingnepaldaily.com/news/87657) — Sun, 11 Oct 2026 08:58:09 +0545

### kathmandu-post (en)
- [‘It reminded me of the Bhotekoshi floods’: Gorkha residents recount escape](https://kathmandupost.com/national/2026/10/11/it-reminded-me-of-the-bhotekoshi-floods-gorkha-residents-recount-escape) — 
- [Five things to know about the Budhi Gandaki flash flood](https://kathmandupost.com/gandaki-province/2026/10/11/five-things-to-know-about-the-budhi-gandaki-flash-flood) — 
- [Bailey bridge restores road link between Rasuwa and Nuwakot after six weeks](https://kathmandupost.com/national/2026/10/11/bailey-bridge-restores-road-link-between-rasuwa-and-nuwakot-after-six-weeks) — 
- [Landslide may have triggered flash flooding in Budhi Gandaki, officials say](https://kathmandupost.com/gandaki-province/2026/10/11/landslide-may-have-triggered-flash-flooding-in-budhi-gandaki) — 
- [Four people unaccounted for after Budhi Gandaki floods](https://kathmandupost.com/gandaki-province/2026/10/11/four-people-unaccounted-for-after-budhi-gandaki-floods) — 
- [What we know so far about the damage caused by Budhi Gandaki floods](https://kathmandupost.com/gandaki-province/2026/10/11/what-we-know-so-far-about-the-damage-caused-by-budhi-gandaki-floods) — 
- [Budhi Gandaki flood washes away three bridges in Gorkha](https://kathmandupost.com/national/2026/10/11/budhi-gandaki-flood-washes-away-three-bridges-in-gorkha) — 
- [Flood sweeps away houses, bridges in Gorkha](https://kathmandupost.com/national/2026/10/11/flood-sweeps-away-seven-houses-in-gorkha) — 
- [Smuggling networks exploit Nepal’s open border to flood markets with untaxed goods](https://kathmandupost.com/national/2026/10/11/smuggling-networks-exploit-nepal-s-open-border-to-flood-markets-with-untaxed-goods) — 

### ratopati (ne)
- [बुढीगण्डकीको बाढीले शान्ति बजारका घर डुबानमा (तस्बिरहरू)](https://www.ratopati.com/story/598801/houses-in-shanti-bazaar-submerged-by-budhi-gandaki-floods-photos) — Sun, 11 Oct 2026 07:06:48 +0000
- [पहिरोले बुढीगण्डकी थुनिँदा बाढीको वितण्डा](https://www.ratopati.com/story/598744/floods-erupt-as-landslide-blocks-budhi-gandaki) — Sun, 11 Oct 2026 07:00:00 +0000
- [बूढीगण्डकी बाढी अपडेट : ६ वटा पुल बगे, १० जना सम्पर्कविहीन](https://www.ratopati.com/story/598799/budhigandaki-flood-update-6-bridges-washed-away-10-people-missing) — Sun, 11 Oct 2026 06:57:35 +0000
- [बुढीगण्डकी बाढीले आरुघाट र सोती खोलाका पुलमा ठूलो क्षति, सडक विभागद्वारा प्राविधिक अध्ययन सुरु](https://www.ratopati.com/story/598797/budhi-gandaki-flood-causes-major-damage-to-bridges-over-arughat-and-soti-rivers-road-department-begins-technical-study) — Sun, 11 Oct 2026 06:49:42 +0000
- [बूढीगण्डकी बाढी : त्रिशूली र नारायणी किनारमा सतर्कता](https://www.ratopati.com/story/598795/budhigandaki-flood-vigilance-on-the-banks-of-trishuli-and-narayani) — Sun, 11 Oct 2026 06:44:48 +0000
- [बुढीगण्डकीमा कसरी आयो बाढी ? के भन्छ बाढी पूर्वानुमान महाशाखा ?](https://www.ratopati.com/story/598794/how-did-the-flood-occur-in-budhi-gandaki-what-does-the-flood-forecasting-division-say) — Sun, 11 Oct 2026 06:41:03 +0000
- [बूढीगण्डकी बाढीले पारेको असरको खबरले अत्यन्त दुःखी बनाएको छ :  डा.शशांक](https://www.ratopati.com/story/598791/news-of-the-impact-of-the-budhigandaki-floods-has-made-me-extremely-sad-dr-shashank) — Sun, 11 Oct 2026 06:21:08 +0000
- [बूढीगण्डकी बाढी प्रभावित नागरिकको उद्धार र सुरक्षामा जुट्न प्रचण्डको आग्रह](https://www.ratopati.com/story/598787/prachanda-urges-people-to-join-hands-in-rescuing-and-protecting-citizens-affected-by-budhigandaki-floods) — Sun, 11 Oct 2026 06:05:34 +0000
- [गोरखाको बाढी क्षेत्रमा सेनाको खोज तथा उद्धार टोली परिचालन, ६ जनाको हवाई उद्धार](https://www.ratopati.com/story/598778/army-search-and-rescue-team-mobilized-in-flood-hit-gorkha-6-people-airlifted) — Sun, 11 Oct 2026 05:35:17 +0000

### gnews-en (en)
- [Nepal Telecom reports NPR 88 million in infrastructure damage following Bhotekoshi floods - Telecompaper](https://news.google.com/rss/articles/CBMizAFBVV95cUxNQm1IaEpqdzRtVnJCTGRuU1hOT3RvQ2tLcG9qX2dkQnloYjc2LUtwQTFKc0NIQlNTZ0xERlVrbnQ1Tm1XNzdYNjUwSlNoOVpIeHlLd0ExbEJBQVlEQVR5UGtFbDh5SnoxTXhQSW0yZjZqU0RublhSTm9mTlhmV1VIS2Q3TkNLWDhqTkVpSVdaZTdMZW53R2p6eWRjdEE2Rm45SGtWbGYta0dpWUwwNDBmNVZubGxkSEQydDVzcC1YWWRWT0l1cklqMVlKeWw?oc=5) — Thu, 01 Oct 2026 12:01:52 GMT
- [Nepal Telecom suffers Rs 88.51 million in damages from August 26 flood - myRepublica](https://news.google.com/rss/articles/CBMiwgFBVV95cUxQYVJfOTVQZFp6Z195aW9WZmtZcGdDc3ZwcGh2cUFvVTZwTWIxVTlvRFJsSmJIbzJzdVVfMmhCc0gwazYxby1ocXlyaDhxeXo4UUdXQk1sTFB4RnNnUks1LXdSMFY1S3MtcXU3VDlKcmk3UEVWdDZxeXZwRXdJYWUwdTlHeVFmak9iWThkLVpVVHRtLWsyYVpGd05yeVpiX0Ricm1Bc0NOQmR6ZEJFTVFHR2NHVEg5dUFtak9kMFJTaDUtZw?oc=5) — Wed, 30 Sep 2026 15:17:00 GMT
- [Nepal Telecom Suffers NPR 88.5 Million Damage In Bhotekoshi Floods - The Earth News](https://news.google.com/rss/articles/CBMikgFBVV95cUxOWVEyZVRuaXdBZ0FKTGZDaEtvYjQyeXNyeWdPZThVaDQ2bUl5UGV1aGlnZlB0dm1yMXZnQnF5OVJvVm5ITFo4NlZyaW4yT0NaSm1vNHhMRHJWTkVLUjRuUmZTY09kZS1XTzlzZ2tTNjlqVDRyOGFrd3FLTGdNZlRUaUJBRTZiWGx2cEp5SG8yRGRhQQ?oc=5) — Fri, 02 Oct 2026 07:34:03 GMT
- [Nepal Telecom suffers over NPR 88 million in infrastructure damage in Bhotekoshi floods - Daily Excelsior](https://news.google.com/rss/articles/CBMiuwFBVV95cUxNYU9lOEdobU9TWHVHRVEtUFZSVFdBLV9aRUlKXzZfSUEtY2ZOZ1BlM0ZHT1VHd2hnU0tkcVhKdzZ4Zm5peHEwWmtMNjJIOGFlT2FYNEE5ZnRGTm8tWXhPbl9aUmxSWm5VVWNjY0dybUdrTm10dWZZU1UyNXNnOGRlenBUV2pVN3lUVVI5WC1USTBfNUpuZzFDLUZldVlScWFXd2JodUFNLS1uN2ZVZm55R2ZvMWpfLS1aRmlZ0gG_AUFVX3lxTFAyNmQyQmZvc0FDc0xVMFpnUXRRRkpLcWNfMlA2TXd5ZlI3SnA4MW9DbWM1a2dvZkFkdUFMNmtZNG1uelIzYktDOVlnWjMxQWVjT3AyOXhlYVo1U09UdlRTNkwyQTJNeElQMGR0aFRieHVJSTh3ZGotWjlhNzF4YTVab1VQb3IzUzloV3dIT3BZbFJhaV9jNFB2bUNpWjg0QkVEcDBkYTZ1SVpoMzhnUkZLaGwtLU9DbDRzaTZyWi00?oc=5) — Thu, 01 Oct 2026 22:55:27 GMT
- [Nepal Telecom installs solar system at Timure tower to end fuel dependency - Nepalnews.com](https://news.google.com/rss/articles/CBMixAFBVV95cUxNOG8xZmNERVlqYkNWd2JaWWl3ejRwcWJOVG9aaFVTdHI0SWZqdGx0Y1RzTWJWdl80WTFQWnZJQ1RJRzc1eC13dnRsN2VuZjdWci0wTGVQdFFGT0QxQlNUMXREUGp6ZU5NUmQyTFdrZmhwYzBxYWFkY3ZIMkxRa2o5anFYbXA4MkFic29sT3BGbFowTDNLc0FZSzBwdU1oeWRSSUZHS1pJVGNHOUR2RWFnRWRNU0d0ZTV3bjUteW92SWVfbG9s?oc=5) — Mon, 28 Sep 2026 07:00:00 GMT
- [Solar system installed at Timure telephone tower, ending need to transport diesel - Khabarhub](https://news.google.com/rss/articles/CBMiWEFVX3lxTFAyLWZEbjZmdlU4RFV3dG5NV0FUbDRySEtUNXRwS29ZX0daS28yck5NLUtxODB5cjNxSTN0TGREQkM4d1JhWGt0X3ozeXQ1bmltMERNa1Ewc3k?oc=5) — Mon, 28 Sep 2026 14:52:57 GMT
- [Nepal Telecom Installs Solar System for Timure Telephone Tower - Ratopati](https://news.google.com/rss/articles/CBMilAFBVV95cUxQNk1xWDExLUVyeU9kQTVKNFNsSGpqSFd6SW9wUl9yOGhTYUlndDFqVXpjSVIzWlhRUExtcDlWOTNxM1N5NVl3cEZxU0dNam5nd2J1bTRxb3IzdVZUUjJOaXRQZFYzVkJHbU5lY3AxeW94UXZmLUtFTjN6M1RsclBESGpFbnY1ZzVtQmg1OFpZT2hySy1O?oc=5) — Mon, 28 Sep 2026 10:59:06 GMT
- [Mobile services restored in flood-affected areas - The Rising Nepal](https://news.google.com/rss/articles/CBMiUEFVX3lxTE13ckNCOGRZdmJ4a0NVakxoQVhULUVvelN6S1lBZDd4MWpRSGhscHIxSDZ6RE51dnZpUC1DeThMSWx3X2tWajh4ZGlUWHB1cm5h?oc=5) — Sat, 29 Aug 2026 07:00:00 GMT
- [Bhotekoshi floods expose gaps in Nepal’s emergency communications - The Kathmandu Post](https://news.google.com/rss/articles/CBMisAFBVV95cUxQT1h4Y2ppQ2x1Z1lUbmVOMUVJZC1xOTlLWGJQWUdma1dtMU9TYTJfYVB2UmgxcTg4MVYtaTAtRzRBazdSeUZNeDk1M1VZWWEtb3psQldDb2cyUXRKdEp2UVBCMFlxTkFPZ2Rha2ZsVVctaGdJaHBUZlFhaXg3NHR2WGFwWVdGRWZsTlFPb3k2UkVVTm1yRl94U2ZSMTlMU1FVN3pfUlRTN2RMMUdweTM4UQ?oc=5) — Thu, 03 Sep 2026 07:00:00 GMT
- [Nepal Telecom contributes Rs 100 million to PM Disaster Relief Fund - Nepal Khabar](https://news.google.com/rss/articles/CBMiWEFVX3lxTE5lcGxaNEZrVkpqdml5MHcyRHFRVU1Db0VEXzZxMzNQdEp3OFZSaHYta0F2VnI2bmI3UWV6TElULVJBOUNpQnZnWnk3dFFuSzluakI2Ri1rU1M?oc=5) — Wed, 09 Sep 2026 00:00:00 GMT
- [Nepal Telecom restores services at 80 of 120 flood-affected sites - Nepalnews.com](https://news.google.com/rss/articles/CBMiuAFBVV95cUxQbVBaY1lnQUFYcThETFBudVh1Q3piVjBnQm84c2FiSzd6UGoxYWx3M0lob2ZmN2N3ZVFyaFF0SzBuQWM4R2ZqYTY1dUZjTWQtb241U1Rld29mdEM3YTdzZGJOMGJCN29UYWpETUh4Wk1BVG1DNTJ4cmw3MzloaVlPRnJYeU1OalI5Y0hDM1pXQndibVFjd2RNUU9fMGxKTnNpcW9iSWVvbjltRWlIRS1BTWgzYTVWNVZT?oc=5) — Fri, 28 Aug 2026 07:00:00 GMT
- [Nepal Telecom employees contribute over Rs 20 million to disaster relief fund - myRepublica](https://news.google.com/rss/articles/CBMiygFBVV95cUxQYUlENk5sMXplQURGTkpXQWJJc3lZNkFNQWZJYTBIbUx2YThyVXFoMjA1bk9sZVI1MW85YzV2eTlEdVctTm5rSl9qc2F2YldMaEJINWFGdmVmVkhOQ0psWFVsem8tcjJuUUM0UGNjYnpiZ3lkSzE2Skp0Q1l4d0Z1Zl96Q3NjMERYNExWUklhZ3hUWGNrVE1CNEFxYnAyRmw2MFZqRlpZaWZ4RlhEQzd6NzdJOTJYWVdGdEI1dFZZTnJZZnljdGZVVlh3?oc=5) — Tue, 08 Sep 2026 07:00:00 GMT

## Open field reports
None open.

## How to apply
1. Confirm a headline against the original article.
2. Add/reuse `src/data/sources.json`.
3. Edit `snapshot.json` / `corridor.json` / `sites.json` with `as_of`.
4. Optional paired bulletin under `src/content/bulletins/{en,ne}/`.
5. `git add src && git commit && git push`.

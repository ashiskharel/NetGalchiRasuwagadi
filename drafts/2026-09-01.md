# Restoration draft — 2026-09-01T11:59 NPT

Machine fetch only. **Do not copy into `snapshot.json` without a named public source.**

## Suggested human actions
- Northern CTGNet (AS23764) is **visible in RIS**. Keep the northern-transit chip as degraded/unknown until a named NTC source says the Galchhi–Rasuwagadhi fiber is repaired. Do **not** mark fiber `up` from BGP.
- Southern India transits (Airtel/Tata) still appear. National internet is likely still on those paths.
- Fiber, microwave, district site counts, Starlink: **no machine source**. Only update from a named NTC/news quote in `sources.json`.

## RIPEstat (AS23752)
- Prefix: `202.70.64.0/19`
- Upstreams (left): AS23764, AS4755, AS6453, AS9498
- Customers (right): AS131341, AS139022, AS142008, AS14789, AS45353, AS58456
- Path observations: north 0 · south 353 · other 0
- Latest path confirm: 2026-09-01T06:14:43.930000 UTC

Distinct AS paths (prepending stripped, top 16):

- `AS24482 → AS9498 → AS23752` ×10 (south)
- `AS8218 → AS9498 → AS23752` ×7 (south)
- `AS6461 → AS9498 → AS23752` ×5 (south)
- `AS199524 → AS9498 → AS23752` ×5 (south)
- `AS13030 → AS9498 → AS23752` ×4 (south)
- `AS9002 → AS6453 → AS23752` ×4 (south)
- `AS12779 → AS9498 → AS23752` ×4 (south)
- `AS3214 → AS9498 → AS23752` ×4 (south)
- `AS14840 → AS9498 → AS23752` ×4 (south)
- `AS9498 → AS23752` ×4 (south)
- `AS47147 → AS3320 → AS6453 → AS23752` ×4 (south)
- `AS2914 → AS9498 → AS23752` ×3 (south)
- `AS3491 → AS9498 → AS23752` ×3 (south)
- `AS48185 → AS9498 → AS23752` ×3 (south)
- `AS34927 → AS57463 → AS9498 → AS23752` ×3 (south)
- `AS271253 → AS9498 → AS23752` ×3 (south)

## News headlines (publisher RSS; Google News is optional and often blocked from Actions)

### onlinekhabar-en (en)
- [Rasuwa flood: Death toll reaches 987, 3,916 still unaccounted for](https://english.onlinekhabar.com/rasuwa-flood-death-toll-7.html) — Tue, 01 Sep 2026 05:52:24 +0000
- [Rasuwa customs point’s future uncertain after floods wipe out key infrastructure](https://english.onlinekhabar.com/rasuwa-customs-points-future.html) — Tue, 01 Sep 2026 05:37:58 +0000
- [Rasuwa all-party meeting prioritises ward-level relief, infrastructure repair](https://english.onlinekhabar.com/rasuwa-all-party-meeting-prioritises-ward-level-relief-infrastructure-repair.html) — Tue, 01 Sep 2026 05:22:17 +0000
- [Hydropower worker escapes flood, spends night alone in cave](https://english.onlinekhabar.com/hydropower-worker-flood.html) — Tue, 01 Sep 2026 04:56:50 +0000
- [All-party meeting to discuss Bhotekoshi flood damage, rescue and rehabilitation](https://english.onlinekhabar.com/all-party-bhotekoshi-flood.html) — Tue, 01 Sep 2026 04:21:53 +0000
- [Bodies continue to be found in India, toll reaches 13 as Bhotekoshi flood link suspected](https://english.onlinekhabar.com/bodies-india-bhotekoshi.html) — Tue, 01 Sep 2026 02:28:29 +0000
- [198 still missing from Upper Trishuli-3B hydropower project after Bhotekoshi flood](https://english.onlinekhabar.com/upper-trishuli-3b-flood-missing.html) — Mon, 31 Aug 2026 15:16:20 +0000
- [Nepal Army leads rescue efforts in flood-hit areas (Photos)](https://english.onlinekhabar.com/nepal-army-rescue-flood.html) — Mon, 31 Aug 2026 15:05:23 +0000
- [Nepal asks Loss and Damage Fund for emergency financing after Bhotekoshi floods](https://english.onlinekhabar.com/nepal-loss-and-damage-fund-flood.html) — Mon, 31 Aug 2026 14:56:05 +0000

### onlinekhabar-ne (ne)
- [भोटेकोशी बाढीपीडितका लागि कर्णाली सरकारले दुई करोड दिने](https://www.onlinekhabar.com/2026/09/2008331/karnali-government-to-provide-rs-20-million-for-bhotekoshi-flood-victims) — Tue, 01 Sep 2026 05:56:59 +0000
- [रसुवा बाढी : मृत्यु हुनेको संख्या ९८७ पुग्यो, ३ हजार ९१६ अझै सम्पर्कविहीन](https://www.onlinekhabar.com/2026/09/2008324/rasuwa-flood-death-toll-reaches-987-3916-still-unaccounted-for) — Tue, 01 Sep 2026 05:43:46 +0000
- [रसुवा बाढी : सास भेटिने आस मारेपछि कुशको शव बनाएर अन्त्येष्टि](https://www.onlinekhabar.com/2026/09/2008276/rasuwa-flood-kushs-body-being-cremated-after-losing-hope-of-finding-his-soul) — Tue, 01 Sep 2026 04:34:38 +0000
- [त्रिशूली वारिपारि बिरानो भए बस्ती, चीन सिमानादेखि गल्छीसम्म जोड्ने सेतु छैन](https://www.onlinekhabar.com/2026/09/2008261/the-settlement-beyond-the-trishuli-border-is-deserted-there-is-no-bridge-connecting-the-chinese-border-to-galchhi) — Tue, 01 Sep 2026 04:22:27 +0000
- [रसुवामा सर्वपक्षीय बैठक : वडास्तरबाटै राहत वितरण गर्ने, पूर्वाधार मर्मत र यातायात सञ्चालन गरिने](https://www.onlinekhabar.com/2026/09/2008273/all-party-meeting-in-rasuwa-relief-will-be-distributed-from-ward-level-infrastructure-will-be-repaired-and-transportation-will-be-operated) — Tue, 01 Sep 2026 04:11:18 +0000
- [भोटेकोशी बाढीको क्षति, उद्धार र पुनर्स्थापनाबारे सर्वदलीय बैठक बस्दै](https://www.onlinekhabar.com/2026/09/2008252/all-party-meeting-to-discuss-bhotekoshi-flood-damage-rescue-and-rehabilitation) — Tue, 01 Sep 2026 03:22:44 +0000
- [नेपाल-चीन व्यापारको मुख्य खम्बा रसुवागढी : अर्बौं लगानी बग्दा भविष्य अनिश्चित](https://www.onlinekhabar.com/2026/09/2008121/rasuwagadhi-the-main-pillar-of-nepal-china-trade-future-uncertain-as-billions-of-investment-flow) — Tue, 01 Sep 2026 03:15:55 +0000
- [रसुवा–त्रिशूली बाढी : खर्बौंको क्षतिपछि पुनर्निर्माणको कठिन परीक्षा](https://www.onlinekhabar.com/2026/09/2008223/rasuwa-trishuli-floods-a-difficult-test-of-reconstruction-after-trillions-of-rupees-in-damage) — Tue, 01 Sep 2026 02:49:42 +0000
- [भारतर्फ शव भेटिने क्रम जारी, शवको संख्या १३ पुग्यो, रसुवा बाढीले बगाएको हुन सक्ने आशंका](https://www.onlinekhabar.com/2026/09/2008220/bodies-continue-to-be-found-in-india-number-of-bodies-reaches-13-suspicion-that-rasuwa-may-have-been-swept-away-by-floods) — Tue, 01 Sep 2026 01:40:37 +0000
- [रसुवा बाढी : सोमबार राति ८ बजेसम्म ९७४ शव फेला](https://www.onlinekhabar.com/2026/08/2008204/rasuwa-flood-974-bodies-found-as-of-8-pm-on-monday) — Mon, 31 Aug 2026 16:59:03 +0000
- [जेनजी आन्दोलनमा जस्तै रसुवा बाढीमा पनि बीमा कम्पनीले अग्रिम भुक्तानी देलान् ?](https://www.onlinekhabar.com/2026/08/2007276/will-the-insurance-company-pay-in-advance-for-the-rasuwa-floods-as-it-did-in-the-genji-movement) — Mon, 31 Aug 2026 16:55:29 +0000
- [रसुवागढी सुरुङभित्र कोही नभेटिएको सरकारकाे दाबी, ड्युटी गरिरहेका ३ जना खोइ ?](https://www.onlinekhabar.com/2026/08/2007767/the-government-claims-that-no-one-was-found-inside-the-rasuwagadhi-tunnel-but-where-are-the-3-people-on-duty) — Mon, 31 Aug 2026 16:55:27 +0000

### rising-nepal (en)
- [Nepal demands urgent climate funds after Bhotekoshi flood](https://risingnepaldaily.com/news/85910) — Tue, 01 Sep 2026 11:44:41 +0545
- [Water level in Bhotekoshi and Trishuli rivers below alert mark, but precaution advised](https://risingnepaldaily.com/news/85909) — Tue, 01 Sep 2026 11:17:49 +0545
- [Dhanauji Rural Municipality pledges Rs 2.2 million aid to Bhotekoshi flood survivors](https://risingnepaldaily.com/news/85906) — Tue, 01 Sep 2026 10:28:05 +0545
- [All-party meeting at 2:00pm to discuss Bhotekoshi flood](https://risingnepaldaily.com/news/85904) — Tue, 01 Sep 2026 10:06:54 +0545

### kathmandu-post (en)
- [Nepal flood death toll rises to 987, nearly 4,000 still missing](https://kathmandupost.com/national/2026/09/01/nepal-flood-death-toll-rises-to-987-nearly-4-000-still-missing) — 
- [Nepal seeks urgent climate finance after Bhotekoshi flood](https://kathmandupost.com/national/2026/09/01/nepal-seeks-urgent-climate-finance-after-bhotekoshi-flood) — 
- [Hundreds missing, billions in goods feared lost in Bhotekoshi flood](https://kathmandupost.com/national/2026/09/01/hundreds-missing-billions-in-goods-feared-lost-in-bhotekoshi-flood) — 
- [This is not standard flooding; it is a Himalayan Tsunami: Nepal’s Foreign Minister Shisir Khanal](https://kathmandupost.com/interviews/2026/09/01/this-is-not-standard-flooding-it-is-a-himalayan-tsunami-nepal-s-foreign-minister-shishir-khanal) — 
- [Fourteen minutes before the flood hit, a warning sent 900 students running for safety](https://kathmandupost.com/national/2026/09/01/fourteen-minutes-before-the-flood-hit-a-warning-sent-900-students-running-for-safety) — 
- [Flood rescue enters critical days, anxious families hope missing loved ones are alive](https://kathmandupost.com/national/2026/09/01/flood-rescue-enters-critical-days-anxious-families-hope-missing-loved-ones-are-alive) — 
- [Flood-hit Prithvi Highway pushes traffic onto Hetauda-Kathmandu routes](https://kathmandupost.com/national/2026/09/01/flood-hit-prithvi-highway-pushes-traffic-onto-hetauda-kathmandu-routes) — 
- [In Nepal’s flood zone, the second disaster is psychological](https://kathmandupost.com/national/2026/09/01/in-nepal-s-flood-zone-the-second-disaster-is-psychological) — 
- [Floods-hit local units seek urgent supplies, power and infrastructure repairs](https://kathmandupost.com/national/2026/08/31/floods-hit-local-units-seek-urgent-supplies-power-and-infrastructure-repairs) — 
- [Families seek answers in the final phone signals of relatives missing in floods](https://kathmandupost.com/national/2026/08/31/families-seek-answers-in-the-final-phone-signals-of-relatives-missing-in-floods) — 
- [RSP chair Lamichhane briefs President Paudel on Bhotekoshi flood response](https://kathmandupost.com/national/2026/08/31/rsp-chair-lamichhane-briefs-president-paudel-on-bhotekoshi-flood-response) — 
- [More countries join Nepal flood rescue efforts](https://kathmandupost.com/national/2026/08/31/more-countries-join-nepal-flood-rescue-efforts) — 

### ratopati (ne)
- [बाढीपीडितका लागि मधेस सरकारले आज दोस्रो चरणको राहत पुर्‍याउँदै](https://www.ratopati.com/story/589008/madhesh-government-delivering-second-phase-of-relief-to-flood-victims-today) — Tue, 01 Sep 2026 06:12:56 +0000
- [त्रिशूलीमा ३५ पुल बग्दा गल्छीको पुल कसरी जोगियो ?](https://www.ratopati.com/story/589005/how-was-the-galchhi-bridge-saved-when-35-bridges-were-washed-away-in-trishuli) — Tue, 01 Sep 2026 05:58:48 +0000
- [रसुवा बाढी : आवश्यक सामग्री नहुँदा कोरियन टोली धुन्चे फर्कियो (तस्बिरहरू)](https://www.ratopati.com/story/589003/rasuwa-flood-korean-team-returns-to-dhunche-due-to-lack-of-necessary-materials-photos) — Tue, 01 Sep 2026 05:55:51 +0000
- [रसुवाको जलविद्युत् आयोजनामा कार्यरत भारतीय नागरिक घर फर्किए, तीन जनाको खोजी जारी](https://www.ratopati.com/story/589002/indian-nationals-working-at-rasuwa-hydropower-project-return-home-search-continues-for-three) — Tue, 01 Sep 2026 05:53:58 +0000
- [LIVE UPDATES : विनाशकारी बाढीको सातौँ दिन, कसरी हुँदैछ राहत र उद्धारको काम ?](https://www.ratopati.com/story/588936/live-updates-details-of-the-missing-could-not-be-made-public-the-government-was-only-visible-in-the-sky-in-some-places) — Tue, 01 Sep 2026 05:45:00 +0000
- [मङ्सिरमा एकता महाधिवेशन हुनेमा झलनाथको शङ्का, विनाशकारी भोटेकोशी बाढीले बढायो अन्योल](https://www.ratopati.com/story/588997/jhalanath-doubts-about-holding-unity-convention-in-mangsir-devastating-bhotekoshi-flood-adds-to-confusion) — Tue, 01 Sep 2026 05:40:00 +0000
- [रोजगारीले रसुवा पुर्‍यायो, भोटेकोशीले घर फर्कन दिएन](https://www.ratopati.com/story/588993/employment-took-me-to-rasuwa-but-bhotekoshi-did-not-allow-me-to-return-home) — Tue, 01 Sep 2026 05:15:00 +0000
- [एयर इन्डिया विमान दुर्घटनामा खटिएको भारतीय फरेन्सिक टोली नै बाढीपीडितको पहिचानका लागि नेपालमा](https://www.ratopati.com/story/588988/indian-forensic-team-deployed-in-air-india-crash-arrives-in-nepal-to-identify-flood-victims) — Tue, 01 Sep 2026 04:40:21 +0000
- [रसुवा बाढीका पीडित श्रीनाथ गणबाहिर उद्धारको प्रतीक्षामा (तस्बिरहरू)](https://www.ratopati.com/story/588984/rasuwa-flood-victims-await-rescue-outside-srinath-ganabahir-photos) — Tue, 01 Sep 2026 04:31:02 +0000
- [रसुवाका बाढीपीडितलाई मधेस प्रदेश नेकपाका सांसद र कर्मचारीको १५ दिनको तलब सहयोग](https://www.ratopati.com/story/588983/madhes-province-ncp-mps-and-employees-donate-15-days-salary-to-flood-victims-in-rasuwa) — Tue, 01 Sep 2026 04:30:17 +0000
- [बाढीप्रभावित बालबालिकाको फोटो-भिडियो सामाजिक सञ्जालमा पोस्ट नगर्न अपिल](https://www.ratopati.com/story/588982/appeal-not-to-post-photos-and-videos-of-flood-affected-children-on-social-media) — Tue, 01 Sep 2026 04:13:37 +0000
- [नुवाकोट र रसुवाका साना नदीमा आकस्मिक बाढीको उच्च जोखिम, त्रिशूलीमा सतर्कता अपनाउन आग्रह](https://www.ratopati.com/story/588979/high-risk-of-flash-floods-in-small-rivers-of-nuwakot-and-rasuwa-urges-vigilance-in-trishuli) — Tue, 01 Sep 2026 03:55:11 +0000

### gnews-en (en)
- [NTC provides free telephone, SMS and internet service in flood-hit areas - The Rising Nepal](https://news.google.com/rss/articles/CBMiUEFVX3lxTE56LUplMEYyaVNVNWxIZnR3RVc2a282WGZDcEpQejRhS1o2V0h2S0x5d0FGVVp5REl0Mzd1cmVzNFNCekt2ektsdGktb0xrZ1B3?oc=5) — Tue, 01 Sep 2026 01:17:41 GMT
- [Nepal Telecom restores service at 7 flood-hit sites in Rasuwa, Nuwakot - NepalNews](https://news.google.com/rss/articles/CBMivgFBVV95cUxOZDhMOGJJWnZ4U0laQnN3LWdMRHEwS0YtQnhfVWJWSGE2U0Q5QTA2WndXWlJ1eDRDTEt4cXVqMU82dFA5b2xtUFc1WDJxQ2ZkX2hwY3BfY2UyV0F5eTVxaU9SeDAtcGtaeV90Q09UaFlpSm5lbzd2NldlSklVRFprZWZINndtR2VrakJ5WGdicGdYZ2J1T2J5aF92X19FOU1FdGlOZU9UYU5uaTQ0aFFNTGZtWFlxWHotSVBqd21n?oc=5) — Sun, 30 Aug 2026 12:20:46 GMT
- [Nepal Telecom restores mobile connectivity in flood-hit areas - Communications Today](https://news.google.com/rss/articles/CBMiogFBVV95cUxPUGYyU21ZSktwaUh6UWZqLXFyN1VhejhwdkM5Y2ZNeUN2cmdqZHRFQXlKZl9GUGRMVHRIemVxZGthdVJyVi1RYkJmWHdyaTQ4WF9SaTFOOHI4bkhoOGhMVXg2bmVxSXlnb2ZJNndRY0ZncWZOTFRmZDRtWkhtLTM3XzdWYzdNLTdzbEo1eXdIR1B0NGhqZnJ5TXNVNjhNZU95ZXc?oc=5) — Mon, 31 Aug 2026 10:35:52 GMT
- [Nepal Telecom restores services at Trishuli-3A site - Khabarhub](https://news.google.com/rss/articles/CBMiWEFVX3lxTE9ONG1tMnZkRjZEMmY0ZWRCR0ZOcllGU3Q5UHZyT3d6Qk1nNnZCckJOQ3JCcHJCN0hpd0REMXlXLWowM1U3VjlrZHNrRHMyYm1NX3NfVkdFem4?oc=5) — Sat, 29 Aug 2026 11:18:48 GMT
- [Bhotekoshi flood: 12 teams mobilized for rescue, treatment, relief, and rehabilitation - The Rising Nepal](https://news.google.com/rss/articles/CBMiUEFVX3lxTE12dS1PNDRvMEFYdm9VUmVkanNVVG9OQXRQU0Y0UHdGbzdMN2VhbWN0NkRLN3BISGY2QkVYLWpZUExZUXJKc1c0dDFmLWswVHN6?oc=5) — Tue, 01 Sep 2026 01:11:51 GMT
- [Nepal Telecom Extends Free Communication Services in Flood-Affected Areas - Ratopati](https://news.google.com/rss/articles/CBMiqAFBVV95cUxNYl96d3l1THhGSDd2czZBNkFQSXlGYlJYV1paZVROM2pKdEotdlJqam16WWMwZXFfM3hlWVlMa0dLZ2xaYTFyYWdscVQxcGltVjRNdWhhNXd6VnN2RmRJRDN6cnVnN1hraV80dm9OYldZQlhULTYxYUhHZnh1RUw0YmxUZ0djOWdYOWNPdjZuSXROeVJXY3hqQlFEQ3lRTjNrTnVVZ0x0NTQ?oc=5) — Thu, 27 Aug 2026 09:07:42 GMT
- [87 telecom towers disrupted in Rasuwa, Nuwakot and Dhading after flood - OnlineKhabar English News](https://news.google.com/rss/articles/CBMieEFVX3lxTE5tUTIxNEpwTF9VRmctbjdyS1I0SzBCNjZnMmNiNFhlMHo3T3dUUFVVNUhLenhWTUZIcXNfdkd0NEVid2pHRlE5T1FITVdrWURDYVZ5UGhYdmNBWk01VERpSlJFNTktVHRhYUR4cmtsc01RVTJjTnZ3cQ?oc=5) — Thu, 27 Aug 2026 11:02:50 GMT
- [Nepal Telecom restores services at 80 of 120 flood-affected sites - NepalNews](https://news.google.com/rss/articles/CBMiuAFBVV95cUxQbVBaY1lnQUFYcThETFBudVh1Q3piVjBnQm84c2FiSzd6UGoxYWx3M0lob2ZmN2N3ZVFyaFF0SzBuQWM4R2ZqYTY1dUZjTWQtb241U1Rld29mdEM3YTdzZGJOMGJCN29UYWpETUh4Wk1BVG1DNTJ4cmw3MzloaVlPRnJYeU1OalI5Y0hDM1pXQndibVFjd2RNUU9fMGxKTnNpcW9iSWVvbjltRWlIRS1BTWgzYTVWNVZT?oc=5) — Fri, 28 Aug 2026 11:59:27 GMT
- [Nepal Telecom (NTC) Restores Mobile Network in Flood-Affected Rasuwa, Nuwakot, and Dhading - Hamro Patro](https://news.google.com/rss/articles/CBMiwgFBVV95cUxPMUk2ZWFaRDVuZkNmaE9fcW5ucU1QRm9SV01zLV92RWhhazVxZVZDUjlVRmVLUUt5c3lBWjhHOERZMUd1b2ZORjVucktLN3pTUXVJSFJOZUpDcW5uRS1KTWl1dk1uZjVZS2hjWGFEcEpvRGpwV2VYSzBGLVZNRzBURlNKN01jeW5zTnA5LTZ4aG0wOU5MRVIxRWRjbXk5M3Z2bHhYaGRXTkZtTUVUdEo5UEFvTXU4ZVlVbjVwSGZ4OXJWdw?oc=5) — Fri, 28 Aug 2026 13:28:04 GMT
- [NT works to restore services in flood-hit areas - The Rising Nepal](https://news.google.com/rss/articles/CBMiUEFVX3lxTE4yRWswam81cUpzM0lPSVR6dGRoZHRsZmFRQ3dDRzVpOUxxVFROX1R6UElES1VsV3NDSF9kd2N3eHM0RnZzdWE1Z1VBNVdibDlz?oc=5) — Mon, 31 Aug 2026 11:57:47 GMT
- [Nepal Telecom Services Disrupted by Flood Damage in Rasuwa and Nuwakot - Ratopati](https://news.google.com/rss/articles/CBMiwAFBVV95cUxQaS0zX3pVb25uRXFCTzZ0YTA3NTk3UkNzZHB6UnAyMVdob01hUElsMzVvc2llbzlsOG9OTzM5Z2VFTk42bzlFTzkyWTVhWHVDOW12bUJ2WTdLOGFKUjgwRWRNbm45eDJtMmFQY19aT3V6N2xYcmJFSERWTFZMbW15LTUzdDNGU0toYkNrb2hIVWdwRGhlR2tLZWxtMEs4aEozcVBNTG90MHBnS19Fd0gydjE3aHVfVG5HVXE5Y1FPNXQ?oc=5) — Wed, 26 Aug 2026 06:27:42 GMT
- [Nepal News Evening Briefing | Sunday, August 30, 2026 - NepalNews](https://news.google.com/rss/articles/CBMilwFBVV95cUxOYlM3YXY3Y1luSkxsR1pUd3BoMU85ZWRodkRNekFtemdWd3NZbWRsclZ4T0ZEcXA4bWd0OUg4cWZjUnFqUzlwRlpyU00tRVYtN3B6SFB6NFRtSTh0VktZdzhsWG14RU1WaE1INzFwYUh3cnc1Ml90aWtKdUFWWWNtd3libkQ1c21YRV9naVotWlJTdFhFWmVB?oc=5) — Sun, 30 Aug 2026 15:04:09 GMT

## Open field reports
None open.

## How to apply
1. Confirm a headline against the original article.
2. Add/reuse `src/data/sources.json`.
3. Edit `snapshot.json` / `corridor.json` / `sites.json` with `as_of`.
4. Optional paired bulletin under `src/content/bulletins/{en,ne}/`.
5. `git add src && git commit && git push`.

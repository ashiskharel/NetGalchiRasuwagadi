---
title: RIS still sees China Telecom Global (AS23764) on NTC paths
date: 2026-08-28
lang: en
pair: 2026-08-28-bgp-china-still-seen
sources:
  - name: RIPEstat looking glass
    url: https://stat.ripe.net/widget/looking-glass#w.resource=202.70.64.0/19
  - name: Hurricane Electric AS23752
    url: https://bgp.he.net/AS23752
---

On 28 August, RIPE RIS still listed **CTGNet AS23764 as an upstream neighbour of NTC AS23752**, and looking-glass dumps for `202.70.64.0/19` still showed AS paths of the form `… 23764 23752` as well as the usual India transits (`9498` Airtel, `6453` / `4755` Tata). NTC prepends its own ASN several times on many China-side paths.

That is **not** a claim that the Galchhi–Rasuwagadhi fiber is repaired. RIS can see a BGP session while the domestic fiber to the border is cut. Absence of China paths in RIS would also not, by itself, prove the Kerung link is down. Use this board’s Status chips for the fiber/microwave facts, and the Routing page for live paths.

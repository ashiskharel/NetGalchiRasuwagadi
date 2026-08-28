# Restoration draft — 2026-08-28T15:59 NPT

Machine fetch only. **Do not copy into `snapshot.json` without a named public source.**

## Suggested human actions
- Northern CTGNet (AS23764) is **visible in RIS**. Keep the northern-transit chip as degraded/unknown until a named NTC source says the Galchhi–Rasuwagadhi fiber is repaired. Do **not** mark fiber `up` from BGP.
- Southern India transits (Airtel/Tata) still appear. National internet is likely still on those paths.
- Fiber, microwave, district site counts, Starlink: **no machine source**. Only update from a named NTC/news quote in `sources.json`.

## RIPEstat (AS23752)
- Prefix: `202.70.64.0/19`
- Upstreams (left): AS23764, AS4755, AS6453, AS9498
- Customers (right): AS131341, AS139022, AS142008, AS14789, AS45353, AS58456
- Path observations: north 134 · south 232 · other 0
- Latest path confirm: 2026-08-28T10:14:07.870000 UTC

Distinct AS paths (prepending stripped, top 16):

- `AS8218 → AS23764 → AS23752` ×7 (north)
- `AS23764 → AS23752` ×7 (north)
- `AS24482 → AS9498 → AS23752` ×6 (south)
- `AS6461 → AS9498 → AS23752` ×5 (south)
- `AS24482 → AS23764 → AS23752` ×5 (north)
- `AS9002 → AS6453 → AS23752` ×4 (south)
- `AS3214 → AS9498 → AS23752` ×4 (south)
- `AS14840 → AS9498 → AS23752` ×4 (south)
- `AS199524 → AS9498 → AS23752` ×4 (south)
- `AS47147 → AS3320 → AS6453 → AS23752` ×4 (south)
- `AS2914 → AS23764 → AS23752` ×3 (north)
- `AS3491 → AS9498 → AS23752` ×3 (south)
- `AS12779 → AS23764 → AS23752` ×3 (north)
- `AS48185 → AS9498 → AS23752` ×3 (south)
- `AS199524 → AS23764 → AS23752` ×3 (north)
- `AS35280 → AS6453 → AS23752` ×3 (south)

## News headlines (Google News RSS)

### gnews-en (en)
- [Nepal Telecom Services Disrupted by Flood Damage in Rasuwa and Nuwakot - Ratopati](https://news.google.com/rss/articles/CBMiwAFBVV95cUxQaS0zX3pVb25uRXFCTzZ0YTA3NTk3UkNzZHB6UnAyMVdob01hUElsMzVvc2llbzlsOG9OTzM5Z2VFTk42bzlFTzkyWTVhWHVDOW12bUJ2WTdLOGFKUjgwRWRNbm45eDJtMmFQY19aT3V6N2xYcmJFSERWTFZMbW15LTUzdDNGU0toYkNrb2hIVWdwRGhlR2tLZWxtMEs4aEozcVBNTG90MHBnS19Fd0gydjE3aHVfVG5HVXE5Y1FPNXQ?oc=5) — Wed, 26 Aug 2026 06:27:42 GMT
- [Nepal Telecom Offers Free Services to Flood-Affected Areas - Ratopati](https://news.google.com/rss/articles/CBMirwFBVV95cUxPLTBwQ2E5WlZDQTFqd3BHSkJtZnAzY2FnSGNVa1JKWUJ3Yklzc3lRb21BVnZGUkZ3RmV1MVRfVzJCTURoNDJEaG9IZWxkOTFrWjluQmFsYndBeHIwbDNZUmQtWkNLZ0JFSmJyRkk1eDVnc1kzb1hyTTZ0RmM1YUwwS3JDdVpHc1o0dEZoLUNWcWk4aEswcU45ZDFaOHBkRWExSlBxLVdTeGc1Sl8ySGtj?oc=5) — Wed, 26 Aug 2026 07:07:42 GMT
- [Nepal Telecom Services Disrupted by Flood Damage in Rasuwa and Nuwakot - Hamro Patro](https://news.google.com/rss/articles/CBMivgFBVV95cUxOMmtEUHk3amQ3MGFrZ2ZhdXlEbDRjbXl6MUxKb3hvVUpyTmIzTWNMRnFwTnJGR0I0d2VGX2d5TVBqTnlBSVVmUExlYUtEb1pVeTZmc1JpZ1ZaRXVyLThEcTM1T2h3eXR3cHI4dFFuSGh6SUJkSWZldzl5bVBQZjNOaXU4b3Izd0JXTFNxNkFHWkt0UHR2TlJtankxNEtOZV8tZnVQZWg5VGcteWVxTFZmLXR3VTlRSE5senNLbm9n?oc=5) — Wed, 26 Aug 2026 06:12:13 GMT
- [Nepal Telecom expands satellite services to four new remote locations - Deshsanchar](https://news.google.com/rss/articles/CBMipAFBVV95cUxPQnNZY1lCNk9wc0dDYkt6YVlacUJsczdTZ3dKazVLMjNsVFhHUzNXODVYZkJFamM5TkdWV0wyaFBqMGpEZUdvY3poVjY2V0RhZlI1U0xvT0h2VTFXY2pCWEVtdktIcVh4cFREcXFLM0FlS05SX3dzZkVMTXAzOTZkMVp0VkQwYzFxU0hTd0JTTlN1WmhsRWIwOUJqa2djeUthV3B6cg?oc=5) — Thu, 30 Apr 2026 07:00:00 GMT
- [Connected but Not Equal: Nepal’s Internet Boom Still Leaves Millions Behind - NepalNews](https://news.google.com/rss/articles/CBMiwwFBVV95cUxQSktkRmhSWkxMbGxNMWhGdFNYV3ZaNWQ0R29YYUNwNng3MzZ3dHFVQk05OE5LdDltdURDaWZYNFVLSnBkSk9iY0lPR2V6bWw2ZGo1MUZPendFc255Nnh6bHkzdGs2S0tudFpOVDRmdGlQT1NqNzBqb0M3TUlxS2N1dUVqR3E3Ni1yNGFic3Z1cTJneV93c1dqU3AwM2xmWFpDUTVESVNVUFdIUVlBSTJLZzN5cUIyNFdtYnNoOWxFYzFibTA?oc=5) — Tue, 16 Jun 2026 07:00:00 GMT
- [Nepal opens internet link to China after years of depending on India - South China Morning Post](https://news.google.com/rss/articles/CBMivgFBVV95cUxON0p4bGpIWlk0N0F1eTctZXIxTlJfa2UySC1CTnpuUDJXd2xHVDNkaVR4RW1nanF2V212eE9sUDNmdW9yT0gxanFEbkh5cXFlZ1R2UHVVek54cEF1cjJrbzlzQzNoaVB0NUIzYU1JbnFGNjRMd2xFN2ZSaTRrbEJXZ3FCZzJibGtzZWloV2pWdUVYU1VLeVdnRjhwaWQtT2JMc2ZQckFFMzQ2Ykd4MkpyRDdCdV9aVXZfSlZhUjlB0gG-AUFVX3lxTFBKUTZsRVBNYU9takJXcEhaM1BHczhPaUliTy03VnNnelJRTVo2dnMwWHItSjZVU2tzZFc5ZzJURG5EblZ6MFludU1lZ3lmSkR1LTdESGg3bEVXbHFZQzdUUDVkaW9OWkhzUFk3eXo3Wm5wbWIybnpkdEZRSXVnMzBpZ2NpX1dLSkEwcXN0THFCUDF4dXZUTUlYQzdtVHUwSDdFY3dqNTZWTU9hZExFQ2JNOHFQbFNrM3ZfY2dTUHc?oc=5) — Fri, 12 Jan 2018 08:00:00 GMT
- [Nepal Telecom, China Telecom Global sign deal for Internet bandwidth - MediaNama](https://news.google.com/rss/articles/CBMicEFVX3lxTFBDQkVzbVBSa3BfQjloLUoyTWl1REN5dU1jZzYwWk85NjUxMFo3ekRFY1h1emM4NUJTOGdZVk9XNzhlOFNkazFuUE5kNWpyUENiY29VYThndUlzbTNjaHVTRUszOVJ1YldOZnZtNlZzWGo?oc=5) — Fri, 09 Dec 2016 08:00:00 GMT
- [Nepal ends India’s internet monopoly with Chinese link - The Kathmandu Post](https://news.google.com/rss/articles/CBMinAFBVV95cUxQbEFMY0VqSU1nM3JuT1BtODFkZjk2SkFxemxoSUcxZ1djOExraF94X19Xb1FHb0g0MW5zU2lzMVl2ZWFzNko3ZHZNeGVKUGlGSU53MnZzM2QxUEV6UFF1UXc0dXE5al9vZkxpakc4T3hHdU9SQzdmcFRzOVBGZjJ3bU90R0VmRE5XS2FCem56dWR1amx3RWtZSjJhTmw?oc=5) — Sat, 13 Jan 2018 08:00:00 GMT
- [NTC, Ncell provide free service - The Rising Nepal](https://news.google.com/rss/articles/CBMiUEFVX3lxTE9UNFMwSTBxb3FjM3RfX21HMXVBbjRVWmxCNnpYaXpPaDNLVWVKaWJoTEZKbm9KOFZSTFFHTl9fREhCbS01c3hfX3prTElpcjBx?oc=5) — Thu, 27 Aug 2026 02:13:23 GMT
- [Economic Digest: Nepal’s Business News in a Snap - Khabarhub](https://news.google.com/rss/articles/CBMiWEFVX3lxTFB0c1NvTXdIY3c4YnA1bGFpbldjeER6TnRNTUliMkZTS21HUFZ6RUdzRFVrWVlLa04yRnhvdXFiVFV6UGR6UXRadUduaGhCQjhvYjlmTU9SLTU?oc=5) — Fri, 11 Jul 2025 07:00:00 GMT
- [China breaks India’s internet monopoly in Nepal - The Hindu](https://news.google.com/rss/articles/CBMirwFBVV95cUxNVFNRU1BWZ2pCVElTQXFKQkRCd0Z5WTNjV2JkQWdWSmhPSFFNQUF2SW80SmtzV0p2azVpS05tUDViZF9XOFJsZFA3Tnl3MWtveGNra3FCaUozRjhWeFFHTm9tUENxSFoxYmctcE5kRktSc3dpLXJpUjgyUXRZaUFkT0xGUmZaeHhWSXB5TEtubC00MVJnZkx6TjNDRGlhaTRONVF3RUJSbXQ1bm04ZmxZ0gG2AUFVX3lxTE13OUJMbGJOY004NmhKTlJEWDdiU25yRlhuLXg3VjRtU29ibFFPbnQ2YUZaSWtKYUM2RFVYbE5IVEVfYlByQk5sSW1BSmt6akxYaTBYWndWeU9VNk5qeEc0RzEzcEx2UVpPY2NnOFNidnJ5cjVhMi1XcngyMDhzb0NLY2V0eV8xNjdVZTZUUzlNM1hHUnVaNDFQcHhneVVYUmIyMVFuWFRDVkdXWGRLOUJIREJzR0dB?oc=5) — Fri, 12 Jan 2018 08:00:00 GMT
- [Optical fiber backbone project: fiber laid around 1,600 kilometers across country - NepalNews](https://news.google.com/rss/articles/CBMiuwFBVV95cUxPazFhNlJnTlNWNS1oYUx3SFRhZGpCQ3JhRXd5MVpjTGVOeTYyLV9KYjh6cTk0QVFTUHdBd0Iya0hFaTBpNmNqWTBYajJLOWRmQUFtZXpxYWJBNU5YcUQ3VUF3SGlRN3llSk1FVGtLYzBhQmY4SS1NZUdSZTVGbmVwU2hsWm9PdWdjY3RzdGF1QVJSSmJTcWE2SEFhVzhSR0lRYmJlMll2UlVKSk5FZTFPRG14d2RzSHlsbjEw?oc=5) — Tue, 03 Aug 2021 07:00:00 GMT

### gnews-ne (ne)
No items.

## Open field reports
None open.

## How to apply
1. Confirm a headline against the original article.
2. Add/reuse `src/data/sources.json`.
3. Edit `snapshot.json` / `corridor.json` / `sites.json` with `as_of`.
4. Optional paired bulletin under `src/content/bulletins/{en,ne}/`.
5. `git add src && git commit && git push`.

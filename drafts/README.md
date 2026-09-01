# Restoration drafts

Machine-written snapshots of **RIPEstat** and **Google News RSS**. They are not published as status chips.

- `latest.md` / `latest.json` — last fetch
- `YYYY-MM-DD.md` / `.json` — that day’s copy (Nepal date)

Google News search RSS often returns **HTTP 503 from GitHub-hosted runners** (shared datacenter IPs). The same URL can work in your browser. That is not a broken link and does not need a scraping proxy. The fetcher prefers **publisher RSS** (OnlineKhabar, Rising Nepal, Kathmandu Post, Ratopati) and retries RIPEstat.

## Run locally

```bash
npm run draft
git add drafts
git commit -m "draft: RIS and news snapshot"
git push
```

Or run **Actions → Daily restoration draft → Run workflow**. The schedule fires around 07:00 NPT.

## Status chips stay human

Auto-writing `snapshot.json` would require a source NTC does not publish (per-site / per-segment JSON). BGP cannot tell Galchhi fiber from a Rasuwagadhi BGP session. News RSS is headlines, not structured outage data. The honest pipeline is: draft → you confirm a named article → edit chips → push.

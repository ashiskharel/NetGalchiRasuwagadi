/**
 * Fetch RIPEstat + public news RSS into drafts/. Does not write status chips.
 *
 *   npm run draft
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCEAPP = "netgalchi-rasuwagadhi";
const ORIGIN = 23752;
const PREFIX = "202.70.64.0/19";
const NORTH = [23764, 4134, 4809];
const SOUTH = [9498, 6453, 4755];
const REPO = "ashiskharel/NetGalchiRasuwagadi";

const BROWSER_UA =
  "Mozilla/5.0 (compatible; NetGalchiDraft/1.1; +https://github.com/ashiskharel/NetGalchiRasuwagadi)";

// Publisher RSS first. Google News search RSS is often HTTP 503 from GitHub-hosted
// runner IPs even when the same URL works in a browser (datacenter block, not a dead feed).
const NEWS_FEEDS = [
  { id: "onlinekhabar-en", lang: "en", url: "https://english.onlinekhabar.com/feed", filter: true },
  { id: "onlinekhabar-ne", lang: "ne", url: "https://www.onlinekhabar.com/feed", filter: true },
  { id: "rising-nepal", lang: "en", url: "https://risingnepaldaily.com/rss", filter: true },
  { id: "kathmandu-post", lang: "en", url: "https://kathmandupost.com/rss", filter: true },
  { id: "ratopati", lang: "ne", url: "https://www.ratopati.com/feed", filter: true },
  {
    id: "gnews-en",
    lang: "en",
    optional: true,
    url: "https://news.google.com/rss/search?q=Nepal+Telecom+Rasuwa+OR+Rasuwagadhi+OR+Galchhi+OR+Bhotekoshi&hl=en-US&gl=US&ceid=US:en",
  },
];

const TOPIC =
  /rasuwa|rasuwagadhi|galchh|bhotekoshi|bhote kosi|telecom|ntc|ncell|fiber|fibre|microwave|flood|बाढी|टेलिकम|रसुवा|रसुवागढी|गल्छी|फाइबर|माइक्रोवेभ/i;

const COMMS =
  /telecom|ntc\b|ncell|fiber|fibre|microwave|tower|bts|internet|network|routing|optical|outage|restore|connectivity|communication|starlink|satellite|bgp|bandwidth|doorsanchar|टेलिकम|फाइबर|माइक्रोवेभ|टावर|इन्टरनेट|सञ्जाल|संचार|पुनर्स्थापना|नेटवर्क/i;

const FEED_LABEL = {
  "onlinekhabar-en": "OnlineKhabar",
  "onlinekhabar-ne": "OnlineKhabar",
  "rising-nepal": "The Rising Nepal",
  "kathmandu-post": "The Kathmandu Post",
  ratopati: "Ratopati",
  "gnews-en": "Google News",
};

function nptStamp(d = new Date()) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kathmandu",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(d)
    .replace(", ", "T")
    .replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1");
}

function nptDate(d = new Date()) {
  return nptStamp(d).slice(0, 10);
}

function errDetail(e) {
  const cause = e?.cause ? ` (${e.cause.code || e.cause.message || e.cause})` : "";
  return `${e.message || e}${cause}`;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchOnce(url, ms, accept) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: {
        "User-Agent": BROWSER_UA,
        Accept: accept,
        "Accept-Language": "en-US,en;q=0.8,ne;q=0.5",
      },
    });
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return res;
  } finally {
    clearTimeout(t);
  }
}

async function withRetry(fn, tries = 3) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      return await fn();
    } catch (e) {
      last = e;
      const status = Number(String(e.message || "").slice(0, 3));
      if (status === 404 || status === 401 || status === 403) throw e;
      if (i < tries - 1) await sleep(1500 * (i + 1));
    }
  }
  throw last;
}

async function getJson(url, ms) {
  const res = await withRetry(() => fetchOnce(url, ms, "application/json"));
  return await res.json();
}

async function getText(url, ms) {
  const res = await withRetry(() =>
    fetchOnce(url, ms, "application/rss+xml, application/atom+xml, application/xml, text/xml, */*"),
  );
  return await res.text();
}

function decodeXml(s) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function parseRss(xml, filter) {
  const items = [];
  const blocks = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi), ...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)];
  for (const block of blocks) {
    const chunk = block[1];
    const title = decodeXml((chunk.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "").trim();
    const linkHref = (chunk.match(/<link[^>]*href="([^"]+)"/i) || [])[1];
    const link = decodeXml(linkHref || (chunk.match(/<link>([\s\S]*?)<\/link>/i) || [])[1] || "").trim();
    const pub = decodeXml(
      (chunk.match(/<pubDate>([\s\S]*?)<\/pubDate>/i) || chunk.match(/<updated>([\s\S]*?)<\/updated>/i) || [])[1] ||
        "",
    ).trim();
    if (!title) continue;
    if (filter && !TOPIC.test(`${title} ${link}`)) continue;
    items.push({ title, link, pubDate: pub });
  }
  return items.slice(0, 12);
}

function uniqueHops(path) {
  const hops = path.split(/\s+/).map(Number).filter(Boolean);
  const out = [];
  for (const h of hops) {
    if (out[out.length - 1] !== h) out.push(h);
  }
  return out;
}

function classify(hops) {
  const core = hops.filter((h) => h !== ORIGIN);
  const hasNorth = core.some((h) => NORTH.includes(h));
  const hasSouth = core.some((h) => SOUTH.includes(h));
  if (hasNorth && !hasSouth) return "north";
  if (hasSouth && !hasNorth) return "south";
  return "other";
}

async function fetchRis() {
  const out = {
    ok: false,
    error: null,
    neighbours: { left: [], right: [] },
    paths: { north: 0, south: 0, other: 0, unique: [] },
    prefix: PREFIX,
    latestPathTime: null,
  };
  try {
    const neigh = await getJson(
      `https://stat.ripe.net/data/asn-neighbours/data.json?resource=AS${ORIGIN}&sourceapp=${SOURCEAPP}`,
      15000,
    );
    const list = neigh?.data?.neighbours ?? [];
    out.neighbours.left = list.filter((n) => n.type === "left").map((n) => n.asn);
    out.neighbours.right = list.filter((n) => n.type === "right").map((n) => n.asn);
  } catch (e) {
    out.error = `neighbours: ${errDetail(e)}`;
    return out;
  }
  try {
    const lg = await getJson(
      `https://stat.ripe.net/data/looking-glass/data.json?resource=${encodeURIComponent(PREFIX)}&sourceapp=${SOURCEAPP}`,
      28000,
    );
    const peers = (lg?.data?.rrcs ?? []).flatMap((r) => r.peers ?? []);
    const seen = new Map();
    let latest = "";
    for (const p of peers) {
      if (!p.as_path) continue;
      const hops = uniqueHops(p.as_path);
      const key = hops.join("-");
      const klass = classify(hops);
      const prev = seen.get(key);
      if (prev) prev.n += 1;
      else seen.set(key, { hops, n: 1, klass });
      const t = p.latest_time || p.last_updated || "";
      if (t > latest) latest = t;
    }
    for (const v of seen.values()) {
      out.paths[v.klass] += v.n;
      out.paths.unique.push(v);
    }
    out.paths.unique.sort((a, b) => b.n - a.n);
    out.paths.unique = out.paths.unique.slice(0, 16);
    out.latestPathTime = latest || null;
    out.ok = true;
  } catch (e) {
    out.error = (out.error ? `${out.error}; ` : "") + `looking-glass: ${errDetail(e)}`;
    out.ok = out.neighbours.left.length > 0;
  }
  return out;
}

async function fetchNews() {
  const feeds = [];
  for (const feed of NEWS_FEEDS) {
    try {
      const xml = await getText(feed.url, 20000);
      feeds.push({ ...feed, ok: true, items: parseRss(xml, feed.filter) });
    } catch (e) {
      feeds.push({ ...feed, ok: false, error: errDetail(e), items: [] });
    }
  }
  return feeds;
}

async function fetchIssues() {
  try {
    const url = `https://api.github.com/repos/${REPO}/issues?labels=field-report&state=open&per_page=20`;
    const data = await getJson(url, 12000);
    return (Array.isArray(data) ? data : []).map((i) => ({
      number: i.number,
      title: i.title,
      html_url: i.html_url,
      updated_at: i.updated_at,
    }));
  } catch (e) {
    return { error: String(e.message || e) };
  }
}

function suggestions(ris) {
  const lines = [];
  const left = new Set(ris.neighbours.left);
  if (left.has(23764) || ris.paths.north > 0) {
    lines.push(
      "Northern CTGNet (AS23764) is **visible in RIS**. Keep the northern-transit chip as degraded/unknown until a named NTC source says the Galchhi–Rasuwagadhi fiber is repaired. Do **not** mark fiber `up` from BGP.",
    );
  } else if (ris.ok) {
    lines.push(
      "CTGNet (AS23764) is **not** in this RIS dump. You may set the northern-transit *note* to “not observed in RIS”. Do **not** set the chip to `down` from that alone — RIS under-sees China-side paths.",
    );
  } else {
    lines.push("RIS fetch failed. Leave routing chips as they are.");
  }
  if (ris.paths.south > 0) {
    lines.push("Southern India transits (Airtel/Tata) still appear. National internet is likely still on those paths.");
  }
  lines.push(
    "Fiber, microwave, district site counts, Starlink: **no machine source**. Only update from a named NTC/news quote in `sources.json`.",
  );
  return lines;
}

function toMarkdown(payload) {
  const { fetched_npt, ris, news, issues } = payload;
  const lines = [];
  lines.push(`# Restoration draft — ${fetched_npt} NPT`);
  lines.push("");
  lines.push("Machine fetch only. **Do not copy into `snapshot.json` without a named public source.**");
  lines.push("");
  lines.push("## Suggested human actions");
  for (const s of suggestions(ris)) lines.push(`- ${s}`);
  lines.push("");
  lines.push("## RIPEstat (AS23752)");
  if (ris.error) lines.push(`- Error: ${ris.error}`);
  lines.push(`- Prefix: \`${ris.prefix}\``);
  lines.push(`- Upstreams (left): ${ris.neighbours.left.map((a) => `AS${a}`).join(", ") || "—"}`);
  lines.push(`- Customers (right): ${ris.neighbours.right.map((a) => `AS${a}`).join(", ") || "—"}`);
  lines.push(
    `- Path observations: north ${ris.paths.north} · south ${ris.paths.south} · other ${ris.paths.other}`,
  );
  if (ris.latestPathTime) lines.push(`- Latest path confirm: ${ris.latestPathTime} UTC`);
  lines.push("");
  lines.push("Distinct AS paths (prepending stripped, top 16):");
  lines.push("");
  for (const p of ris.paths.unique) {
    lines.push(`- \`${p.hops.map((h) => `AS${h}`).join(" → ")}\` ×${p.n} (${p.klass})`);
  }
  if (!ris.paths.unique.length) lines.push("- (none)");
  lines.push("");
  lines.push("## News headlines (publisher RSS; Google News is optional and often blocked from Actions)");
  for (const feed of news) {
    lines.push("");
    lines.push(`### ${feed.id} (${feed.lang})`);
    if (!feed.ok) {
      lines.push(`Fetch failed: ${feed.error}`);
      continue;
    }
    if (!feed.items.length) {
      lines.push("No items.");
      continue;
    }
    for (const it of feed.items) {
      const href = it.link || "";
      lines.push(`- [${it.title.replace(/]/g, "\\]")}](${href}) — ${it.pubDate}`);
    }
  }
  lines.push("");
  lines.push("## Open field reports");
  if (issues?.error) lines.push(`GitHub API: ${issues.error}`);
  else if (!issues?.length) lines.push("None open.");
  else {
    for (const i of issues) {
      lines.push(`- [#${i.number} ${i.title}](${i.html_url}) (${i.updated_at})`);
    }
  }
  lines.push("");
  lines.push("## How to apply");
  lines.push("1. Confirm a headline against the original article.");
  lines.push("2. Add/reuse `src/data/sources.json`.");
  lines.push("3. Edit `snapshot.json` / `corridor.json` / `sites.json` with `as_of`.");
  lines.push("4. Optional paired bulletin under `src/content/bulletins/{en,ne}/`.");
  lines.push("5. `git add src && git commit && git push`.");
  lines.push("");
  return lines.join("\n");
}

async function fetchSentinel1() {
  const wkt = "POLYGON((84.98 27.78,85.65 27.78,85.65 28.45,84.98 28.45,84.98 27.78))";
  const url = `https://api.daac.asf.alaska.edu/services/search/param?platform=SENTINEL-1&processingLevel=GRD_HD&beamMode=IW&intersectsWith=${encodeURIComponent(wkt)}&start=2026-08-25T00:00:00Z&maxResults=80&output=geojson`;
  const stills = [];
  const seen = new Set();
  try {
    const data = await getJson(url, 25000);
    for (const f of data.features || []) {
      const p = f.properties || {};
      const start = String(p.startTime || "");
      const date = start.slice(0, 10);
      if (!date || seen.has(date)) continue;
      const browse = Array.isArray(p.browse) ? p.browse[0] : p.browse;
      if (!browse) continue;
      const ring = f.geometry?.coordinates?.[0] || [];
      const lons = ring.map((c) => c[0]);
      const lats = ring.map((c) => c[1]);
      if (!lons.length) continue;
      seen.add(date);
      stills.push({
        date,
        startTime: start,
        platform: p.platform || "Sentinel-1",
        direction: p.flightDirection || "",
        browse,
        south: Math.min(...lats),
        west: Math.min(...lons),
        north: Math.max(...lats),
        east: Math.max(...lons),
        scene: p.sceneName || "",
      });
    }
  } catch {
    /* optional */
  }
  stills.sort((a, b) => a.date.localeCompare(b.date));
  return stills;
}

async function fetchTles() {
  const craft = JSON.parse(await readFile(join(ROOT, "src/data/spacecraft.json"), "utf8"));
  const out = [];
  for (const sat of craft.satellites) {
    try {
      const rows = await getJson(`https://db.satnogs.org/api/tle/?norad_cat_id=${sat.norad}`, 15000);
      const row = Array.isArray(rows) ? rows[0] : rows;
      if (!row?.tle1 || !row?.tle2) continue;
      out.push({
        OBJECT_NAME: String(row.tle0 || sat.name).replace(/^0 /, ""),
        TLE_LINE1: row.tle1,
        TLE_LINE2: row.tle2,
      });
    } catch {
      /* optional */
    }
  }
  return out;
}

function yamlStr(s) {
  return `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ")}"`;
}

function isHttpUrl(s) {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function commsItems(news) {
  const seen = new Set();
  const items = [];
  for (const feed of news) {
    for (const it of feed.items || []) {
      const title = (it.title || "").trim();
      const link = (it.link || "").trim();
      if (!title || !isHttpUrl(link)) continue;
      if (!COMMS.test(`${title} ${link}`)) continue;
      const key = title.toLowerCase().replace(/\s+/g, " ");
      if (seen.has(key) || seen.has(link)) continue;
      seen.add(key);
      seen.add(link);
      items.push({
        title,
        link,
        pubDate: it.pubDate || "",
        lang: feed.lang,
        source: FEED_LABEL[feed.id] || feed.id,
      });
    }
  }
  return items.slice(0, 12);
}

function writeDigestMarkdown({ day, lang, items, ris }) {
  const pair = `${day}-digest`;
  const left = ris.neighbours?.left || [];
  const north = left.includes(23764) || (ris.paths?.north || 0) > 0;
  const south = (ris.paths?.south || 0) > 0;
  const sources = items.map((it) => `  - name: ${yamlStr(it.source)}\n    url: ${yamlStr(it.link)}`).join("\n");
  const risLineEn = ris.ok
    ? north
      ? `RIPEstat still lists **CTGNet AS23764** as an NTC upstream (${ris.paths.north} China-side path observations, ${ris.paths.south} India-side). That is not a fiber repair.`
      : south
        ? `RIPEstat shows NTC prefixes mainly **via India** (${ris.paths.south} observations). CTGNet was not in this dump — that does not prove the Kerung session is down.`
        : "RIPEstat returned neighbours but no classified paths in this dump."
    : "RIPEstat fetch failed this run; see the Routing page.";
  const risLineNe = ris.ok
    ? north
      ? `RIPEstat ले **CTGNet AS23764** लाई नेपाल टेलिकमको अपस्ट्रिम देखाइरहेको छ (चीनतर्फ ${ris.paths.north}, भारततर्फ ${ris.paths.south} अवलोकन)। यो फाइबर मर्मत होइन।`
      : south
        ? `RIPEstat मा नेपाल टेलिकम प्रिफिक्स मुख्यतः **भारत हुँदै** देखिए (${ris.paths.south} अवलोकन)। CTGNet यो डम्पमा छैन — केरुङ सेसन डाउन भएको प्रमाण होइन।`
        : "RIPEstat ले छिमेकी दियो तर वर्गीकृत बाटो आएन।"
    : "यो रनमा RIPEstat आएन; रुटिङ पृष्ठ हेर्नुहोस्।";

  if (lang === "en") {
    const bullets = items.map((it) => `- [${it.title.replace(/]/g, "\\]")}](${it.link}) — ${it.source}`).join("\n");
    return `---
title: ${yamlStr(`Network digest ${day}`)}
date: ${day}
lang: en
pair: ${pair}
generated: true
sources:
${sources || '  - name: "RIPEstat"\n    url: "https://stat.ripe.net/lg"'}
---

Machine digest of public headlines on **telecom, towers, fiber, internet and routing** (plus RIPEstat). Not an NTC statement. Numbers in linked articles are theirs — this page does not invent site counts.

${items.length ? `## Headlines\n\n${bullets}` : "No matching comms headlines in today’s feeds."}

## Routing (observed)

${risLineEn}

Status chips on the home page stay human-edited.
`;
  }
  const bullets = items.map((it) => `- [${it.title.replace(/]/g, "\\]")}](${it.link}) — ${it.source}`).join("\n");
  return `---
title: ${yamlStr(`सञ्जाल सार ${day}`)}
date: ${day}
lang: ne
pair: ${pair}
generated: true
sources:
${sources || '  - name: "RIPEstat"\n    url: "https://stat.ripe.net/lg"'}
---

टेलिकम, टावर, फाइबर, इन्टरनेट र रुटिङका सार्वजनिक शीर्षकको मेसिन सार (RIPEstat सहित)। नेपाल टेलिकमको बयान होइन। लिङ्क गरिएका अंक स्रोतका हुन् — यो पृष्ठले साइट गणना बनाउँदैन।

${items.length ? `## शीर्षक\n\n${bullets}` : "आजका फिडमा मिलेका सञ्चार शीर्षक छैनन्।"}

## रुटिङ (अवलोकन)

${risLineNe}

गृह पृष्ठका अवस्था चिप मानव-सम्पादित रहन्छन्।
`;
}

async function writeDailyBulletin(day, news, ris) {
  const items = commsItems(news);
  if (!items.length && !ris.ok) {
    console.log("No comms headlines and no RIS; skipped bulletin");
    return 0;
  }
  const pair = `${day}-digest`;
  for (const lang of ["en", "ne"]) {
    const dir = join(ROOT, "src/content/bulletins", lang);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, `${pair}.md`), writeDigestMarkdown({ day, lang, items, ris }));
  }
  console.log(`Wrote bulletin pair ${pair} (${items.length} headlines)`);
  return items.length;
}

async function currentChips() {
  try {
    const raw = await readFile(join(ROOT, "src/data/snapshot.json"), "utf8");
    const snap = JSON.parse(raw);
    return (snap.links || []).map((l) => ({ id: l.id, status: l.status, as_of: l.as_of }));
  } catch {
    return [];
  }
}

async function main() {
  const fetched_npt = nptStamp();
  const day = nptDate();
  const [ris, news, issues, chips, tles, s1] = await Promise.all([
    fetchRis(),
    fetchNews(),
    fetchIssues(),
    currentChips(),
    fetchTles(),
    fetchSentinel1(),
  ]);
  const payload = {
    fetched_npt,
    fetched_utc: new Date().toISOString(),
    notice: "Draft only. Never auto-applied to status chips.",
    published_chips: chips,
    ris,
    news,
    issues,
    suggestions: suggestions(ris),
  };
  const dir = join(ROOT, "drafts");
  await mkdir(dir, { recursive: true });
  const json = `${JSON.stringify(payload, null, 2)}\n`;
  const md = toMarkdown(payload);
  await writeFile(join(dir, "latest.json"), json);
  await writeFile(join(dir, "latest.md"), md);
  await writeFile(join(dir, `${day}.md`), md);
  await writeFile(join(dir, `${day}.json`), json);
  const tleDir = join(ROOT, "public/data");
  await mkdir(tleDir, { recursive: true });
  await writeFile(
    join(tleDir, "tles.json"),
    `${JSON.stringify({ fetched_utc: new Date().toISOString(), records: tles }, null, 2)}\n`,
  );
  await writeFile(
    join(tleDir, "sentinel1.json"),
    `${JSON.stringify({ fetched_utc: new Date().toISOString(), stills: s1 }, null, 2)}\n`,
  );
  await writeDailyBulletin(day, news, ris);
  console.log(
    `Wrote drafts/latest.md and drafts/${day}.md (${fetched_npt} NPT); ${tles.length} TLEs; ${s1.length} S1 stills`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

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

const NEWS_FEEDS = [
  {
    id: "gnews-en",
    lang: "en",
    url: "https://news.google.com/rss/search?q=Nepal+Telecom+Rasuwa+OR+Rasuwagadhi+OR+Galchhi+OR+Bhotekoshi+fiber&hl=en-NP&gl=NP&ceid=NP:en",
  },
  {
    id: "gnews-ne",
    lang: "ne",
    url: "https://news.google.com/rss/search?q=%E0%A4%A8%E0%A5%87%E0%A4%AA%E0%A4%BE%E0%A4%B2+%E0%A4%9F%E0%A5%87%E0%A4%B2%E0%A4%BF%E0%A4%95%E0%A4%AE+%E0%A4%B0%E0%A4%B8%E0%A5%81%E0%A4%B5%E0%A4%BE+%E0%A4%B0%E0%A4%B8%E0%A5%81%E0%A4%B5%E0%A4%BE%E0%A4%97%E0%A4%A2%E0%A5%80&hl=ne&gl=NP&ceid=NP:ne",
  },
];

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

async function getJson(url, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "User-Agent": "netgalchi-rasuwagadhi-draft/1.0" },
    });
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

async function getText(url, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "User-Agent": "netgalchi-rasuwagadhi-draft/1.0" },
    });
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
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

function parseRss(xml) {
  const items = [];
  for (const block of xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)) {
    const chunk = block[1];
    const title = decodeXml((chunk.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || "").trim();
    const link = decodeXml((chunk.match(/<link>([\s\S]*?)<\/link>/i) || [])[1] || "").trim();
    const pub = decodeXml((chunk.match(/<pubDate>([\s\S]*?)<\/pubDate>/i) || [])[1] || "").trim();
    if (title) items.push({ title, link, pubDate: pub });
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
    out.error = `neighbours: ${e.message || e}`;
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
    out.error = (out.error ? `${out.error}; ` : "") + `looking-glass: ${e.message || e}`;
    out.ok = out.neighbours.left.length > 0;
  }
  return out;
}

async function fetchNews() {
  const feeds = [];
  for (const feed of NEWS_FEEDS) {
    try {
      const xml = await getText(feed.url, 15000);
      feeds.push({ ...feed, ok: true, items: parseRss(xml) });
    } catch (e) {
      feeds.push({ ...feed, ok: false, error: String(e.message || e), items: [] });
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
  lines.push("## News headlines (Google News RSS)");
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
  const [ris, news, issues, chips] = await Promise.all([
    fetchRis(),
    fetchNews(),
    fetchIssues(),
    currentChips(),
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
  console.log(`Wrote drafts/latest.md and drafts/${day}.md (${fetched_npt} NPT)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

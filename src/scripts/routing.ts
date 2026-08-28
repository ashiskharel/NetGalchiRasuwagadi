type Neighbour = { asn: number; type: string; power?: number; v4_peers?: number; v6_peers?: number };
type PeerRow = { as_path: string; latest_time?: string; last_updated?: string; peer?: string };
type Rrc = { rrc: string; location: string; peers: PeerRow[] };
type Ui = {
  loading: string;
  error: string;
  neighbours: string;
  upstream: string;
  downstream: string;
  pathsTitle: string;
  viaChina: string;
  viaIndia: string;
  viaOther: string;
  peersSeeing: string;
  uniquePaths: string;
  updated: string;
  pathChipNote: string;
};

function parseList(raw: string): number[] {
  return raw.split(",").map((s) => Number(s.trim())).filter(Boolean);
}

function uniqueHops(path: string): number[] {
  const hops = path.split(/\s+/).map(Number).filter(Boolean);
  const out: number[] = [];
  for (const h of hops) {
    if (out[out.length - 1] !== h) out.push(h);
  }
  return out;
}

function classify(hops: number[], origin: number, north: number[], south: number[]): "north" | "south" | "other" {
  const core = hops.filter((h) => h !== origin);
  const hasNorth = core.some((h) => north.includes(h));
  const hasSouth = core.some((h) => south.includes(h));
  if (hasNorth && !hasSouth) return "north";
  if (hasSouth && !hasNorth) return "south";
  return "other";
}

function chipClass(asn: number, origin: number, north: number[], south: number[]): string {
  if (asn === origin) return "origin";
  if (north.includes(asn)) return "north";
  if (south.includes(asn)) return "south";
  return "";
}

function pathHtml(hops: number[], origin: number, north: number[], south: number[]): string {
  return hops
    .map((asn) => `<span class="chip-asn ${chipClass(asn, origin, north, south)}">AS${asn}</span>`)
    .join(" → ");
}

async function getJson(url: string, ms: number): Promise<unknown> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(String(res.status));
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

function el(html: string): HTMLElement {
  const wrap = document.createElement("div");
  wrap.innerHTML = html.trim();
  return wrap.firstElementChild as HTMLElement;
}

async function run() {
  const root = document.getElementById("routing-panel");
  if (!root) return;
  const ui = JSON.parse(root.dataset.ui ?? "{}") as Ui;
  const sourceapp = root.dataset.sourceapp ?? "netgalchi-rasuwagadhi";
  const prefix = root.dataset.prefix ?? "202.70.64.0/19";
  const origin = Number(root.dataset.origin ?? 23752);
  const north = parseList(root.dataset.north ?? "23764,4134,4809");
  const south = parseList(root.dataset.south ?? "9498,6453,4755");
  const statusEl = root.querySelector("[data-role=status]") as HTMLElement | null;
  const neighEl = root.querySelector("[data-role=neighbours]") as HTMLElement;
  const pathsEl = root.querySelector("[data-role=paths]") as HTMLElement;

  const neighUrl = `https://stat.ripe.net/data/asn-neighbours/data.json?resource=AS${origin}&sourceapp=${sourceapp}`;
  const lgUrl = `https://stat.ripe.net/data/looking-glass/data.json?resource=${encodeURIComponent(prefix)}&sourceapp=${sourceapp}`;

  try {
    const neighRaw = (await getJson(neighUrl, 12000)) as {
      data?: { neighbours?: Neighbour[]; latest_time?: string };
    };
    const neighbours = neighRaw.data?.neighbours ?? [];
    const left = neighbours.filter((n) => n.type === "left");
    const right = neighbours.filter((n) => n.type === "right");
    const row = (n: Neighbour) =>
      `<tr><td><code>AS${n.asn}</code></td><td>${n.v4_peers ?? "—"} v4 · ${n.v6_peers ?? "—"} v6</td></tr>`;
    neighEl.replaceChildren(
      el(`<section>
        <h2>${ui.neighbours}</h2>
        <div class="grid chips">
          <article class="card"><h3>${ui.upstream}</h3>
            <div class="table-wrap"><table><tbody>${left.map(row).join("") || "<tr><td>—</td></tr>"}</tbody></table></div>
          </article>
          <article class="card"><h3>${ui.downstream}</h3>
            <div class="table-wrap"><table><tbody>${right.map(row).join("") || "<tr><td>—</td></tr>"}</tbody></table></div>
          </article>
        </div>
      </section>`),
    );
  } catch {
    if (statusEl) statusEl.textContent = ui.error;
  }

  try {
    const lg = (await getJson(lgUrl, 25000)) as { data?: { rrcs?: Rrc[] } };
    const peers = (lg.data?.rrcs ?? []).flatMap((r) => r.peers ?? []);
    const buckets: Record<"north" | "south" | "other", { hops: number[]; n: number }[]> = {
      north: [],
      south: [],
      other: [],
    };
    const seen = new Map<string, { hops: number[]; n: number; klass: "north" | "south" | "other" }>();
    let latest = "";
    for (const p of peers) {
      if (!p.as_path) continue;
      const hops = uniqueHops(p.as_path);
      const key = hops.join("-");
      const klass = classify(hops, origin, north, south);
      const prev = seen.get(key);
      if (prev) prev.n += 1;
      else seen.set(key, { hops, n: 1, klass });
      const t = p.latest_time || p.last_updated || "";
      if (t > latest) latest = t;
    }
    for (const v of seen.values()) buckets[v.klass].push(v);
    for (const k of Object.keys(buckets) as Array<keyof typeof buckets>) {
      buckets[k].sort((a, b) => b.n - a.n);
    }

    const section = (title: string, rows: { hops: number[]; n: number }[], klass: string) => {
      if (!rows.length) return "";
      const body = rows
        .slice(0, 12)
        .map(
          (r) =>
            `<div class="path-row">${pathHtml(r.hops, origin, north, south)} <span class="asof">×${r.n}</span></div>`,
        )
        .join("");
      return `<article class="card ${klass}"><h3>${title}</h3>
        <p class="asof">${ui.peersSeeing}: ${rows.reduce((s, r) => s + r.n, 0)} · ${ui.uniquePaths}: ${rows.length}</p>
        ${body}</article>`;
    };

    pathsEl.replaceChildren(
      el(`<section>
        <h2>${ui.pathsTitle} <code>${prefix}</code></h2>
        <p class="note">${ui.pathChipNote}</p>
        ${latest ? `<p class="asof">${ui.updated}: ${latest.replace("T", " ").replace(/\.\d+/, "")} UTC</p>` : ""}
        <div class="grid">
          ${section(ui.viaChina, buckets.north, "degraded")}
          ${section(ui.viaIndia, buckets.south, "up")}
          ${section(ui.viaOther, buckets.other, "unknown")}
        </div>
      </section>`),
    );
    if (statusEl) statusEl.remove();
  } catch {
    if (statusEl) statusEl.textContent = ui.error;
  }
}

run();

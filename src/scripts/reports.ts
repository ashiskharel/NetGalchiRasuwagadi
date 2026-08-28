interface Issue {
  html_url: string;
  title: string;
  created_at: string;
  updated_at: string;
  number: number;
  user?: { login: string };
  body?: string | null;
}

const CACHE_KEY = "netgalchi-field-reports";
const CACHE_MS = 10 * 60 * 1000;

function excerpt(body: string | null | undefined): string {
  if (!body) return "";
  const text = body.replace(/[#*_`>]/g, "").replace(/\s+/g, " ").trim();
  return text.length > 280 ? `${text.slice(0, 277)}…` : text;
}

async function loadIssues(repo: string, label: string): Promise<Issue[]> {
  const now = Date.now();
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as { t: number; issues: Issue[] };
      if (now - parsed.t < CACHE_MS) return parsed.issues;
    }
  } catch {
    /* ignore */
  }
  const url = `https://api.github.com/repos/${repo}/issues?labels=${encodeURIComponent(label)}&state=open&per_page=30`;
  const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (!res.ok) throw new Error(String(res.status));
  const issues = (await res.json()) as Issue[];
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: now, issues }));
  } catch {
    /* ignore */
  }
  return issues;
}

async function run() {
  const root = document.getElementById("field-reports");
  if (!root) return;
  const repo = root.dataset.repo ?? "";
  const label = root.dataset.label ?? "field-report";
  try {
    const issues = await loadIssues(repo, label);
    if (!issues.length) {
      root.replaceChildren(document.createTextNode(root.dataset.empty ?? ""));
      return;
    }
    const frag = document.createDocumentFragment();
    for (const issue of issues) {
      const art = document.createElement("article");
      art.className = "card issue";
      const h = document.createElement("h2");
      const a = document.createElement("a");
      a.href = issue.html_url;
      a.textContent = `#${issue.number} ${issue.title}`;
      h.append(a);
      const meta = document.createElement("p");
      meta.className = "asof";
      const who = issue.user?.login ? ` · ${issue.user.login}` : "";
      meta.textContent = `${root.dataset.updated} ${issue.updated_at.slice(0, 10)}${who}`;
      art.append(h, meta);
      const text = excerpt(issue.body);
      if (text) {
        const p = document.createElement("p");
        p.className = "note";
        p.textContent = text;
        art.append(p);
      }
      frag.append(art);
    }
    root.replaceChildren(frag);
  } catch {
    root.textContent = root.dataset.error ?? "";
  }
}

run();

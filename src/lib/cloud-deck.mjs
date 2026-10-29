/** Cloud deck vs a summit. Pressure-level cover is a humidity estimate, not a radar top. */

export const LEVELS = [850, 700, 500, 400, 300, 250];
export const CLOUD_PCT = 50;
const PAD_M = 200;

/**
 * @param {number} elev
 * @param {{ z: number, c: number }[]} levels
 * @returns {{ base_m: number | null, top_m: number | null, state: "clear" | "under" | "in" | "above" | "between" }}
 */
export function deckAt(elev, levels) {
  const rows = levels
    .filter((l) => Number.isFinite(l.z) && Number.isFinite(l.c))
    .sort((a, b) => a.z - b.z);
  if (!rows.length) return { base_m: null, top_m: null, state: "clear" };

  /** @type {{ base: number, top: number }[]} */
  const decks = [];
  /** @type {{ base: number, top: number } | null} */
  let cur = null;
  for (const level of rows) {
    if (level.c >= CLOUD_PCT) {
      if (!cur) cur = { base: level.z, top: level.z };
      else cur.top = level.z;
    } else if (cur) {
      decks.push(cur);
      cur = null;
    }
  }
  if (cur) decks.push(cur);
  if (!decks.length) return { base_m: null, top_m: null, state: "clear" };

  for (let i = 0; i < decks.length - 1; i++) {
    const lower = decks[i];
    const upper = decks[i + 1];
    if (elev > lower.top + PAD_M && elev < upper.base - PAD_M) {
      return { base_m: Math.round(lower.top), top_m: Math.round(upper.base), state: "between" };
    }
  }
  for (const deck of decks) {
    if (elev >= deck.base - PAD_M && elev <= deck.top + PAD_M) {
      return { base_m: Math.round(deck.base), top_m: Math.round(deck.top), state: "in" };
    }
  }
  const highest = decks[decks.length - 1];
  const lowest = decks[0];
  if (elev > highest.top + PAD_M) {
    return { base_m: Math.round(highest.base), top_m: Math.round(highest.top), state: "above" };
  }
  return { base_m: Math.round(lowest.base), top_m: Math.round(lowest.top), state: "under" };
}

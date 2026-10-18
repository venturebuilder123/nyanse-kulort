// Server-only catalogue jobs (CLAUDE.md §7): import affiliate feeds and tag product colours.
// Runs from the daily Vercel cron, from GitHub Actions every hour and from /lab/catalog by hand.
// Everything is idempotent: running a job twice changes nothing the second time.

import sharp from "sharp";
import { XMLParser } from "fast-xml-parser";
import { supabaseRest } from "@/lib/db/supabase";
import { dominantColour } from "./colour";
import { normalize, type NormalProduct } from "./normalize";

export type Feed = { id: number; network: string; program_id: string | null; shop: string; url: string; brands: string[]; active: boolean; max_products: number };

const MAX_BYTES = 80 * 1024 * 1024; // larger feeds: ask the network for a filtered or CSV feed

/** Reads the feed body, unzipping .gz feeds (Awin) on the way; refuses absurd sizes. */
async function fetchFeed(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": "kulort-nyanse-catalog/1.0" }, cache: "no-store" });
  if (!res.ok || !res.body) throw new Error(`feed http ${res.status}`);
  const gz = /\.gz(\?|$)/i.test(url) || /gzip/.test(res.headers.get("content-type") ?? "");
  const stream = gz ? res.body.pipeThrough(new DecompressionStream("gzip")) : res.body;
  const reader = stream.pipeThrough(new TextDecoderStream()).getReader();
  let text = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    text += value;
    if (text.length > MAX_BYTES) { await reader.cancel(); throw new Error("feed too large: ask the network for a filtered CSV feed"); }
  }
  return text;
}

/** CSV with quotes and newlines inside quotes; the delimiter is guessed from the header line. */
export function parseCsv(text: string): Record<string, string>[] {
  const head = text.slice(0, text.indexOf("\n") >>> 0 || 2000);
  const delim = [";", "\t", "|", ","].map((d) => [d, head.split(d).length] as const).sort((a, b) => b[1] - a[1])[0]![0];
  const rows: string[][] = [];
  let row: string[] = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]!;
    if (q) {
      if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === delim) { row.push(cell); cell = ""; }
    else if (ch === "\n") { row.push(cell.replace(/\r$/, "")); rows.push(row); row = []; cell = ""; }
    else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [header, ...body] = rows;
  if (!header) return [];
  const keys = header.map((h) => h.replace(/^﻿/, "").trim());
  return body.filter((r) => r.length > 1).map((r) => Object.fromEntries(keys.map((k, i) => [k, r[i] ?? ""])));
}

/** The biggest array of objects anywhere in a JSON or XML document is the product list. */
function productArray(doc: unknown): Record<string, unknown>[] {
  let best: Record<string, unknown>[] = [];
  const walk = (v: unknown, depth: number) => {
    if (depth > 6 || v == null || typeof v !== "object") return;
    if (Array.isArray(v)) {
      if (v.length > best.length && typeof v[0] === "object") best = v as Record<string, unknown>[];
      v.slice(0, 3).forEach((x) => walk(x, depth + 1));
    } else Object.values(v).forEach((x) => walk(x, depth + 1));
  };
  walk(doc, 0);
  return best;
}

export function parseFeed(text: string): Record<string, unknown>[] {
  const t = text.trimStart();
  if (t.startsWith("<")) return productArray(new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "", textNodeName: "#text" }).parse(t));
  if (t.startsWith("[") || t.startsWith("{")) return productArray(JSON.parse(t));
  return parseCsv(text);
}

/** Import one feed: parse, normalise, upsert in batches, then drop products the feed no longer has. */
export async function importFeed(feed: Feed): Promise<{ kept: number; seen: number }> {
  const started = new Date().toISOString();
  try {
    const rows = parseFeed(await fetchFeed(feed.url));
    const only = feed.brands.length === 1 ? (feed.brands[0] === "kulort" ? "men" : "women") : null;
    const seenIds = new Set<string>();
    const out: (NormalProduct & { feed_id: number; shop: string; seen_at: string })[] = [];
    for (const r of rows) {
      const p = normalize(r);
      if (!p || seenIds.has(p.external_id) || p.currency !== "EUR") continue;
      seenIds.add(p.external_id);
      // a men-only shop (e.g. Lureaux) needs no gender per product
      out.push({ ...p, gender: p.gender ?? only, feed_id: feed.id, shop: feed.shop, seen_at: started });
      if (out.length >= feed.max_products) break;
    }
    for (let i = 0; i < out.length; i += 500) {
      await supabaseRest("products?on_conflict=feed_id,external_id", { method: "POST", body: JSON.stringify(out.slice(i, i + 500)), prefer: "resolution=merge-duplicates,return=minimal" });
    }
    if (out.length) await supabaseRest(`products?feed_id=eq.${feed.id}&seen_at=lt.${encodeURIComponent(started)}`, { method: "DELETE" });
    await supabaseRest(`feeds?id=eq.${feed.id}`, { method: "PATCH", body: JSON.stringify({ last_import: started, last_count: out.length, last_error: null }) });
    return { kept: out.length, seen: rows.length };
  } catch (e) {
    await supabaseRest(`feeds?id=eq.${feed.id}`, { method: "PATCH", body: JSON.stringify({ last_import: started, last_error: String(e).slice(0, 300) }) }).catch(() => {});
    throw e;
  }
}

export async function activeFeeds(): Promise<Feed[]> {
  const r = await supabaseRest("feeds?active=eq.true&select=id,network,program_id,shop,url,brands,active,max_products&order=id");
  return (await r.json()) as Feed[];
}

/** Measure the colour of up to `limit` untagged products, a few at a time, within `budgetMs`. */
export async function tagBatch(limit = 120, budgetMs = 45000): Promise<{ tagged: number; failed: number; left: boolean }> {
  const t0 = Date.now();
  const r = await supabaseRest(`products?tagged_at=is.null&image_url=not.is.null&select=id,image_url&order=id&limit=${limit}`);
  const todo = (await r.json()) as { id: number; image_url: string }[];
  let tagged = 0, failed = 0, i = 0;
  const worker = async () => {
    while (i < todo.length && Date.now() - t0 < budgetMs) {
      const p = todo[i++]!;
      const now = new Date().toISOString();
      try {
        const res = await fetch(p.image_url, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) throw new Error(`image http ${res.status}`);
        const { data, info } = await sharp(Buffer.from(await res.arrayBuffer())).resize(64, 64, { fit: "inside" }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        const d = dominantColour(data, info.width, info.height);
        if (!d) throw new Error("no colour");
        await supabaseRest(`products?id=eq.${p.id}`, { method: "PATCH", body: JSON.stringify({ hex: d.hex, lab_l: d.lab.L, lab_a: d.lab.a, lab_b: d.lab.b, chroma: d.chroma, tagged_at: now, tag_error: null }) });
        tagged++;
      } catch (e) {
        failed++;
        await supabaseRest(`products?id=eq.${p.id}`, { method: "PATCH", body: JSON.stringify({ tagged_at: now, tag_error: String(e).slice(0, 200) }) }).catch(() => {});
      }
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  return { tagged, failed, left: todo.length === limit || i < todo.length };
}

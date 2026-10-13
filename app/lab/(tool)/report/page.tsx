"use client";

import { useEffect, useState } from "react";
import { RULES } from "@/lib/color/profile";
import { SEASONS } from "@/lib/color/seasons";
import { labDb } from "@/lib/lab/db";
import { buildReport, CONDITION_LABEL, GATE, runsToCsv, type Breakdown, type Condition, type PairStats } from "@/lib/lab/report";
import type { Person, Run } from "@/lib/lab/types";

const CONDITIONS: Condition[] = ["card", "nocard", "sameUncorrected"];
const pct = (s: PairStats) => (s.pairs ? `${Math.round((s.different / s.pairs) * 100)}%` : "–");

function download(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ReportPage() {
  const [data, setData] = useState<{ people: Person[]; runs: Run[] } | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const load = async () => setData({ people: await labDb.people(), runs: await labDb.runs() });
  useEffect(() => void load(), []);

  if (!data) return <p className="muted">Laden…</p>;
  const r = buildReport(data.people, data.runs);
  const stamp = new Date().toISOString().slice(0, 10);

  return (
    <div className="stack">
      <h1>Rapport fase A</h1>
      <p className="muted small">
        {r.people} testpersonen · {r.runs} foto&apos;s · regels v{RULES.version} · pijplijn A · uitslagen worden steeds opnieuw berekend uit de bewaarde meetwaarden
      </p>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Gate {r.gate.provisional && <span className="pill warn">voorlopig: minder dan {GATE.minPeople} personen</span>}</h2>
        <ul className="gate">
          {r.gate.checks.map((c) => (
            <li key={c.label}>
              <span className={c.pass === null ? "muted" : c.pass ? "ok" : "bad"}>{c.pass === null ? "○" : c.pass ? "✓" : "✗"}</span>{" "}
              {c.label} <span className="muted small">({c.detail})</span>
            </li>
          ))}
        </ul>
        <p className="small muted">
          &quot;Andere uitslag&quot; = twee selfies van dezelfde persoon krijgen een ander seizoen. Telt per paar foto&apos;s: 3 selfies geven 3 paren.
          &quot;Streng&quot; telt buren op de rand (&quot;tussen X en Y&quot;) niet als fout.
        </p>
      </section>

      <section>
        <h2>Consistentie per conditie</h2>
        <ConditionTable rows={{ Totaal: { people: r.people, stats: r.overall } }} />
      </section>

      <section>
        <h2>Per Monk-groep</h2>
        <ConditionTable rows={sortKeys(r.byMonk)} />
      </section>

      <section className="grid grid-2">
        <div>
          <h2>Per gender</h2>
          <ConditionTable rows={r.byGender} compact />
        </div>
        <div>
          <h2>Mannen: baard apart</h2>
          <ConditionTable rows={r.byBeard} compact />
        </div>
      </section>

      <section className="grid grid-2">
        <div>
          <h2>Spreiding seizoenen</h2>
          <div className="card">
            {r.seasonShare.length === 0 ? <p className="muted">Nog geen uitslagen met kaart.</p> : (
              <table>
                <tbody>
                  {r.seasonShare.map((s) => (
                    <tr key={s.season}><td>{SEASONS[s.season].name}</td><td className="num">{s.people}</td><td className="num">{Math.round(s.share * 100)}%</td></tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div>
          <h2>Betrouwbaarheid en tijd</h2>
          <div className="card">
            <table>
              <tbody>
                {r.confidence.map((c) => <tr key={c.bucket}><td>Betrouwbaarheid {c.bucket}</td><td className="num">{c.count}</td></tr>)}
                <tr><td>Kaart herkend en gebruikt</td><td className="num">{Number.isNaN(r.cardFoundRate) ? "–" : `${Math.round(r.cardFoundRate * 100)}%`}</td></tr>
                <tr><td>Gemiddelde analysetijd</td><td className="num">{Number.isNaN(r.meanMs) ? "–" : `${(r.meanMs / 1000).toFixed(1)} s`}</td></tr>
                <tr><td>Kosten per analyse (pijplijn A)</td><td className="num">€0</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="card stack">
        <h2 style={{ marginTop: 0 }}>Data</h2>
        <p className="small muted">
          Alles staat alleen in deze browser (week 1). Maak na elke testdag een back-up. Er zitten geen foto&apos;s in, alleen codes en meetwaarden.
        </p>
        <div className="row">
          <button onClick={() => download(`lab-runs-${stamp}.csv`, runsToCsv(data.people, data.runs), "text/csv")}>CSV (spreadsheet)</button>
          <button className="secondary" onClick={async () => download(`lab-backup-${stamp}.json`, JSON.stringify(await labDb.exportAll()), "application/json")}>
            Back-up (JSON)
          </button>
          <label className="button secondary">
            Back-up terugzetten
            <input
              type="file"
              accept="application/json"
              hidden
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                try {
                  const json = JSON.parse(await f.text());
                  if (!Array.isArray(json.people) || !Array.isArray(json.runs)) throw new Error("geen lab-back-up");
                  await labDb.importAll(json);
                  setMsg(`${json.people.length} personen en ${json.runs.length} foto's teruggezet.`);
                  load();
                } catch (err) {
                  setMsg(`Mislukt: ${err instanceof Error ? err.message : String(err)}`);
                }
              }}
            />
          </label>
        </div>
        {msg && <p className="small">{msg}</p>}
      </section>
    </div>
  );
}

function sortKeys(b: Breakdown): Breakdown {
  return Object.fromEntries(Object.entries(b).sort(([x], [y]) => parseInt(x) - parseInt(y)));
}

function ConditionTable({ rows, compact }: { rows: Breakdown; compact?: boolean }) {
  const entries = Object.entries(rows);
  if (entries.length === 0) return <p className="muted card">Nog geen data.</p>;
  return (
    <div className="card" style={{ overflowX: "auto" }}>
      <table>
        <thead>
          <tr>
            <th>Groep</th>
            <th className="num">Pers.</th>
            {CONDITIONS.filter((c) => !compact || c !== "sameUncorrected").map((c) => (
              <th key={c} className="num">{CONDITION_LABEL[c]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map(([k, g]) => (
            <tr key={k}>
              <td>{k}</td>
              <td className="num">{g.people}</td>
              {CONDITIONS.filter((c) => !compact || c !== "sameUncorrected").map((c) => {
                const s = g.stats[c];
                return (
                  <td key={c} className="num" title={`${s.different}/${s.pairs} paren anders · streng ${s.differentStrict} · gem. afstand ${s.meanDistance.toFixed(3)}`}>
                    {pct(s)} <span className="muted small">· streng {s.pairs ? `${Math.round((s.differentStrict / s.pairs) * 100)}%` : "–"} ({s.pairs})</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


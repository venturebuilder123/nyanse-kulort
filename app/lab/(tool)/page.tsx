"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { MONK_HEX } from "@/lib/color/monk";
import { labDb } from "@/lib/lab/db";
import type { Gender, Person, Run } from "@/lib/lab/types";

const today = () => new Date().toISOString().slice(0, 10);

function nextCode(people: Person[]): string {
  const nums = people.map((p) => Number(/^TP-(\d+)$/.exec(p.code)?.[1] ?? 0));
  return `TP-${String(Math.max(0, ...nums) + 1).padStart(3, "0")}`;
}

export default function PeoplePage() {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [runs, setRuns] = useState<Run[]>([]);

  const reload = useCallback(async () => {
    const [p, r] = await Promise.all([labDb.people(), labDb.runs()]);
    setPeople(p.sort((a, b) => a.code.localeCompare(b.code)));
    setRuns(r);
  }, []);
  useEffect(() => void reload(), [reload]);

  if (!people) return <p className="muted">Laden…</p>;

  return (
    <div className="stack">
      <h1>Testpersonen</h1>
      <Procedure />
      <NewPerson suggested={nextCode(people)} existing={people} onSaved={reload} />

      <h2>Overzicht ({people.length})</h2>
      {people.length === 0 ? (
        <p className="muted">Nog geen testpersonen.</p>
      ) : (
        <div className="card" style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Code</th><th>Monk</th><th>Gender</th><th>Baard</th><th className="num">Foto&apos;s</th><th>Toestemming</th><th />
              </tr>
            </thead>
            <tbody>
              {people.map((p) => {
                const n = runs.filter((r) => r.personCode === p.code).length;
                return (
                  <tr key={p.code}>
                    <td><Link href={`/lab/p/${encodeURIComponent(p.code)}`}>{p.code}</Link></td>
                    <td><span className="row" style={{ gap: 6 }}><Swatch tone={p.monk} />{p.monk}</span></td>
                    <td>{{ v: "Vrouw", m: "Man", x: "Anders" }[p.gender]}</td>
                    <td>{p.gender === "m" ? (p.beard ? "ja" : "nee") : "–"}</td>
                    <td className="num">{n}/6</td>
                    <td>{p.consentDate}</td>
                    <td>
                      <button
                        className="danger"
                        onClick={async () => {
                          if (!confirm(`${p.code} en alle metingen definitief verwijderen?`)) return;
                          await labDb.deletePerson(p.code);
                          reload();
                        }}
                      >
                        Verwijderen
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Swatch({ tone }: { tone: number }) {
  return <span style={{ display: "inline-block", width: 14, height: 14, borderRadius: 7, background: MONK_HEX[tone - 1], border: "1px solid var(--line)" }} />;
}

function Procedure() {
  return (
    <details className="card">
      <summary><strong>Werkwijze per testpersoon</strong></summary>
      <ol className="small">
        <li>Laat het toestemmingsformulier tekenen (docs/fase-a/TOESTEMMING.md). Zonder handtekening geen foto&apos;s.</li>
        <li>Maak de testpersoon hieronder aan. Kies de Monk-tint door de kleurcirkels naast de kaak te vergelijken, bij daglicht.</li>
        <li>Per lichtsituatie twee selfies met de frontcamera: één met de kaart plat naast de kin, één zonder kaart. Geen filter, geen portretmodus.</li>
        <li>Upload op de pagina van de testpersoon. De foto blijft op dit apparaat; alleen de meetwaarden worden bewaard.</li>
        <li>Rode meldingen? Maak die foto opnieuw en volg de tip.</li>
      </ol>
    </details>
  );
}

function NewPerson({ suggested, existing, onSaved }: { suggested: string; existing: Person[]; onSaved: () => void }) {
  const [code, setCode] = useState(suggested);
  const [monk, setMonk] = useState<number | null>(null);
  const [gender, setGender] = useState<Gender>("m");
  const [beard, setBeard] = useState(false);
  const [consentDate, setConsentDate] = useState(today());
  const [consent, setConsent] = useState(false);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setCode(suggested), [suggested]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const c = code.trim().toUpperCase();
    if (!/^[A-Z0-9-]{2,20}$/.test(c)) return setError("Code: alleen letters, cijfers en streepjes. Geen namen.");
    if (existing.some((p) => p.code === c)) return setError("Deze code bestaat al.");
    if (!monk) return setError("Kies een Monk-tint.");
    if (!consent) return setError("Zonder getekende toestemming geen testpersoon.");
    await labDb.savePerson({
      code: c, monk, gender, beard: gender === "m" && beard, consentDate,
      notes: notes.trim() || undefined, createdAt: new Date().toISOString(),
    });
    setMonk(null); setBeard(false); setConsent(false); setNotes(""); setError(null);
    onSaved();
  }

  return (
    <form className="card stack" onSubmit={save}>
      <h2 style={{ marginTop: 0 }}>Nieuwe testpersoon</h2>
      <div className="grid grid-3">
        <label>
          Code (geen naam)
          <input value={code} onChange={(e) => setCode(e.target.value)} />
        </label>
        <label>
          Gender
          <select value={gender} onChange={(e) => setGender(e.target.value as Gender)}>
            <option value="m">Man</option>
            <option value="v">Vrouw</option>
            <option value="x">Anders / zeg ik liever niet</option>
          </select>
        </label>
        {gender === "m" && (
          <label className="inline" style={{ alignSelf: "end" }}>
            <input type="checkbox" checked={beard} onChange={(e) => setBeard(e.target.checked)} /> Baard (meer dan stoppels)
          </label>
        )}
      </div>
      <div className="stack" style={{ gap: 6 }}>
        <span style={{ fontWeight: 500 }}>Monk-tint (door de onderzoeker)</span>
        <div className="monk-picker" role="group" aria-label="Monk-tint">
          {MONK_HEX.map((hex, i) => (
            <button
              key={hex}
              type="button"
              aria-pressed={monk === i + 1}
              aria-label={`Monk ${i + 1}`}
              style={{ background: hex }}
              onClick={() => setMonk(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <span className="small muted">{monk ? `Gekozen: ${monk}` : "Nog niet gekozen"}</span>
      </div>
      <div className="grid grid-3">
        <label>
          Datum toestemming
          <input type="date" value={consentDate} onChange={(e) => setConsentDate(e.target.value)} required />
        </label>
        <label>
          Notitie (optioneel, geen persoonsgegevens)
          <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="bijv. bril, make-up, geverfd haar" />
        </label>
      </div>
      <label className="inline">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        Het toestemmingsformulier is getekend en bewaard
      </label>
      {error && <p className="error" role="alert">{error}</p>}
      <div><button type="submit">Opslaan</button></div>
    </form>
  );
}

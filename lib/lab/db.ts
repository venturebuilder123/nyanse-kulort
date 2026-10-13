// Browser storage for the lab (week 1). Only numbers and pseudonymous codes, never images.
// Moves to Supabase (EU) in week 2; export/import keeps the data portable until then.

import type { Person, Run } from "./types";

const DB_NAME = "nk-lab";
const VERSION = 1;

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("people")) db.createObjectStore("people", { keyPath: "code" });
      if (!db.objectStoreNames.contains("runs")) {
        db.createObjectStore("runs", { keyPath: "id" }).createIndex("personCode", "personCode");
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx<T>(store: "people" | "runs", mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await open();
  return new Promise((resolve, reject) => {
    const t = db.transaction(store, mode);
    const req = fn(t.objectStore(store));
    t.oncomplete = () => {
      db.close();
      resolve(req.result);
    };
    t.onerror = () => reject(t.error);
  });
}

export const labDb = {
  people: () => tx<Person[]>("people", "readonly", (s) => s.getAll()),
  person: (code: string) => tx<Person | undefined>("people", "readonly", (s) => s.get(code)),
  savePerson: (p: Person) => tx("people", "readwrite", (s) => s.put(p)),
  runs: () => tx<Run[]>("runs", "readonly", (s) => s.getAll()),
  runsFor: (code: string) => tx<Run[]>("runs", "readonly", (s) => s.index("personCode").getAll(code)),
  saveRun: (r: Run) => tx("runs", "readwrite", (s) => s.put(r)),
  deleteRun: (id: string) => tx("runs", "readwrite", (s) => s.delete(id)),

  /** Removes a person and all their runs (right to erasure). */
  async deletePerson(code: string) {
    const runs = await labDb.runsFor(code);
    for (const r of runs) await labDb.deleteRun(r.id);
    await tx("people", "readwrite", (s) => s.delete(code));
  },

  async exportAll() {
    return { version: 1, exportedAt: new Date().toISOString(), people: await labDb.people(), runs: await labDb.runs() };
  },

  async importAll(data: { people: Person[]; runs: Run[] }) {
    for (const p of data.people) await labDb.savePerson(p);
    for (const r of data.runs) await labDb.saveRun(r);
  },
};

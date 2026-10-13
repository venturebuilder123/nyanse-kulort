"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  return (
    <main className="login">
      <form action={action} className="card">
        <h1>Lab</h1>
        <p className="muted">Interne testtool, fase A.</p>
        <label>
          Wachtwoord
          <input name="password" type="password" autoComplete="current-password" required autoFocus />
        </label>
        {state.error && <p className="error" role="alert">{state.error}</p>}
        <button type="submit" disabled={pending}>{pending ? "Bezig…" : "Inloggen"}</button>
      </form>
    </main>
  );
}

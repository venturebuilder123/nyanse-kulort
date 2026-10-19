import Link from "next/link";
import { logout } from "../login/actions";

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="lab-header">
        <strong>LAB</strong>
        <nav>
          <Link href="/lab">Testpersonen</Link>
          <Link href="/lab/report">Rapport</Link>
          <Link href="/lab/orders">Bestellingen</Link>
          <Link href="/lab/catalog">Catalogus</Link>
          <Link href="/lab/social">Instagram</Link>
        </nav>
        <form action={logout}>
          <button className="secondary" type="submit">Uitloggen</button>
        </form>
      </header>
      <main className="lab-main">{children}</main>
    </>
  );
}

// "Verwijder mijn profiel" (CLAUDE.md §5): one tap wipes this device and the server.
import { pushOff } from "@/lib/push/client";
import { journey } from "./journey";
import { invite } from "./referral";
import { flowSession } from "./session";

export async function forgetMe(): Promise<void> {
  flowSession.clear();
  journey.clear();
  invite.clear();
  await pushOff().catch(() => {});
}

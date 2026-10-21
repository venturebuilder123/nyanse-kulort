// Single-use giveaway codes (GIFT_CODES): used once there is any order with the code, paid or not.
import { supabaseRest } from "@/lib/db/supabase";

export async function giftUsed(code: string): Promise<boolean> {
  const r = await supabaseRest(`orders?friend_code=eq.${encodeURIComponent(code)}&select=ref&limit=1`).then((x) => x.json()).catch(() => []);
  return Array.isArray(r) && r.length > 0;
}

// common typos in Dutch e-mail domains
const DOMAIN_FIX: Record<string, string> = {
  "gmial.com": "gmail.com", "gmal.com": "gmail.com", "gmail.nl": "gmail.com", "gamil.com": "gmail.com", "gmail.co": "gmail.com",
  "hotmial.com": "hotmail.com", "hotmal.com": "hotmail.com", "hotmail.nll": "hotmail.nl", "outlook.con": "outlook.com",
  "outlok.com": "outlook.com", "ziggo.nll": "ziggo.nl", "kpnmail.nll": "kpnmail.nl", "icloud.con": "icloud.com",
};
export function suggestEmail(v: string): string | null {
  const [user, domain] = v.trim().toLowerCase().split("@");
  const fix = domain && DOMAIN_FIX[domain];
  return user && fix ? `${user}@${fix}` : null;
}

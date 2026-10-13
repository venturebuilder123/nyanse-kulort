// Service worker: only for the weekly colour tip (opt-in push). No caching, no tracking.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("push", (event) => {
  let msg = {};
  try {
    msg = event.data ? event.data.json() : {};
  } catch {}
  if (!msg.title) return;
  event.waitUntil(
    self.registration.showNotification(msg.title, {
      body: msg.body,
      icon: msg.icon,
      tag: "weekly-colour", // a new tip replaces the old one, never a pile-up
      data: { url: msg.url || "/gids" },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = new URL(event.notification.data?.url || "/gids", self.location.origin).href;
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((wins) => {
      const open = wins.find((w) => w.url.startsWith(self.location.origin));
      return open ? open.navigate(url).then((w) => w && w.focus()) : self.clients.openWindow(url);
    }),
  );
});

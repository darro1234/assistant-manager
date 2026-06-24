const CACHE_NAME = "mylife-planner-pwa-v2-09";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./icon.svg",
  "./icon-192.svg",
  "./icon-512.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./favicon.svg",
  "./favicon-32.png",
  "./favicon-16.png",
  "./mandala-logo.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null))
    )
  );
  self.clients.claim();
});

async function handleShareTarget(request) {
  const formData = await request.formData();
  const file = formData.get("ics");
  const content = file && typeof file.text === "function"
    ? await file.text()
    : String(formData.get("text") || "");
  const payload = {
    content,
    name: file?.name || "shared.ics",
    receivedAt: new Date().toISOString()
  };

  const cache = await caches.open(CACHE_NAME);
  await cache.put("shared-ics.json", new Response(JSON.stringify(payload), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  }));

  return Response.redirect("./index.html?shareTarget=ics", 303);
}

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (event.request.method === "POST" && url.pathname.endsWith("/share-target")) {
    event.respondWith(handleShareTarget(event.request));
    return;
  }
  if (event.request.method !== "GET") {
    event.respondWith(fetch(event.request));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type: "window", includeUncontrolled: true}).then(clientList => {
      for (const client of clientList) {
        if ("focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow("./index.html");
    })
  );
});

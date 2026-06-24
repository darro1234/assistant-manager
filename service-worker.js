const MANAGER_PLUS_CACHE = "manager-plus-pwa-v5";
const MANAGER_PLUS_ASSETS = [
  "./",
  "./index.html",
  "./CHANGELOG.md",
  "./manifest.json",
  "./favicon.ico",
  "./favicon-16x16.png",
  "./favicon-32x32.png",
  "./apple-touch-icon.png",
  "./icon-48.png",
  "./icon-72.png",
  "./icon-96.png",
  "./icon-128.png",
  "./icon-144.png",
  "./icon-192.png",
  "./icon-384.png",
  "./icon-512.png",
  "./icon-maskable-192.png",
  "./icon-maskable-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(MANAGER_PLUS_CACHE).then(cache => cache.addAll(MANAGER_PLUS_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== MANAGER_PLUS_CACHE).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(MANAGER_PLUS_CACHE).then(cache => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(MANAGER_PLUS_CACHE).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});

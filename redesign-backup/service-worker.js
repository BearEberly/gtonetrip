const cacheName = "cabin-game-plan-v2";

const cacheableUrls = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/manifest.webmanifest",
  "/assets/favicon.svg",
  "/assets/cabin-hero.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(cacheableUrls))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((key) => {
      if (key === cacheName) return null;
      return caches.delete(key);
    })))
  );
  self.clients.claim();
});

function isAppShellRequest(request, url) {
  if (request.mode === "navigate") return true;
  return /\.(?:html|css|js|webmanifest)$/.test(url.pathname);
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;
  // Never cache API/live-sync traffic.
  if (requestUrl.pathname.startsWith("/api/")) return;

  // Network-first for the app shell (HTML/CSS/JS/manifest) so code changes
  // appear on next load instead of being pinned to a stale cached copy.
  // Cache-first for everything else (images, icons) for speed/offline.
  if (isAppShellRequest(event.request, requestUrl)) {
    event.respondWith(
      fetch(event.request).then((response) => {
        if (response && response.ok) {
          const clone = response.clone();
          caches.open(cacheName).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match(event.request).then((cached) => cached || caches.match("/index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || !response.ok) return response;
        const clone = response.clone();
        caches.open(cacheName).then((cache) => cache.put(event.request, clone));
        return response;
      });
    })
  );
});

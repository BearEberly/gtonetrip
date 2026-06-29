const cacheName = "guantonio-trip-v20";

const cacheableUrls = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/manifest.webmanifest",
  "/assets/favicon.svg",
  "/assets/apple-touch-icon.png",
  "/assets/icon-192.png",
  "/assets/icon-512.png",
  "/assets/cabin-hero.png",
  "/assets/vendor/simplewebauthn-browser.umd.min.js"
];
const cacheablePaths = new Set(cacheableUrls);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(cacheableUrls))
  );
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

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;
  if (!cacheablePaths.has(requestUrl.pathname)) return;

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

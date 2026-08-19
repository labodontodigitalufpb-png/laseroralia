const CACHE_NAME = "laser-oral-aid-v38";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=38",
  "./app.js?v=38",
  "./supabase-client.js",
  "./supabase-config.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "./assets/ufal.jpg",
  "./assets/cesmac.jpg",
  "./assets/labodigit.jpg",
  "./assets/pet-telestomatologia-unifal-mg.jpeg",
  "./assets/laser-oral-aid.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
  );
});

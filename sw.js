/* Musafir: offline support */
const VERSION = "abp-v48";
const CORE = ["./", "index.html", "css/style.css?v=48", "js/data.js?v=48", "js/course.js?v=48", "js/pearls-nahj.js?v=48", "js/lives.js?v=48", "js/qa.js?v=48", "js/lib-index.js?v=48", "js/translit.js?v=48", "js/namaz.js?v=48", "js/support.js?v=48", "js/sources.js?v=48", "js/year.js?v=48", "js/app.js?v=48",
  "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png"];
const RUNTIME = "abp-runtime";

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== RUNTIME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

async function trim(cache, max) {
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Pages: network first, so the newest version always shows; offline falls back to cache
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put("index.html", copy));
      return res;
    }).catch(() => caches.match("index.html")));
    return;
  }
  // Our own files: cache first
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res;
    })));
    return;
  }
  // Fonts, Wikipedia data and photos: use cache, refresh in the background
  if (/fonts\.(googleapis|gstatic)\.com|wikipedia\.org|wikimedia\.org|api\.alquran\.cloud/.test(url.hostname)) {
    e.respondWith(caches.open(RUNTIME).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(res => { if (res && (res.ok || res.type === "opaque")) { c.put(req, res.clone()); trim(c, 220); } return res; }).catch(() => hit);
      return hit || net;
    }));
  }
});

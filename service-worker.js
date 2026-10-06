const CACHE='medical-study-v1';
const ASSETS=["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./congenital-1.html", "./congenital-2.html", "./head-trauma-1.html", "./head-trauma-2.html"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return res;})));});

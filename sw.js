const CACHE='mf30-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./styles.css','./print.css','./js/content.js','./js/engine.js','./js/model.js','./js/app.js','./manifest.webmanifest'])));self.skipWaiting();});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('mf30-')&&k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{if(e.request.method==='GET'&&new URL(e.request.url).origin===location.origin)e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));});

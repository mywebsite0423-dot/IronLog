const C='ironlog-v1'; // bump this number whenever you deploy an update
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png'])))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
 if(e.request.method!='GET'||!(u.origin==location.origin||/(^|\.)gstatic\.com$|fonts\.googleapis\.com$/.test(u.host)))return;
 e.respondWith(caches.open(C).then(async c=>{const hit=await c.match(e.request);
  const net=fetch(e.request).then(r=>{if(r&&(r.ok||r.type=='opaque'))c.put(e.request,r.clone());return r}).catch(()=>hit);
  return hit||net}))});

/* OPAL probe -- minimal service worker. Throw-away: it only answers whether the
   cache of an installed home-screen page survives. Scope is this folder only. */
'use strict';

var CACHE = 'opal-probe-v1';
var FILES = ['./', 'index.html', 'manifest.webmanifest'];
var STAMP = 'cache-filled-at';

self.addEventListener('install', function (ev) {
  ev.waitUntil(
    caches.open(CACHE).then(function (c) {
      return c.addAll(FILES).then(function () {
        return c.put(STAMP, new Response(String(Date.now())));
      });
    })
  );
});

self.addEventListener('activate', function (ev) {
  ev.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (ev) {
  if (ev.request.method !== 'GET') return;
  ev.respondWith(
    caches.match(ev.request).then(function (hit) { return hit || fetch(ev.request); })
  );
});

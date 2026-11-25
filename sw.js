/*
************************************************************************
* This file is part of OpenMolcas.                                     *
*                                                                      *
* OpenMolcas is free software; you can redistribute it and/or modify   *
* it under the terms of the GNU Lesser General Public License, v. 2.1. *
* OpenMolcas is distributed in the hope that it will be useful, but it *
* is provided "as is" and without any express or implied warranties.   *
* For more details see the full text of the license in the file        *
* LICENSE or in <http://www.gnu.org/licenses/>.                        *
*                                                                      *
* Copyright (C) 2026, Luca De Vico                                     *
************************************************************************

  OPAL -- OpenMolcas Orbitals, Plotting, Analysis and Layout
  Service worker of the installed (offline) copy of the suite.

  What it handles: the nine pages, the manifest and the icons, nothing else.
  Every other request is left alone and goes to the network as if no worker
  existed, so a page of the site that is not listed here is never served stale.

  Three tiers:
    1. install      the launcher, the manifest and the icons (small);
    2. on request   the launcher sends 'opal-fetch-tools' and the worker fetches
                    the pages that are not cached yet, once;
    3. at runtime   a listed page that is requested and not cached is fetched,
                    answered and cached.

  Updates: the worker never takes over a running page by itself. A newer set of
  files is applied only when the page sends 'opal-refresh', and then all or none
  of the files are replaced. 'opal-status' reports what the cache really holds,
  read back from the cache and not from what a fetch loop believed it did.
*/
'use strict';

var CACHE_PREFIX = 'opal-pwa-';
var CACHE = CACHE_PREFIX + '1';

/* The nine pages, as published (the names in the FILES list of publish.sh). */
var TOOL_FILES = [
  'index.html',
  'csfscalc.html',
  'geodiff.html',
  'intcoords.html',
  'molbuild.html',
  'molviz.html',
  'orbviz.html',
  'pathvibviz.html',
  'rassiviz.html'
];
var SHELL_FILES = [
  'manifest.webmanifest',
  'icons/opal-180.png',
  'icons/opal-192.png',
  'icons/opal-512.png',
  'icons/opal-maskable-512.png'
];
var ALL_FILES = TOOL_FILES.concat(SHELL_FILES);
var PRECACHE = ['index.html'].concat(SHELL_FILES);

var BASE = self.registration.scope;                 /* always ends with a slash */
var BASE_URL = new URL(BASE);

function absolute(name) { return new URL(name, BASE).href; }

/* The listed name that a request URL stands for, or null when the worker must not
   touch it. The address of the folder itself stands for the launcher. */
function listedName(url) {
  var u = new URL(url);
  if (u.origin !== BASE_URL.origin) return null;
  if (u.pathname === BASE_URL.pathname) return 'index.html';
  for (var i = 0; i < ALL_FILES.length; i++) {
    if (u.pathname === new URL(ALL_FILES[i], BASE).pathname) return ALL_FILES[i];
  }
  return null;
}

function fetchFresh(name) {
  return fetch(absolute(name), { cache: 'reload' }).then(function (res) {
    if (!res || !res.ok) throw new Error(name + ': HTTP ' + (res ? res.status : 'none'));
    return res;
  });
}

/* What the cache holds, read back from the cache itself. */
function status(cache) {
  return cache.keys().then(function (reqs) {
    var held = {};
    reqs.forEach(function (r) {
      var n = listedName(r.url);
      if (n) held[n] = true;
    });
    var cached = ALL_FILES.filter(function (n) { return held[n]; });
    var missing = ALL_FILES.filter(function (n) { return !held[n]; });
    return { type: 'opal-status', cache: CACHE, expected: ALL_FILES.slice(), cached: cached, missing: missing };
  });
}

self.addEventListener('install', function (ev) {
  ev.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return Promise.all(PRECACHE.map(function (name) {
        return fetchFresh(name).then(function (res) { return cache.put(absolute(name), res); });
      }));
    })
  );
});

self.addEventListener('activate', function (ev) {
  ev.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys
        .filter(function (k) { return k.indexOf(CACHE_PREFIX) === 0 && k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (ev) {
  var req = ev.request;
  if (req.method !== 'GET') return;
  var name = listedName(req.url);
  if (name === null) return;                        /* not ours: no answer, the network decides */
  ev.respondWith(
    caches.open(CACHE).then(function (cache) {
      return cache.match(absolute(name)).then(function (hit) {
        if (hit) return hit;
        return fetch(req).then(function (res) {
          if (res && res.ok) cache.put(absolute(name), res.clone());
          return res;
        });
      });
    })
  );
});

function reply(ev, msg) {
  if (ev.source && typeof ev.source.postMessage === 'function') ev.source.postMessage(msg);
}

self.addEventListener('message', function (ev) {
  var data = ev.data;
  var type = data && data.type;
  var job = null;

  if (type === 'opal-status') {
    job = caches.open(CACHE).then(status).then(function (s) { reply(ev, s); });

  } else if (type === 'opal-fetch-tools') {
    job = caches.open(CACHE).then(function (cache) {
      return status(cache).then(function (before) {
        var failed = [];
        return Promise.all(before.missing.map(function (name) {
          return fetchFresh(name)
            .then(function (res) { return cache.put(absolute(name), res); })
            .catch(function () { failed.push(name); });
        })).then(function () { return status(cache); }).then(function (after) {
          reply(ev, { type: 'opal-fetch-tools-done', failed: failed, status: after });
        });
      });
    });

  } else if (type === 'opal-refresh') {
    job = caches.open(CACHE).then(function (cache) {
      return Promise.all(ALL_FILES.map(function (name) {
        return fetchFresh(name).then(function (res) { return { name: name, res: res }; });
      })).then(function (all) {
        return Promise.all(all.map(function (f) { return cache.put(absolute(f.name), f.res); }))
          .then(function () { return []; });
      }, function (err) {
        return [String(err && err.message ? err.message : err)];   /* nothing was replaced */
      }).then(function (failed) {
        return status(cache).then(function (after) {
          reply(ev, { type: 'opal-refresh-done', ok: failed.length === 0, failed: failed, status: after });
        });
      });
    });
  }

  if (job) ev.waitUntil(job);
});

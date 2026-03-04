// LEXA Service Worker v4 — Production-Grade Caching Strategy
// Cache-first for static, network-first for critical CMS, stale-while-revalidate for API data
// Offline fallback, cache size limits, proper versioning

const STATIC_CACHE = 'lexa-static-v4';
const API_CACHE = 'lexa-api-v2';
const OFFLINE_CACHE = 'lexa-offline-v1';
const API_MAX_AGE_MS = 5 * 60 * 1000; // 5 min TTL for stale-while-revalidate
const API_CACHE_MAX_ENTRIES = 100; // Max cached API responses

// Static assets — cache-first (immutable hashed files)
const STATIC_PATTERNS = [
  /\/_next\/static\/.*/,
  /\/_next\/image\?.*/,
  /\.woff2$/,
  /\.woff$/,
  /\.css$/,
  /\.png$/,
  /\.jpg$/,
  /\.jpeg$/,
  /\.webp$/,
  /\.svg$/,
  /\.ico$/,
];

// Critical data — network-first (always fresh when online)
const NETWORK_FIRST_PATTERNS = [
  /\/api\/cms\//,
  /\/api\/settings/,
  /\/api\/site-config/,
  /\/api\/admin/,
];

// Regular API data — stale-while-revalidate with TTL
const SWR_CACHE_PATTERNS = [
  /\/api\/solutions/,
  /\/api\/projects/,
  /\/api\/articles/,
  /\/api\/services/,
  /\/api\/brands/,
  /\/api\/packages/,
  /\/api\/testimonials/,
  /\/api\/locations/,
  /\/api\/catalogues/,
  /\/api\/faq/,
];

// Never cache these
const NEVER_CACHE = [
  /\/api\/auth/,
  /\/api\/bookings/,
  /\/api\/submissions/,
  /\/api\/analytics/,
  /\/api\/clear-cache/,
  /\/api\/whatsapp/,
  /\/api\/schedule-visit/,
  /\/api\/contact/,
  /google-analytics/,
  /googletagmanager/,
  /facebook/,
  /hotjar/,
  /interakt/,
  /stripe/,
];

function matchesAny(url, patterns) {
  const s = url.toString();
  for (const p of patterns) { if (p.test(s)) return true; }
  return false;
}

// Trim cache to max entries (evict oldest first)
async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxEntries) {
    const toDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(toDelete.map(k => cache.delete(k)));
  }
}

// Offline fallback HTML
const OFFLINE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>LEXA Lifestyle — Offline</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0A0A0A;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:2rem}
    .container{text-align:center;max-width:420px}
    .logo{font-size:2.5rem;font-weight:800;letter-spacing:.15em;margin-bottom:.5rem;color:#C9A962}
    .sub{font-size:.75rem;letter-spacing:.3em;text-transform:uppercase;color:#888;margin-bottom:2.5rem}
    h1{font-size:1.5rem;font-weight:600;margin-bottom:1rem}
    p{color:#999;font-size:.95rem;line-height:1.6;margin-bottom:2rem}
    .btn{display:inline-block;padding:.75rem 2rem;border:1px solid #C9A962;color:#C9A962;text-decoration:none;border-radius:4px;font-size:.85rem;letter-spacing:.1em;transition:all .2s}
    .btn:hover{background:#C9A962;color:#0A0A0A}
    .diamond{color:#C9A962;margin:0 .25rem}
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">LEXA</div>
    <div class="sub">Life Style</div>
    <h1>You're Offline</h1>
    <p>It looks like your internet connection dropped. Some previously visited pages may still be available. Please check your connection and try again.</p>
    <a href="/" class="btn" onclick="window.location.reload();return false;">Retry Connection</a>
    <p style="margin-top:2rem;font-size:.75rem;color:#555">Crafted with <span class="diamond">&#9670;</span> in Dubai</p>
  </div>
</body>
</html>`;

// Install — pre-cache offline page, activate immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(OFFLINE_CACHE).then((cache) => {
      return cache.put(
        new Request('/_offline'),
        new Response(OFFLINE_HTML, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        })
      );
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches, claim clients
self.addEventListener('activate', (event) => {
  const VALID = [STATIC_CACHE, API_CACHE, OFFLINE_CACHE];
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((n) => !VALID.includes(n)).map((n) => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch handler
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = event.request.url;

  // Skip never-cache patterns
  if (matchesAny(url, NEVER_CACHE)) return;

  // 1. Static assets — cache-first
  if (matchesAny(url, STATIC_PATTERNS)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(STATIC_CACHE).then((c) => c.put(event.request, clone));
          }
          return res;
        }).catch(() => cached || new Response('', { status: 503 }));
      })
    );
    return;
  }

  // 2. Critical CMS data — network-first with cache fallback
  if (matchesAny(url, NETWORK_FIRST_PATTERNS)) {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(API_CACHE).then((c) => c.put(event.request, clone));
          }
          return res;
        })
        .catch(() =>
          caches.match(event.request).then((cached) => {
            if (cached) return cached;
            return new Response(JSON.stringify({ error: 'offline' }), {
              status: 503,
              headers: { 'Content-Type': 'application/json' },
            });
          })
        )
    );
    return;
  }

  // 3. Regular API data — stale-while-revalidate with TTL
  if (matchesAny(url, SWR_CACHE_PATTERNS)) {
    event.respondWith(
      caches.open(API_CACHE).then(async (cache) => {
        const cached = await cache.match(event.request);

        const fetchPromise = fetch(event.request)
          .then((res) => {
            if (res && res.status === 200) {
              const headers = new Headers(res.headers);
              headers.set('sw-cached-at', Date.now().toString());
              const timedResponse = new Response(res.clone().body, {
                status: res.status,
                statusText: res.statusText,
                headers: headers,
              });
              cache.put(event.request, timedResponse);
              // Trim cache in background
              trimCache(API_CACHE, API_CACHE_MAX_ENTRIES);
            }
            return res.clone();
          })
          .catch(() => null);

        // If cached and fresh, return immediately (background update fires)
        if (cached) {
          const cachedAt = parseInt(cached.headers.get('sw-cached-at') || '0');
          if (Date.now() - cachedAt < API_MAX_AGE_MS) {
            fetchPromise; // fire-and-forget
            return cached;
          }
        }

        // No valid cache — wait for network
        const networkResponse = await fetchPromise;
        if (networkResponse) return networkResponse;
        if (cached) return cached; // stale fallback
        return new Response(JSON.stringify({ error: 'offline' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        });
      })
    );
    return;
  }

  // 4. HTML navigation — network-first with offline fallback page
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match('/_offline').then((offlinePage) => {
          return offlinePage || new Response('Offline', { status: 503 });
        })
      )
    );
    return;
  }
});

// Message handler for cache control
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
  if (event.data === 'clearCache') {
    caches.delete(STATIC_CACHE);
    caches.delete(API_CACHE);
  }
  if (event.data === 'clearAPICache') {
    caches.delete(API_CACHE);
  }
});

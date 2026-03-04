// LEXA Service Worker v5 — Advanced Caching
// Cache-first statics + external images, network-first CMS, SWR APIs,
// navigation preload, API prefetch on install, video range handling, periodic cleanup

const SW_VERSION = 'v5';
const STATIC_CACHE = 'lexa-static-v5';
const IMAGE_CACHE = 'lexa-images-v1';
const API_CACHE = 'lexa-api-v3';
const OFFLINE_CACHE = 'lexa-offline-v2';

const API_MAX_AGE_MS = 5 * 60 * 1000;       // 5 min SWR TTL
const API_CACHE_MAX = 120;                    // max API entries
const IMAGE_CACHE_MAX = 80;                   // max external images
const STATIC_CACHE_MAX = 200;                 // max static assets
const CLEANUP_INTERVAL_MS = 30 * 60 * 1000;  // cleanup every 30 min

// ── Pattern matchers ──

const STATIC_PATTERNS = [
  /\/_next\/static\/.*/,
  /\/_next\/image\?.*/,
  /\.woff2?$/,
  /\.css$/,
  /\.js$/,
  /\.png$/,
  /\.jpg$/,
  /\.jpeg$/,
  /\.webp$/,
  /\.svg$/,
  /\.ico$/,
];

const EXTERNAL_IMAGE_PATTERNS = [
  /static\.prod-images\.emergentagent\.com/,
  /customer-assets\.emergentagent\.com/,
  /images\.unsplash\.com/,
  /images\.pexels\.com/,
];

const NETWORK_FIRST_PATTERNS = [
  /\/api\/cms\//,
  /\/api\/settings/,
  /\/api\/site-config/,
  /\/api\/admin/,
];

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

const VIDEO_PATTERN = /\.mp4$/;

// Key API routes to prefetch on install
const PREFETCH_URLS = [
  '/api/solutions',
  '/api/services',
  '/api/testimonials',
  '/api/brands',
];

function matchesAny(url, patterns) {
  const s = url.toString();
  for (const p of patterns) { if (p.test(s)) return true; }
  return false;
}

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxEntries) {
    const excess = keys.slice(0, keys.length - maxEntries);
    await Promise.all(excess.map(k => cache.delete(k)));
  }
}

async function cleanStaleAPI() {
  try {
    const cache = await caches.open(API_CACHE);
    const keys = await cache.keys();
    const now = Date.now();
    const staleThreshold = 60 * 60 * 1000; // 1 hour
    for (const key of keys) {
      const res = await cache.match(key);
      if (res) {
        const cachedAt = parseInt(res.headers.get('sw-cached-at') || '0');
        if (cachedAt && (now - cachedAt) > staleThreshold) {
          await cache.delete(key);
        }
      }
    }
  } catch (e) { /* silent */ }
}

// ── Offline page ──

const OFFLINE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>LEXA Lifestyle — Offline</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#050505;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:2rem}
    .c{text-align:center;max-width:420px}
    .logo{font-size:2.5rem;font-weight:800;letter-spacing:.15em;margin-bottom:.5rem;color:#C9A962}
    .sub{font-size:.7rem;letter-spacing:.3em;text-transform:uppercase;color:#666;margin-bottom:2.5rem}
    h1{font-size:1.4rem;font-weight:600;margin-bottom:1rem}
    p{color:#888;font-size:.9rem;line-height:1.6;margin-bottom:2rem}
    .btn{display:inline-block;padding:.7rem 2rem;border:1px solid #C9A962;color:#C9A962;text-decoration:none;font-size:.8rem;letter-spacing:.1em;transition:all .2s}
    .btn:hover{background:#C9A962;color:#050505}
  </style>
</head>
<body>
  <div class="c">
    <div class="logo">LEXA</div>
    <div class="sub">Life Style</div>
    <h1>You're Offline</h1>
    <p>Some previously visited pages may still be available. Check your connection and try again.</p>
    <a href="/" class="btn" onclick="window.location.reload();return false;">Retry</a>
  </div>
</body>
</html>`;

// ── Install ──

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // Cache offline page
      caches.open(OFFLINE_CACHE).then((c) =>
        c.put(new Request('/_offline'), new Response(OFFLINE_HTML, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }))
      ),
      // Prefetch key API routes
      caches.open(API_CACHE).then(async (cache) => {
        for (const url of PREFETCH_URLS) {
          try {
            const res = await fetch(url);
            if (res.ok) {
              const headers = new Headers(res.headers);
              headers.set('sw-cached-at', Date.now().toString());
              const timed = new Response(res.body, {
                status: res.status,
                statusText: res.statusText,
                headers,
              });
              await cache.put(new Request(url), timed);
            }
          } catch (e) { /* skip on error */ }
        }
      }),
    ])
  );
  self.skipWaiting();
});

// ── Activate ──

self.addEventListener('activate', (event) => {
  const VALID = [STATIC_CACHE, IMAGE_CACHE, API_CACHE, OFFLINE_CACHE];
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names.filter((n) => !VALID.includes(n)).map((n) => caches.delete(n))
      ))
      .then(() => {
        // Enable navigation preload if available
        if (self.registration.navigationPreload) {
          return self.registration.navigationPreload.enable();
        }
      })
      .then(() => self.clients.claim())
  );
});

// ── Fetch ──

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = event.request.url;

  if (matchesAny(url, NEVER_CACHE)) return;

  // 1. Video files — network-only with range support (no caching, too large)
  if (VIDEO_PATTERN.test(url)) {
    return; // let browser handle natively (supports range requests)
  }

  // 2. Static assets — cache-first
  if (matchesAny(url, STATIC_PATTERNS)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((res) => {
          if (res && res.status === 200 && res.type !== 'opaque') {
            const clone = res.clone();
            caches.open(STATIC_CACHE).then((c) => {
              c.put(event.request, clone);
              trimCache(STATIC_CACHE, STATIC_CACHE_MAX);
            });
          }
          return res;
        }).catch(() => cached || new Response('', { status: 503 }));
      })
    );
    return;
  }

  // 3. External images (AI-generated, CDN) — cache-first with dedicated cache
  if (matchesAny(url, EXTERNAL_IMAGE_PATTERNS)) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) return cached;
        try {
          const res = await fetch(event.request);
          if (res && res.status === 200) {
            cache.put(event.request, res.clone());
            trimCache(IMAGE_CACHE, IMAGE_CACHE_MAX);
          }
          return res;
        } catch (e) {
          return cached || new Response('', { status: 503 });
        }
      })
    );
    return;
  }

  // 4. Critical CMS — network-first with cache fallback
  if (matchesAny(url, NETWORK_FIRST_PATTERNS)) {
    event.respondWith(
      (async () => {
        // Use navigation preload response if available
        const preloadResponse = event.preloadResponse ? await event.preloadResponse : null;
        if (preloadResponse) return preloadResponse;

        try {
          const res = await fetch(event.request);
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(API_CACHE).then((c) => c.put(event.request, clone));
          }
          return res;
        } catch (e) {
          const cached = await caches.match(event.request);
          return cached || new Response(JSON.stringify({ error: 'offline' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      })()
    );
    return;
  }

  // 5. Regular API — stale-while-revalidate with TTL
  if (matchesAny(url, SWR_CACHE_PATTERNS)) {
    event.respondWith(
      caches.open(API_CACHE).then(async (cache) => {
        const cached = await cache.match(event.request);

        const fetchAndCache = fetch(event.request)
          .then((res) => {
            if (res && res.status === 200) {
              const headers = new Headers(res.headers);
              headers.set('sw-cached-at', Date.now().toString());
              const timed = new Response(res.clone().body, {
                status: res.status,
                statusText: res.statusText,
                headers,
              });
              cache.put(event.request, timed);
              trimCache(API_CACHE, API_CACHE_MAX);
            }
            return res.clone();
          })
          .catch(() => null);

        if (cached) {
          const cachedAt = parseInt(cached.headers.get('sw-cached-at') || '0');
          if (Date.now() - cachedAt < API_MAX_AGE_MS) {
            fetchAndCache; // background revalidate
            return cached;
          }
        }

        const fresh = await fetchAndCache;
        if (fresh) return fresh;
        if (cached) return cached; // stale fallback
        return new Response(JSON.stringify({ error: 'offline' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        });
      })
    );
    return;
  }

  // 6. HTML navigation — network-first with preload + offline fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = event.preloadResponse ? await event.preloadResponse : null;
          return preloadResponse || await fetch(event.request);
        } catch (e) {
          const offline = await caches.match('/_offline');
          return offline || new Response('Offline', { status: 503 });
        }
      })()
    );
    return;
  }
});

// ── Periodic cleanup via message ──

self.addEventListener('message', (event) => {
  const { data } = event;
  if (data === 'skipWaiting') self.skipWaiting();
  if (data === 'clearCache') {
    Promise.all([
      caches.delete(STATIC_CACHE),
      caches.delete(IMAGE_CACHE),
      caches.delete(API_CACHE),
    ]);
  }
  if (data === 'clearAPICache') caches.delete(API_CACHE);
  if (data === 'cleanStale') cleanStaleAPI();
  if (data === 'getVersion') {
    event.source.postMessage({ type: 'version', version: SW_VERSION });
  }
});

// ── Periodic background cleanup ──

let lastCleanup = 0;
self.addEventListener('fetch', () => {
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL_MS) {
    lastCleanup = now;
    cleanStaleAPI();
  }
});

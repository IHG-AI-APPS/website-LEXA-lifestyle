// LEXA Service Worker v3 — Enhanced Caching Strategy
// Cache-first for static assets, stale-while-revalidate for API, offline fallback

const STATIC_CACHE = 'lexa-static-v3';
const API_CACHE = 'lexa-api-v1';
const API_MAX_AGE_MS = 5 * 60 * 1000; // 5 minutes TTL for API cache

// Patterns to cache on fetch (static assets)
const STATIC_PATTERNS = [
  /\/_next\/static\/.*/,        // Next.js hashed chunks (immutable)
  /\/_next\/image\?.*/,         // Next.js optimized images
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

// API patterns to cache with stale-while-revalidate
const API_CACHE_PATTERNS = [
  /\/api\/solutions/,
  /\/api\/projects/,
  /\/api\/articles/,
  /\/api\/services/,
  /\/api\/brands/,
  /\/api\/packages/,
  /\/api\/testimonials/,
  /\/api\/locations/,
  /\/api\/settings/,
];

// Never cache these
const NEVER_CACHE = [
  /\/api\/admin/,
  /\/api\/auth/,
  /\/api\/bookings/,
  /\/api\/submissions/,
  /\/api\/analytics/,
  /\/api\/clear-cache/,
  /google-analytics/,
  /googletagmanager/,
  /facebook/,
  /hotjar/,
  /interakt/,
];

function shouldCacheStatic(url) {
  const urlStr = url.toString();
  for (const p of NEVER_CACHE) { if (p.test(urlStr)) return false; }
  for (const p of STATIC_PATTERNS) { if (p.test(urlStr)) return true; }
  return false;
}

function shouldCacheAPI(url) {
  const urlStr = url.toString();
  for (const p of NEVER_CACHE) { if (p.test(urlStr)) return false; }
  for (const p of API_CACHE_PATTERNS) { if (p.test(urlStr)) return true; }
  return false;
}

// Install — activate immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate — clean old caches, claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((n) => n !== STATIC_CACHE && n !== API_CACHE)
          .map((n) => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch handler
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = event.request.url;

  // 1. Static assets — cache-first (immutable hashed files)
  if (shouldCacheStatic(url)) {
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

  // 2. API data — stale-while-revalidate with TTL
  if (shouldCacheAPI(url)) {
    event.respondWith(
      caches.open(API_CACHE).then(async (cache) => {
        const cached = await cache.match(event.request);

        const fetchPromise = fetch(event.request).then((res) => {
          if (res && res.status === 200) {
            // Store with timestamp header for TTL check
            const headers = new Headers(res.headers);
            headers.set('sw-cached-at', Date.now().toString());
            const body = res.clone().body;
            const timedResponse = new Response(body, {
              status: res.status,
              statusText: res.statusText,
              headers: headers,
            });
            cache.put(event.request, timedResponse);
          }
          return res.clone();
        }).catch(() => null);

        // If cached and not expired, return immediately
        if (cached) {
          const cachedAt = parseInt(cached.headers.get('sw-cached-at') || '0');
          const age = Date.now() - cachedAt;
          if (age < API_MAX_AGE_MS) {
            // Fresh enough — return cached, update in background
            fetchPromise; // fire-and-forget background update
            return cached;
          }
        }

        // No valid cache — wait for network
        const networkResponse = await fetchPromise;
        if (networkResponse) return networkResponse;
        // Network failed, return stale cache as fallback
        if (cached) return cached;
        return new Response(JSON.stringify({ error: 'offline' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        });
      })
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

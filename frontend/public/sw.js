// LEXA Service Worker — Static Asset Cache
// Caches CSS, JS, fonts, and images to eliminate 429 rate limiting on repeat visits

const CACHE_NAME = 'lexa-static-v2';

// Patterns to cache on fetch
const CACHEABLE_PATTERNS = [
  /\/_next\/static\/.*/,        // Next.js static chunks (JS, CSS)
  /\/_next\/image\?.*/,         // Next.js optimized images
  /\.woff2$/,                    // Web fonts
  /\.woff$/,
  /\.css$/,
];

// Patterns to NEVER cache
const NEVER_CACHE = [
  /\/api\//,                     // API calls
  /\/_next\/data\//,            // Next.js data fetches (dynamic)
  /google-analytics/,
  /googletagmanager/,
  /facebook/,
  /hotjar/,
];

function shouldCache(url) {
  const urlStr = url.toString();
  for (const pattern of NEVER_CACHE) {
    if (pattern.test(urlStr)) return false;
  }
  for (const pattern of CACHEABLE_PATTERNS) {
    if (pattern.test(urlStr)) return true;
  }
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
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — cache-first for hashed static files, stale-while-revalidate for others
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!shouldCache(event.request.url)) return;

  // Next.js hashed static files are immutable — cache-first
  if (event.request.url.includes('/_next/static/')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
          }
          return res;
        }).catch(() => cached || new Response('', { status: 503 }));
      })
    );
    return;
  }

  // Other cacheable — stale-while-revalidate
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fresh = fetch(event.request).then((res) => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || fresh;
    })
  );
});

// Message handler for cache control
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
  if (event.data === 'clearCache') caches.delete(CACHE_NAME);
});

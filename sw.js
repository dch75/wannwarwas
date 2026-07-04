const CACHE = 'wann-war-was-v6';
const FILES = [
  './',
  './index.html',
  './manifest.json',
  './categories/geschichte.js',
  './categories/philosophie.js',
  './categories/erfindungen.js',
  './categories/musik.js',
  './categories/sport.js',
  './categories/film.js',
  // Lokale Schriftarten
  './fonts/fonts.css',
  './fonts/playfair-display-latin-400-normal.woff2',
  './fonts/playfair-display-latin-ext-400-normal.woff2',
  './fonts/playfair-display-latin-400-italic.woff2',
  './fonts/playfair-display-latin-ext-400-italic.woff2',
  './fonts/playfair-display-latin-700-normal.woff2',
  './fonts/playfair-display-latin-ext-700-normal.woff2',
  './fonts/playfair-display-latin-900-normal.woff2',
  './fonts/playfair-display-latin-ext-900-normal.woff2',
  './fonts/cormorant-garamond-latin-400-normal.woff2',
  './fonts/cormorant-garamond-latin-ext-400-normal.woff2',
  './fonts/cormorant-garamond-latin-400-italic.woff2',
  './fonts/cormorant-garamond-latin-ext-400-italic.woff2',
  './fonts/cormorant-garamond-latin-500-normal.woff2',
  './fonts/cormorant-garamond-latin-ext-500-normal.woff2',
  './fonts/cormorant-garamond-latin-600-normal.woff2',
  './fonts/cormorant-garamond-latin-ext-600-normal.woff2',
  './fonts/dm-mono-latin-400-normal.woff2',
  './fonts/dm-mono-latin-ext-400-normal.woff2',
  './fonts/dm-mono-latin-500-normal.woff2',
  './fonts/dm-mono-latin-ext-500-normal.woff2',
];

// Install: alle Dateien vorab in den Cache laden
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
});

// Activate: alte Caches loeschen, dann Kontrolle uebernehmen
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Message: index.html schickt SKIP_WAITING wenn User auf Banner tippt
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// Fetch-Strategie:
// - HTML / Navigation: Network First (damit Updates schnell sichtbar werden)
// - Alles andere (statisch: JS, CSS, Fonts, Kategorien): Cache First mit
//   Stale-While-Revalidate (schnelle Auslieferung aus Cache, parallele Aktualisierung).
// Nur Same-Origin wird gecacht.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin) return;

  const isHTML = e.request.mode === 'navigate' ||
                 (e.request.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    // Network First fuer HTML
    e.respondWith(
      fetch(e.request)
        .then(resp => {
          if (resp && resp.status === 200 && resp.type === 'basic') {
            const clone = resp.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return resp;
        })
        .catch(() => caches.match(e.request).then(c => c || caches.match('./index.html')))
    );
    return;
  }

  // Cache First + Stale-While-Revalidate fuer statische Assets
  e.respondWith(
    caches.match(e.request).then(cached => {
      const networkFetch = fetch(e.request).then(resp => {
        if (resp && resp.status === 200 && resp.type === 'basic') {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => cached);
      return cached || networkFetch;
    })
  );
});

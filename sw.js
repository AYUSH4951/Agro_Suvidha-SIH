// Define a name for the cache
const CACHE_NAME = 'agro-suvidha-cache-v1';

// List all the files and assets to cache.
// IMPORTANT: Make sure to include your new offline.html page!
const assetsToCache = [
  '/',
  'index.html',
  'about_us.html',
  'AI_assistant.html',
  'soil_health.html',
  'solution.html',
  'mandiprice.html',
  'index2.html',
  'index3.html',
  'index4.html',
  'index5.html',
  'index6.html',
  'index7.html',
  'offline.html', // <-- Don't forget this!
  'style.css',
  'i18n.js',
  'translations.json',
  'leaf img.png',
  'icons/icon-72x72.png',
  'icons/icon-192x192.png',
  'icons/icon-512x512.png',
  'icons/icon-maskable-192x192.png'
];

// 1. Install Event: Cache the app shell
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching App Shell');
        return cache.addAll(assetsToCache);
      })
  );
});

// 2. Activate Event: Clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. Fetch Event: Serve from cache on network failure, with offline fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the item is in the cache, return it. Otherwise, try fetching from the network.
        return response || fetch(event.request);
      })
      .catch(() => {
        // If both the cache and network fail, show the custom offline page.
        return caches.match('offline.html');
      })
  );
});
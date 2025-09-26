// Define a name for the cache
const CACHE_NAME = 'agro-suvidha-cache-v1';

// List all the files and assets to cache.
// I've added all the files from your project structure.
const assetsToCache = [
  '/',
  'index.html',
  'about_us.html',
  'AI_assistant.html',
  'soil_health.html',
  'solution.html',
  'mandiprice.html',
  'ProfileSetting.html', // <-- Added
  'index2.html',
  'index3.html',
  'index4.html',
  'index5.html',
  'index6.html',
  'index7.html',
  'offline.html',
  // 'style.css', // <-- Make sure you have this file, or remove this line
  'i18n.js',
  'manifest.json', // <-- Added
  'translations.json',
  'leaf img.png',
  'leaflogo.png', // <-- Added
  'img4-removebg-preview.png', // <-- Added
  'icons/icon-72x72.png',
  'icons/icon-192x192.png',
  'icons/icon-256x256.png', // <-- Added
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
      .catch(error => {
        console.error('Failed to cache assets during install:', error);
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
  // We only want to handle navigation requests for the offline fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // If the network fails, serve the offline page from the cache
          return caches.match('offline.html');
        })
    );
  } else {
    // For all other requests (CSS, JS, images), use a cache-first strategy
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // If the item is in the cache, return it. Otherwise, fetch from the network.
          return response || fetch(event.request);
        })
    );
  }
});

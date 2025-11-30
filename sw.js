// Service Worker for Low Waist Jeans Landing Page
const CACHE_NAME = 'low-waist-jeans-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/images/product/product-01.jpeg',
  '/images/product/product-02.jpeg',
  '/images/product/product-03.jpeg',
  '/images/product/product-04.jpeg',
  '/images/product/product-05.jpeg'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Cache failed:', err))
  );
  self.skipWaiting();
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip API calls
  if (event.request.url.includes('simpleswap') ||
      event.request.url.includes('analytics') ||
      event.request.url.includes('tiktok')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response
        const responseToCache = response.clone();

        // Cache successful responses
        if (response.status === 200) {
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseToCache));
        }

        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

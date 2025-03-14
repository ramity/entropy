self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('symfony-pwa-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/offline',
                // '/build/app.css',
                // '/build/app.js',
                '/favicon.ico',
                '/icons/entropy-logo-square-192x192.png',
                '/icons/entropy-logo-square-256x256.png'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : {};
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/icon.png'
    });
});

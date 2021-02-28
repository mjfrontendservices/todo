let cached_version = 'version 1';

self.addEventListener('install', function (event) {
    console.log('Service Worker Installed');
})

// activate event
self.addEventListener('activate', function (event) {
    console.log('Service Worker Activated');
    event.waitUntil(
        caches.keys().then(cachedVersions => {
            return Promise.all(
                cachedVersions.map(cache => {
                    if (cache !== cached_version) {
                        console.log('Service worker clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', function (event) {
    console.log('Service worker fetching')
    event.respondWith(
        fetch(event.request).then(res => {
            let resClone = res.clone();
            caches.open(cached_version).then(cache => {
                cache.put(event.request, resClone);
            });
            return res;
        }).catch(err => caches.match(event.request).then(res => res))
    );
});
const CACHE_NAME = "ndzeux-v.0.0.1";
const CACHE_NAME_DYNAMIC = "ndzeux-v.0.0.1-d";
const assets = [
    '/',
    '/index.html',
    '/build/bundle.css',
    '/build/main.js',
    '/build/main2.js',
    '/src/logo/96.png',
    '/src/logo/192.png',
    '/src/logo/512.png',
    '/src/photo/avatar.svg',
    '/manifest.json',
];

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== CACHE_NAME && key !== CACHE_NAME_DYNAMIC)
                .map(key => caches.delete(key))
            )
        })
    )
});

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(res => {
                return caches.open(CACHE_NAME_DYNAMIC).then(cache => {
                    cache.put(evt.request.url, res.clone());
                    return res;
                })
            })
        }).catch(async() => {
            //
            // if(evt.request.url.indexOf(".") == -1){
                return caches.match("/index.html");
            // }
        })
    )
})
const staticCacheName = 'site-static-v3';
const dynamicCacheName = 'site-dinamic-v1';
const assets = [
    "/",
    "/index.html",
    "/js/app.js",
    "/js/ui.js",
    "/js/materialize.min.js",
    "/css/materialize.min.css",
    "/css/styles.css",
    "/img/dish.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons"
]
// service worker se instala cada vez que cambia este archivo
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('Cache assets')
            cache.addAll(assets)
        })
    )
});

// activate event service worker
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
})

self.addEventListener('fetch', evt => {
    console.log('fetch event', evt)
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            // Si lo encuentra en cache devuelva cacheRes sino
            // llamara a la solicitud original
            return cacheRes || fetch(evt.request).then(fetchRes => {
                // Guardar en cache
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone())
                    return fetchRes
                })
            })
        })
    )
})
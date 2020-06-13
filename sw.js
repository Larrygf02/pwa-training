const staticCacheName = 'site-static';
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
    console.log('service worker has been activated')
})

self.addEventListener('fetch', evt => {
    console.log('fetch event', evt)
})
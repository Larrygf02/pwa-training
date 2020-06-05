// service worker se instala cada vez que cambia este archivo
self.addEventListener('install', evt => {
    console.log('Service worker has been installed')
});

// activate event service worker
self.addEventListener('activate', evt => {
    console.log('service worker has been activated')
})

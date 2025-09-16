const CACHE_NAME = 'clientes-xd-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
  // Si tuvieras un archivo CSS o JS separado, también lo agregarías aquí.
];

// Evento de instalación: se cachean los archivos principales.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento fetch: responde con los archivos desde el caché si están disponibles.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el archivo está en caché, lo devuelve. Si no, lo busca en la red.
        return response || fetch(event.request);
      })
  );
});

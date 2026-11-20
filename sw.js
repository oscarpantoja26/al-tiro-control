// Al Tiro Control v6: SIN caché.
// El caché del service worker dejaba la app atorada en el logo una y otra vez
// (17-nov, 18-nov y 20-nov). Ahora la app siempre carga fresca desde internet
// y al activarse este worker borra todos los cachés viejos del teléfono.
// Sin fetch handler: nada se guarda en caché, todo va directo a internet.
self.addEventListener('install', (e) => {
  e.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

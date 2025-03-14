// Push notification event (already present)
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : { title: "Default Title", body: "Default Body" };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/images/bell.png", // Ensure the correct path inside `public/`
    })
  );
});

// Install event - Cache essential files for offline access
self.addEventListener("install", (event) => {
  event.waitUntil(
      caches.open("static-cache").then((cache) => {
          return cache.addAll([
              "/", // Cache homepage
              "/manifest.json",
              "/images/bell.png", // Cache notification icon
              "/styles/global.css", // Adjust based on your styles
          ]);
      })
  );
  self.skipWaiting();
});

// Activate event - Cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
      caches.keys().then((cacheNames) => {
          return Promise.all(
              cacheNames.map((cache) => {
                  if (cache !== "static-cache") {
                      return caches.delete(cache);
                  }
              })
          );
      })
  );
});

// Fetch event - Serve cached files when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
      fetch(event.request).catch(() => {
          return caches.match(event.request);
      })
  );
});

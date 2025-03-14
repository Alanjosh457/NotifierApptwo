self.addEventListener("push", (event) => {
    const data = event.data ? event.data.json() : { title: "Default Title", body: "Default Body" };
  
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: "../images/bell.png", // Adjust to your bell icon path in `public/`
      })
    );
  });
  
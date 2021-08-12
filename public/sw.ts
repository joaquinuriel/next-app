/// <reference lib="webworker" />

export namespace serviceWorker {
  declare var self: ServiceWorkerGlobalScope;
  declare var navigator: WorkerNavigator;
  interface WorkerNavigator {
    connection: {
      effectiveType: string;
    };
  }

  self.oninstall = () => self.skipWaiting();
  self.onactivate = (e) => e.waitUntil(self.clients.claim());

  const require = async (request: Request) => {
    let response = await fetch(request);
    let cache = await caches.open("stale");
    cache.put(request, response.clone());
    return response;
  };

  self.onfetch = (event) => {
    let { request, respondWith } = event;
    let { match } = caches;
    console.log(request.url, self.location.href);
    // if (request.url === self.location.href)
    if (request.method !== "GET") return;
    if (!request.url.includes("http")) return;
    event.waitUntil(async () => {
      return request.url.includes("api")
        ? respondWith(fetch(request))
        : navigator.connection.effectiveType === "4g"
        ? respondWith((await require(request)) || match(request))
        : respondWith((await match(request)) || require(request));
    });
  };

  self.registration.pushManager.getSubscription().then((value) => {
    value ? console.log(value) : self.registration.pushManager.subscribe();
  });
}
//   const push = async (request: Request) => {
//     console.log("Received a push request", request);
//     const { title, body, icon } = await request.json();
//     const tag = "simple-push-demo-notification-tag";
//     self.registration.showNotification(title, { body, icon, tag });
//   };

//   self.onpush = (event) => {
//     const callback = (event: PushEvent) => {
//       console.log("Received a push message", event);

//       var title = "Yay a message.";
//       var body = "We have received a push message.";
//       var icon = "/192px.png";
//       var tag = "simple-push-demo-notification-tag";

//       event.waitUntil(
//         self.registration.showNotification(title, { body, icon, tag })
//       );
//     };

//     Notification.permission === "granted"
//       ? callback(event)
//       : Notification.requestPermission().then((permission) => {
//           permission === "granted" && callback(event);
//         });
//   };

// self.onpus

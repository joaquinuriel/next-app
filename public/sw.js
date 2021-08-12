self.oninstall = () => self.skipWaiting();
self.onactivate = (e) => e.waitUntil(self.clients.claim());

const require = async (request) => {
  let response = await fetch(request);
  let cache = await caches.open("stale");
  cache.put(request, response.clone());
  return response;
};

self.onfetch = (event) => {
  let { request, respondWith } = event;
  let { match } = caches;
  if (request.method !== "GET" && request.url.endsWith("push"))
    return void push(request);
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

// self.registration.pushManager.subscribe().then(console.log);

// const push = async (request) => {
//   console.log("Received a push request", request);
//   const { title, body, icon } = await request.json();
//   const tag = "simple-push-demo-notification-tag";
//   self.registration.showNotification(title, { body, icon });
// };

// self.onpush = (event) => {
//   const push = (event) => {
//     console.log("Received a push message", event);

//     var title = "Yay a message.";
//     var body = "We have received a push message.";
//     var icon = "/192px.png";
//     var tag = "simple-push-demo-notification-tag";

//     event.waitUntil(
//       self.registration.showNotification(title, { body, icon, tag })
//     );
//   };

//   Notification.permission === "granted"
//     ? push(event)
//     : Notification.requestPermission().then((permission) => {
//         permission === "granted" && push(event);
//       });
// };

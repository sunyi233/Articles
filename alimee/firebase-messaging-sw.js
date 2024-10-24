self.addEventListener('push', (Event) => {const ThePush = Event.data.json().notification; Event.waitUntil(self.registration.showNotification(ThePush.title, {body: ThePush.body}));});















































/*

self.addEventListener('push', (Event) => {





	const data = Event.data.json(); // Assume the push event contains some JSON data

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientsList => {
            clientsList.forEach(client => {





				console.log('aergaerga');





                client.postMessage({
                    title: data.title,
                    body: data.body
                });



            });
        })
    );






	const data = Event.data.json(); // Assume your push notification contains some JSON data




    // Create a new BroadcastChannel
    const broadcast = new BroadcastChannel('push-channel');
    
    // Send the data to the channel
    broadcast.postMessage({
        title: data.title,
        body: data.body
    });

	*/

	//(new BroadcastChannel('Alimee')).postMessage('Pushed...');




	//(new BroadcastChannel('Alimee')).postMessage('Pushed');




	/*


    Event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
          clientList.forEach(client => {
            client.postMessage({
              msg: "Hello from Service Worker!",
              url: event.request.url
            });
          });
        })
      );
  
  



    const ThePush = Event.data.json().notification;
    Event.waitUntil(self.registration.showNotification(ThePush.title, {body: ThePush.body}));


	
	
});

*/























/*

self.addEventListener('install', (Event) => {



//(new BroadcastChannel('Alimee')).postMessage('Installed');


});



// Example of sending a message to all clients
self.addEventListener('fetch', (event) => {




    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
        clientList.forEach(client => {
          client.postMessage({
            msg: "Hello from Service Worker!",
            url: event.request.url
          });
        });
      })
    );



  });




self.addEventListener("notificationclick", (event) =>
    {




		(new BroadcastChannel('Alimee')).postMessage('notificationclick');





        self.clients.matchAll().then(function(clients) {
            clients.forEach(function(client) {
              client.postMessage('This is a message from the service worker!');
            });
          });
        

        event.notification.close();

        const page_parms = event.notification.data.use_to_open_specific_page;

        event.waitUntil(
            clients.openWindow('/test.html') // The PWA route you want to open
        );


        


    }


);




*/




/*



// This code executes in its own worker or thread
self.addEventListener("install", event => {



    console.log("Service worker installed");
 });
 self.addEventListener("activate", event => {
    console.log("Service worker activated");
 });


self.addEventListener('activate', (Event) => {


    console.log('ergerasgewarg');




});

*/

/*




// This code executes in its own worker or thread
self.addEventListener("install", event => {
   console.log("Service worker installed");
});
self.addEventListener("activate", event => {
   console.log("Service worker activated");
});




self.addEventListener('push', function(event) {
  self.clients.matchAll().then(function(clients) {
    clients.forEach(function(client) {
      client.postMessage('This is a message from the service worker!');
    });
  });
});




// serviceWorker.js
self.addEventListener("notificationclick", (event) =>
    {
        event.notification.close();

        const page_parms = event.notification.data.use_to_open_specific_page;

        event.waitUntil(
            clients.openWindow('/test.html') // The PWA route you want to open
        );


    }


);


*/
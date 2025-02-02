self.onmessage = (Event) => {self.registration.showNotification('', {body:Event.data});};

self.onpush = (Event) => {self.registration.showNotification('', {body:Event.data});};









































/*

self.addEventListener('push', (event) => {
    const options = {
      body: 'This is a push notification!',
      icon: '/icon.png',
      badge: '/badge.png'
    };
  
    event.waitUntil(
      self.registration.showNotification('Hello!', options)
    );
  });



  
  
  self.addEventListener('message', (Event) => {





    Event.source.postMessage("Hi client");


    console.log(Event.data);









    if (event.data && event.data.type == 'SHOW_NOTIFICATION')
    {
        const options = {body: '달러나우 알림', icon: '/contents/assets/icon.png', badge: '/contents/assets/icon.png'};
        self.registration.showNotification('달러나우', options);
    }


    
    
});
*/
self.addEventListener('push', (Event) => {ThePush = Event.data.json().notification; Event.waitUntil(self.registration.showNotification(ThePush.title, {body: ThePush.body}));});


























/*


self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim()); // Become available to all pages
});


    const Body = JSON.stringify({'message': {'token': PostedBody['DeviceToken'], 'notification': {'title': PostedBody['Title'], 'body': PostedBody['Body']}}});




    {message: {notification: {title: '111', body: '222'}}}




    {"message": {"notification": {"title": "111", "body": "222"}}}


    
    
    self.addEventListener('message', (Event) => {
        
        
        
        
        console.log(Event);
        
        
        
        
        //alert(JSON.stringify(Event.data));
        
        
        
        
        
        
        //self.registration.showNotification('', {body: JSON.stringify(Event.data)});
        
        //self.registration.showNotification(Event.data.Title, {body: Event.data.Body});
        
        
        
        
        self.addEventListener("message", function (event) {
            console.log(event.data);
        });
        
        
        
        
    });
    
    
    
    
    
*/
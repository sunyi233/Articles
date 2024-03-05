self.addEventListener('push', (Event) => {ThePush = Event.data.json().notification; Event.waitUntil(self.registration.showNotification(ThePush.title, {body: ThePush.body}));});





/*



self.addEventListener('message', (Event) => {
	
	
	

	//alert(JSON.stringify(Event));


	//self.registration.showNotification('', {body: JSON.stringify(Event.data)});
	
	//self.registration.showNotification(Event.data.Title, {body: Event.data.Body});





});







// {body: ThePush.body, icon: ThePush.icon, data: ThePush.click_action}


*/
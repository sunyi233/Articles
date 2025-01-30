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
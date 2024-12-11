self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type == 'SHOW_NOTIFICATION')
    {
        const options = {body: '달러나우 알림', icon: '/contents/assets/icon.png', badge: '/contents/assets/icon.png'};
        self.registration.showNotification('달러나우', options);
    }
});
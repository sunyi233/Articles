// export function
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function Start()
{
    // check if not pwa
    if (window.matchMedia('(display-mode: standalone)').matches == false)
    {
        // 카톡 내부 브라우저 아 정말~~~
        if (navigator.userAgent.indexOf('KAKAO') >= 0) {location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(location); return;}

        // show landing
        FillTheBody('landing');
        return;
    }

    // check if notification not granted: the permission cannot be denied I think it's a bug
    if (Notification.permission != 'granted') {FillTheBody('notification'); return;}

    FillTheBody('main');
}

// functions
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import {getMessaging, getToken} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging.js';

async function FillTheBody(ContentName)
{
    window.document.body.innerHTML = await (await fetch('/contents/' + ContentName + '.html')).text();

    switch(ContentName)
    {
        case 'landing':
            if (/iP(ad|od|hone)/i.test(navigator.userAgent) == true && !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) == true)
                document.getElementById('iphone_install').style.display = '';
            else
                document.getElementById('android_install').style.display = '';
            break;
        case 'notification':
            switch(Notification.permission) // granted case does not come to here
            {
                case 'default':
                    document.getElementById('default').style.display = '';

                    // button
                    const button_notification_allow = async () =>
                    {
                        Notification.requestPermission().then(() =>
                        {
                            // chnage UI
                            document.getElementById('button_notification_allow').style.display = 'none';
                            document.getElementById('device_token').style.display = '';

                            // save DeviceToken
                            const FirebaseConfig = {apiKey: "AIzaSyDqWIWW85aAx-QoDYxXcwK8QNS8CLysSP0", authDomain: "alimee-64ad2.firebaseapp.com", projectId: "alimee-64ad2", storageBucket: "alimee-64ad2.appspot.com", messagingSenderId: "891772721270", appId: "1:891772721270:web:a141bccdccb60d96402757", measurementId: "G-PT9WJJT2WW"};
                            const VapidKey = 'BFh6a-mdfpOpEiE541vtzXJaQpSLPzZwfotUWZE8Mc_gjvJzkul0X6FImU_Fimc7RyFfeZd0kCVZiEKyRwHzTKk'; // from Web Push certificates -> Key pair
                            getToken(getMessaging(initializeApp(FirebaseConfig)), {vapidKey: VapidKey}).then((DeviceToken) => {localStorage.setItem('DeviceToken', DeviceToken); location.reload();})
                        });
                    };
                    document.getElementById('button_notification_allow').addEventListener('click', button_notification_allow);
                    break;
                case 'denied':
                    document.getElementById('denied').style.display = '';
                    break;
            }
            break;
        case 'main':
            document.getElementById('device_token').innerText = localStorage.getItem('DeviceToken');
            break;
    }
}
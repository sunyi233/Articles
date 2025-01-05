// export function
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function Start()
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

    // check if no mobile number
    if (localStorage.getItem('Email') == null) {FillTheBody('pairing'); return;}
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
            {
                document.getElementById('iphone_install').style.display = '';
            }
            else
            {




            }
            break;
        case 'notification':
            switch(Notification.permission) // granted case does not come to here
            {
                case 'default':
                    document.getElementById('denied').style.display = 'none';
                    document.getElementById('button_notification_allow').addEventListener('click', () => {Notification.requestPermission().then(() => {location.reload();});});
                    break;

                case 'denied':
                    document.getElementById('default').style.display = 'none';
                    document.getElementById('denied').style.display = '';
                    break;
            }
            break;
        case 'pairing':
            // login button
            const LoginButton = document.getElementById("login_button");
            LoginButton.style.display = "none";

            google.accounts.id.initialize({auto_select: true, callback: (Result) => {Pair(Result.credential);}, client_id: '937269660039-qieb5926a867a8dhcl1p4r35m69308nj.apps.googleusercontent.com', itp_support: true});
            google.accounts.id.renderButton(LoginButton, {locale: 'ko_KR', logo_alignment: 'center', shape: 'square', size: 'large', text: 'continue_with', theme: 'filled_blue', type: 'standard'});

            // terms
            document.getElementById('terms').innerText = await (await fetch('/contents/_terms.txt')).text();
            document.getElementById('agreement_terms').addEventListener('click', () => {document.getElementById('agreement_terms').checked ? LoginButton.style.display = 'inline-block' : LoginButton.style.display = 'none';});

            // save DeviceToken
            const FirebaseConfig = {apiKey: "AIzaSyDW7xVeCbEG3q1ib9vpb1nJwzaLVujOfZg", authDomain: "purunbada-57817.firebaseapp.com", projectId: "purunbada-57817", storageBucket: "purunbada-57817.appspot.com", messagingSenderId: "937269660039", appId: "1:937269660039:web:585a8ef5e77b5ee3bf6b22", measurementId: "G-CC63K0K8CR"};
            const VapidKey = 'BGN75FEWvGqLI1iO3oH_NMePa17X713W_wXmjgeCXlyHEozfYKAuohq8Lv3FuIOX7rovxnC63CfdU-4pJUvUF4Y'; // from Web Push certificates -> Key pair
            const DeviceToken = await getToken(getMessaging(initializeApp(FirebaseConfig)), {vapidKey: VapidKey});

            localStorage.setItem('DeviceToken', DeviceToken);
            break;
    }
}

async function Pair(IDToken) // adding two infos to the app
{
    window.document.body.innerHTML = IDToken + '<br><br>' + localStorage.getItem('DeviceToken');


 



}
















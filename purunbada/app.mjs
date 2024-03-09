export async function Start()
{
    // check if not pwa
    if (window.matchMedia('(display-mode: standalone)').matches == false) {FillPageBody('landing'); return;}

    // check if notification not granted: the permission cannot be denied I think it's a bug
    if (Notification.permission != 'granted') {FillPageBody('notification'); return;}

    // check if no mobile number
    if (localStorage.getItem('Email') == null) {FillPageBody('pairing'); return;}






}

import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import {getMessaging, getToken} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging.js';

async function SaveDeviceToken()
{
    // check permission
    const Permission = await Notification.requestPermission();
    if (Permission != 'granted')
    {
        document.getElementById('default').style.display = 'none';
        document.getElementById('denied').style.display = '';

        return;
    }

    // Firebase
    const FirebaseConfig = {apiKey: "AIzaSyDW7xVeCbEG3q1ib9vpb1nJwzaLVujOfZg", authDomain: "purunbada-57817.firebaseapp.com", projectId: "purunbada-57817", storageBucket: "purunbada-57817.appspot.com", messagingSenderId: "937269660039", appId: "1:937269660039:web:585a8ef5e77b5ee3bf6b22", measurementId: "G-CC63K0K8CR"};
    const VapidKey = 'BGN75FEWvGqLI1iO3oH_NMePa17X713W_wXmjgeCXlyHEozfYKAuohq8Lv3FuIOX7rovxnC63CfdU-4pJUvUF4Y';
    const DeviceToken = await getToken(getMessaging(initializeApp(FirebaseConfig)), {vapidKey: VapidKey});

    localStorage.setItem('DeviceToken', DeviceToken);

    // refresh
    location.reload();
}

async function FillPageBody(ContentName)
{
    window.document.body.innerHTML = await (await fetch('/contents/' + ContentName + '.html')).text();

    switch(ContentName)
    {
        case 'notification':
            if (Notification.permission != 'default') return;

            document.getElementById('denied').style.display = 'none';
            document.getElementById('button_notification_allow').addEventListener('click', () => {SaveDeviceToken();});
            break;

        case 'pairing':
            // login
            const LoginButton = document.getElementById("login_button");
            LoginButton.style.display = "none";

            google.accounts.id.initialize({auto_select: true, callback: Result => {FinalizeLogin(Result.credential)}, client_id: '937269660039-qieb5926a867a8dhcl1p4r35m69308nj.apps.googleusercontent.com', itp_support: true});
            google.accounts.id.renderButton(LoginButton, {locale: 'ko_KR', logo_alignment: 'center', shape: 'square', size: 'large', text: 'continue_with', theme: 'filled_blue', type: 'standard'});

            // terms
            document.getElementById('terms').innerText = await (await fetch('/contents/_terms.txt')).text();
            document.getElementById('agreement_terms').addEventListener('click', () => {document.getElementById('agreement_terms').checked ? LoginButton.style.display = 'inline-block' : LoginButton.style.display = 'none';});
            break;
    }
}

async function FinalizeLogin(IDToken)
{
    alert(IDToken);
    alert(localStorage.getItem('DeviceToken'));









    // if (localStorage.getItem('Email') == null) {FillPageBody('pairing'); return;}

    



}
export async function Start()
{
    // check if not pwa
    if (window.matchMedia('(display-mode: standalone)').matches == false) {FillPageBody('landing'); return;}

    // check if notification not granted: the permission cannot be denied I think it's a bug
    if (Notification.permission != 'granted') {FillPageBody('notification'); return;}

    // check if no mobile number
    if (localStorage.getItem('MobileNumber') == null) {FillPageBody('pairing'); return;}
    


    
    
    
    
    



    
    
    
    
    

}

import {getAnalytics} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js';
import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import {getMessaging, getToken} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging.js';

async function FillPageBody(ContentName)
{
    window.document.body.innerHTML = await (await fetch('/contents/' + ContentName + '.html')).text();

    switch(ContentName)
    {
        case 'notification':
            if (Notification.permission != 'default') return;

            document.getElementById('denied').style.display = 'none';
            document.getElementById('button_notification_allow').addEventListener('click', (Event) => {Event.target.style.display = 'none'; ConfigNotification();});
            break;

        case 'pairing':
            // fill things
            document.getElementById('terms').innerText = await (await fetch('/contents/_terms.txt')).text();

            // Firebase
            const FirebaseConfig = {apiKey: "AIzaSyD3iHnDRANI2tlBdycNVA2ZtQ3XduF1GmY", authDomain: "shopreserve-4e2c0.firebaseapp.com", projectId: "shopreserve-4e2c0", storageBucket: "shopreserve-4e2c0.appspot.com", messagingSenderId: "711185990354", appId: "1:711185990354:web:7392e10536057ae721a30b", measurementId: "G-EH64FGZCGR"};
            getAnalytics(initializeApp(FirebaseConfig));

            window.RecaptchaVerifier = new RecaptchaVerifier('recaptcha_container', {'size': 'invisible'}, getAuth());

            const VapidKey = 'BGRAUjZpuuJ-3SRQsYAwCk2J91aKvMQdWzboVeFKh9LMVnr61XvxjY3G0kKuqtJm4ChnRa9TYhekel3VEE1UADo';
            window.DeviceToken = await getToken(getMessaging(), {vapidKey: VapidKey, serviceWorkerRegistration: await navigator.serviceWorker.getRegistration()});

            // buttons
            document.getElementById('button_get_code').addEventListener('click', () => {
                const PartialMobileNumber = document.getElementById('partial_mobile_number').value.trim();
                if (PartialMobileNumber == '') return;

                signInWithPhoneNumber(getAuth(), '+8210' + PartialMobileNumber, window.RecaptchaVerifier).then((Result) => {window.ConfirmationResult = Result;}).catch(() => {return;});
            });

            document.getElementById('button_submit').addEventListener('click', () => {
                // check checkbox
                if (document.getElementById('agreement_terms').checked == false) {alert('이용 약관에 동의해 주세요.');return;}

                // check code
                if (window.ConfirmationResult == null) return;

                window.ConfirmationResult.confirm(document.getElementById('authentication_code').value).then((Result) => {FinishPairing(Result.user.accessToken, window.DeviceToken);}).catch(() => {alert('인증 번호를 확인해 주세요.');});
            });









            /*


            // fill things
            document.getElementById('terms').innerText = await (await fetch('/contents/_terms.txt')).text();
            //document.getElementById('pii').innerText = await (await fetch('/contents/_pii.txt')).text();

            // Firebase
            const FirebaseConfig = {apiKey: "AIzaSyD3iHnDRANI2tlBdycNVA2ZtQ3XduF1GmY", authDomain: "shopreserve-4e2c0.firebaseapp.com", projectId: "shopreserve-4e2c0", storageBucket: "shopreserve-4e2c0.appspot.com", messagingSenderId: "711185990354", appId: "1:711185990354:web:7392e10536057ae721a30b", measurementId: "G-EH64FGZCGR"};
            getAnalytics(initializeApp(FirebaseConfig));

            const TheAuth = getAuth();
            window.RecaptchaVerifier = new RecaptchaVerifier('recaptcha_container', {'size': 'invisible'}, TheAuth);

            const VapidKey = 'BGRAUjZpuuJ-3SRQsYAwCk2J91aKvMQdWzboVeFKh9LMVnr61XvxjY3G0kKuqtJm4ChnRa9TYhekel3VEE1UADo';
            const DeviceToken = await getToken(getMessaging(), {vapidKey: VapidKey, serviceWorkerRegistration: await navigator.serviceWorker.getRegistration()});

            // buttons
            //let ConfirmationResult = null;

            document.getElementById('button_get_code').addEventListener('click', () => {
                const PartialMobileNumber = document.getElementById('partial_mobile_number').value.trim();
                if (PartialMobileNumber == '') return;

                signInWithPhoneNumber(getAuth(), '+8210' + PartialMobileNumber, window.RecaptchaVerifier).then((Result) => {window.confirmationResult = Result;}).catch(() => {return;});
            });

            document.getElementById('button_submit').addEventListener('click', () => {
                // check checkbox
                if (document.getElementById('agreement_terms').checked == false) {alert('이용 약관에 동의해 주세요.');return;}

                // check code
                if (window.confirmationResult == null) return;

                window.confirmationResult.confirm(document.getElementById('authentication_code').value).then((Result) => {FinishPairing(Result.user.accessToken, DeviceToken);}).catch(() => {alert('인증 번호를 확인해 주세요.');});
            });




            */

            break;




    }
}

function FinishPairing(IDToken, DeviceToken)
{



    alert(IDToken);


    

    // check two checks


    // call api




    // FinishPairing(Result.user.accessToken, DeviceToken);

    
}

function ConfigNotification()
{
    Notification.requestPermission().then((Permission) => {
        if (Permission == 'granted')
        {
            // register service worker
            navigator.serviceWorker.register("/service_worker.js").then(() => {location.reload();});
        }
        else
        {
            document.getElementById('default').style.display = 'none';
            document.getElementById('denied').style.display = '';
        }
    });
}



































































        /*
        localStorage.setItem('DeviceToken', DeviceToken);
        
        navigator.serviceWorker.controller.postMessage({Title: '', Body: '222'});
        
        const Message = {};
        Message.Title = '111';
        Message.Body = '222';

        navigator.serviceWorker.controller.postMessage(Message);


                    (await navigator.serviceWorker.getRegistration()).active.postMessage({type: 'ShowNotification'});




        */


        /*


        // DeviceToken
        const VapidKey = 'BIrzKtY5_B5TnAdY7EYPuT9zhDaVYr-wL1LFnUnHEil6YDb09eeBazLVEi4Q5m_mKtLgDoRRbbTQnj5Fipigo30'; // should be updated!
        const ServiceWorkerRegistration = await navigator.serviceWorker.getRegistration();
        const DeviceToken = await getToken(getMessaging(), {vapidKey: VapidKey, serviceWorkerRegistration: ServiceWorkerRegistration});



   window.RecaptchaVerifier = new RecaptchaVerifier('recaptcha_container', {'size': 'invisible', 'callback': Response => {console.log(Response)}}, getAuth());


        */
    /*






            //alert(DeviceToken);


            //navigator.serviceWorker.controller.postMessage({Title: '111', Body: '222'});


            // if (localStorage.getItem('MobileNumber') == null) {FillPageBody('personalization'); return;}






    let ServiceWorkerRegistration = await navigator.serviceWorker.getRegistration();
    if (ServiceWorkerRegistration == undefined)
    {
        navigator.serviceWorker.register("/service_worker.js").then((NewRegistration) => ServiceWorkerRegistration = NewRegistration);
        await navigator.serviceWorker.ready;
    }



    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
    apiKey: "AIzaSyD3iHnDRANI2tlBdycNVA2ZtQ3XduF1GmY",
    authDomain: "shopreserve-4e2c0.firebaseapp.com",
    projectId: "shopreserve-4e2c0",
    storageBucket: "shopreserve-4e2c0.appspot.com",
    messagingSenderId: "711185990354",
    appId: "1:711185990354:web:7392e10536057ae721a30b",
    measurementId: "G-EH64FGZCGR"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);






    

   // Firebase - Firebase app is configured here to save time.
   const FirebaseConfig = {apiKey: "AIzaSyD1G10O_ixG0FPl2BfogevxMN6sOGQQEKE", authDomain: "yiyagi-7d08f.firebaseapp.com", projectId: "yiyagi-7d08f", storageBucket: "yiyagi-7d08f.appspot.com", messagingSenderId: "881032464694", appId: "1:881032464694:web:46472934920bfe6afc0b97", measurementId: "G-LJ3Y9X5HH1" };
   getAnalytics(initializeApp(FirebaseConfig));

   window.RecaptchaVerifier = new RecaptchaVerifier('recaptcha_container', {'size': 'invisible', 'callback': Response => {console.log(Response)}}, getAuth());



    // DeviceToken
    const VapidKey = 'BIrzKtY5_B5TnAdY7EYPuT9zhDaVYr-wL1LFnUnHEil6YDb09eeBazLVEi4Q5m_mKtLgDoRRbbTQnj5Fipigo30';
    const ServiceWorkerRegistration = await navigator.serviceWorker.getRegistration();
    const DeviceToken = await getToken(getMessaging(), {vapidKey: VapidKey, serviceWorkerRegistration: ServiceWorkerRegistration});



    localStorage.setItem('DeviceToken', DeviceToken);

   */
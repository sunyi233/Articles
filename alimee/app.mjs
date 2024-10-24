// export function
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function FillBody()
{
    // set ContentName
    let ContentName = '';
    if (window.matchMedia('(display-mode: standalone)').matches == true) // app
    {
        // check if notification not granted: the permission cannot be denied I think it's a bug
        if (Notification.permission != 'granted') ContentName = 'configuration'; else ContentName = 'main';

    }
    else // web for landing page
    {
        // 카톡 내부 브라우저 아 정말~~~
        if (navigator.userAgent.indexOf('KAKAO') >= 0) {location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(location); return;}

        // set ContentName
        ContentName = 'landing';
    }

    // insert content
    document.body.innerHTML = await (await fetch('/contents/' + ContentName + '.html')).text();
    window.ContentName = ContentName;
    
    // post production
    switch(ContentName)
    {
        case 'landing':
            // show guides
            if ((/iP(ad|od|hone)/i.test(navigator.userAgent) == true) && (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) == true))
                document.getElementById('iphone_install').style.display = '';
            else
                document.getElementById('android_install').style.display = '';

            break;
        case 'configuration':
            // denied
            if (Notification.permission == 'denied')
            {
                document.getElementById('denied').style.display = '';
                break;
            }

            // just default case for granted case does not come to here
            document.getElementById('default').style.display = '';

            // button
            const button_notification_allow = async () =>
            {
                Notification.requestPermission().then(() => // now changed to the granted case from default case
                {
                    // chnage UI
                    document.getElementById('button_notification_allow').style.display = 'none';
                    document.getElementById('device_token').style.display = '';

                    // set TheMessaging
                    const FirebaseConfig = {apiKey: "AIzaSyDqWIWW85aAx-QoDYxXcwK8QNS8CLysSP0", authDomain: "alimee-64ad2.firebaseapp.com", projectId: "alimee-64ad2", storageBucket: "alimee-64ad2.appspot.com", messagingSenderId: "891772721270", appId: "1:891772721270:web:a141bccdccb60d96402757", measurementId: "G-PT9WJJT2WW"};
                    const VapidKey = 'BFh6a-mdfpOpEiE541vtzXJaQpSLPzZwfotUWZE8Mc_gjvJzkul0X6FImU_Fimc7RyFfeZd0kCVZiEKyRwHzTKk'; // from Web Push certificates -> Key pair
                    const TheMessaging = getMessaging(initializeApp(FirebaseConfig));

                    // save DeviceToken
                    getToken(TheMessaging, {vapidKey: VapidKey}).then((DeviceToken) => {localStorage.setItem('DeviceToken', DeviceToken); location.reload();});
                });
            };
            document.getElementById('button_notification_allow').addEventListener('click', button_notification_allow);

            break;
        case 'main':
            const DeviceToken = localStorage.getItem('DeviceToken');

            document.getElementById('device_token').innerText = DeviceToken;

            const request_push = async () =>
            {
                navigator.clipboard.writeText(DeviceToken);

                //await GetAPIFunctionResult('SendPushNotification', null, DeviceToken);
            };
            document.getElementById('request_push').addEventListener('click', request_push);

            break;
    }
}

export async function UpdateMain()
{


    


    //window.document.body.innerHTML = '00000000';

    // document.body.innerHTML = Date.now().toString();



    



}

// functions
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import {getMessaging, getToken, onMessage} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging.js';





































/*


async function FillTheBody(ContentName)
{




// Create or connect to the BroadcastChannel
const broadcast = new BroadcastChannel('push-channel');

// Listen for messages from the service worker
broadcast.onmessage = function(event) {
    console.log('Received broadcast message:', event.data);
    // You can handle the data here (e.g., update the UI)



    window.document.body.innerHTML = event.data;




};




    console.log(ContentName);



    window.document.body.innerHTML = await (await fetch('/contents/' + ContentName + '.html')).text();

    switch(ContentName)
    {
        case 'landing':
            // show guides
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

                            // set TheMessaging
                            const FirebaseConfig = {apiKey: "AIzaSyDqWIWW85aAx-QoDYxXcwK8QNS8CLysSP0", authDomain: "alimee-64ad2.firebaseapp.com", projectId: "alimee-64ad2", storageBucket: "alimee-64ad2.appspot.com", messagingSenderId: "891772721270", appId: "1:891772721270:web:a141bccdccb60d96402757", measurementId: "G-PT9WJJT2WW"};
                            const VapidKey = 'BFh6a-mdfpOpEiE541vtzXJaQpSLPzZwfotUWZE8Mc_gjvJzkul0X6FImU_Fimc7RyFfeZd0kCVZiEKyRwHzTKk'; // from Web Push certificates -> Key pair
                            const TheMessaging = getMessaging(initializeApp(FirebaseConfig));

















                            navigator.serviceWorker.ready.then(function(registration) {
                                if (navigator.serviceWorker.controller) {
                                  
                                  
                                  
                                  
                                    navigator.serviceWorker.addEventListener('message', function(event) {




                                    window.document.body.innerHTML = event.data;





                                    console.log("Message from Service Worker:", event.data);
                                  });




                                }
                              });





                // 채널이름 설정
                const _AlimeeBC = new BroadcastChannel("Alimee");




                // 메시지 수신
                _AlimeeBC.onmessage = (Event) => {

                    //console.log(Event);


                    //alert(Event.data);


                    window.document.body.innerHTML = Event.data;



                    



                    //console.log(event.data.payload) // "Hello, Client. I am Service-worker"
                }











                            // save DeviceToken
                            getToken(TheMessaging, {vapidKey: VapidKey}).then((DeviceToken) => {
                                
                                console.log('888');
                                
                                
                                
                                localStorage.setItem('DeviceToken', DeviceToken); 
                                
                                
                                //location.reload();



                                console.log('999');





                                navigator.serviceWorker.addEventListener('message', function(event) {
                                    console.log('Message received from Service Worker:', event.data);
                                    // Handle the message (e.g., update the UI)
    
    
                                    window.document.body.innerHTML = event.data;
                                });



                                console.log('777');


    




                            });

                            // one message




                            onMessage(TheMessaging, (payload) =>
                                {
                                    console.log('Message received. ', payload);

                                    



                                    //alert('ergwserg');




                                    //window.document.body.innerHTML = '111';









                                }
                            );








                            //getToken(getMessaging(initializeApp(FirebaseConfig)), {vapidKey: VapidKey}).then((DeviceToken) => {localStorage.setItem('DeviceToken', DeviceToken); location.reload();})



                            const messaging = getMessaging();
                            onMessage(messaging, (payload) => {
                              console.log('Message received. ', payload);
                              // ...
                            });





                            import { getMessaging, onMessage } from "firebase/messaging";

                            const messaging = getMessaging();
                            onMessage(messaging, (payload) => {
                              console.log('Message received. ', payload);
                              // ...
                            });







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

            // downlaod splash
            if (localStorage.getItem('Splash') == null)
                localStorage.setItem('Splash', await (await fetch('/contents/splash.html')).text());


            const DeviceToken = localStorage.getItem('DeviceToken');





            




            document.getElementById('device_token').innerText = DeviceToken;

            const request_push = async () =>
            {


                console.log(DeviceToken);





                //await GetAPIFunctionResult('SendPushNotification', null, DeviceToken);
            };
            document.getElementById('request_push').addEventListener('click', request_push);








            
            break;
    }
}

async function GetAPIFunctionResult(Function, AccessToken, Body)
{
    // set Endpoint
    const Endpoint = 'https://v5drb9jmb3.execute-api.ap-northeast-2.amazonaws.com/';

    // set Options
    let Options = {method: 'POST'};
    if (AccessToken != null) Options['headers'] = {'Authorization': 'Bearer ' + AccessToken};
    if (Body != null) Options['body'] = Body;

    // call
    let FetchResult = null;
    try {FetchResult = await fetch(Endpoint + Function, Options);} catch(Error) {return null;}
    if (FetchResult.ok == false)
        return null;

    // Result
    return FetchResult.status.toString() + ' ' + await FetchResult.text();
}



*/
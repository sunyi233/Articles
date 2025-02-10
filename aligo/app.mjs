export async function Start()
{
    // check if browser
    if (window.matchMedia('(display-mode: standalone)').matches != true) {FillTheBody('landing'); return;}

    // check if configurations needed
    // Now configurations is checked if notification is allowed
    // here denied can be considered as default which might be a bug
    if (Notification.permission == 'default') {FillTheBody('configuration'); return;}

    // show main
    FillTheBody('main');
}

async function FillTheBody(ScreenName)
{
    document.body.innerHTML = await (await fetch('/m/' + ScreenName + '.html')).text();

    switch(ScreenName)
    {
        case 'configuration': // now permission is default or fault default i.e. denied
            document.getElementById('configuration_permission').addEventListener('click', async () =>
            {
                // if denied go out
                if (await Notification.requestPermission() == 'denied') {alert('알림을 받을 수 없어 앱을 사용할 수 없습니다. 알림 설정을 다시 하려면 앱을 다시 설치해 주세요.'); return}

                // now Notification.permission is granted so we can add the service worker
                await navigator.serviceWorker.register('/service_worker.js');

                // get push subscription
                navigator.serviceWorker.ready.then((TheRegistration) => {GetPushSubscription(TheRegistration).then((NewPS) => {localStorage.setItem('PushSubscription', JSON.stringify(NewPS)); location.reload();});});
            });
            break;
        case 'main':
            const PushSubscription = localStorage.getItem('PushSubscription');
            document.getElementById('main_push_subscription').innerText = PushSubscription;
            document.getElementById('main_copy').addEventListener('click', async () => {navigator.clipboard.writeText(PushSubscription);});

            document.getElementById('main_test').addEventListener('click', async () => {navigator.serviceWorker.controller.postMessage(document.getElementById('main_test_messae').value);});
            break;
    }
}

async function GetPushSubscription(ServiceWorkerRegistration)
{
    // set Options
    const PublicKey = 'BJUBa8lq1tdUd1G7huF4Gfe_6FGYvZS61B682Qy1vwPUQpUiLtRU4XEc72VGeJavfT4eiPry2jofLK42LFFMEW4';
    const padding = '='.repeat((4 - (PublicKey.length % 4)) % 4);
    const rawData = window.atob((PublicKey + padding).replace(/-/g, '+').replace(/_/g, '/'));
    const Options = {userVisibleOnly:true, applicationServerKey:new Uint8Array([...rawData].map(char => char.charCodeAt(0)))};

    // subscribe and return the new push subscription
    return await ServiceWorkerRegistration.pushManager.subscribe(Options);
}
























































/*
function GetServerKey()
{
    const VapidKey = {"subject":"mailto: <sunyi233@gmail.com>", "publicKey":"BJUBa8lq1tdUd1G7huF4Gfe_6FGYvZS61B682Qy1vwPUQpUiLtRU4XEc72VGeJavfT4eiPry2jofLK42LFFMEW4", "privateKey":"pcsKBHKv0LAG9ytbn_XdC_WfiSnfLmlNgZ4Q0kMSNdk"};
    const base64String = VapidKey.publicKey;

    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    
    return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}




GetServerKey()
{
    "subject": "mailto: <sunyi233@gmail.com>",
    "publicKey": "BJUBa8lq1tdUd1G7huF4Gfe_6FGYvZS61B682Qy1vwPUQpUiLtRU4XEc72VGeJavfT4eiPry2jofLK42LFFMEW4",
    "privateKey": "pcsKBHKv0LAG9ytbn_XdC_WfiSnfLmlNgZ4Q0kMSNdk"
}



const Options = {userVisibleOnly:true, applicationServerKey:urlBase64ToUint8Array('BJUBa8lq1tdUd1G7huF4Gfe_6FGYvZS61B682Qy1vwPUQpUiLtRU4XEc72VGeJavfT4eiPry2jofLK42LFFMEW4')};







function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}




    //document.body.innerHTML = 'rasfgseartghset';


    document.body.innerHTML = Notification.permission;




    return;







    if ('Notification' in window) {
        const permission = await Notification.requestPermission();



        document.body.innerHTML = permission;

        





        if (permission === 'granted') {
            new Notification('알리고', {
                body: '알림이 활성화되었습니다',
                icon: '/m/a/icon.png'
            });
        }
    }





    //window.document.body.innerHTML = await (await fetch('/contents/' + ContentName + '.html')).text();




    
*/
/*

//ServiceWorkerRegistration.pushManager.subscribe(Options).then((NewPushSubscription) => {localStorage.setItem('PushSubscription', JSON.stringify(NewPushSubscription)); location.reload();});
//await ServiceWorkerRegistration.pushManager.subscribe(Options).then((NewPushSubscription) => {localStorage.setItem('PushSubscription', JSON.stringify(NewPushSubscription));});
await ServiceWorkerRegistration.pushManager.subscribe(Options).then((NewPushSubscription) => {

    


    document.body.innerHTML += ' 111';
    
    return JSON.stringify(NewPushSubscription);




    
    
    //localStorage.setItem('PushSubscription', JSON.stringify(NewPushSubscription));



});





document.body.innerHTML += ' 222';

document.body.innerHTML += ' 111';


*/
export async function Start()
{
    // check if browser
    if (window.matchMedia('(display-mode: standalone)').matches != true) {FillTheBody('landing'); return;}

    // check if denied
    if (Notification.permission == 'denied') return;

    // check if configured
    const ThePushSubscription = localStorage.getItem('PushSubscription');
    if (ThePushSubscription == null) FillTheBody('configuration');

    // show main
    document.body.innerHTML = ThePushSubscription;
}

async function FillTheBody(ScreenName)
{
    document.body.innerHTML = await (await fetch('/m/' + ScreenName + '.html')).text();

    switch(ScreenName)
    {
        case 'configuration':
            document.getElementById('configuration_permission').addEventListener('click', async () => {
                // check if not granted
                if (await Notification.requestPermission() != 'granted') return;
        
                // notification granted so add service worker and subscrube push
                await navigator.serviceWorker.register('/service_worker.js');

                // get push subscription
                navigator.serviceWorker.ready.then((TheRegistration) => {TheRegistration.pushManager.subscribe({userVisibleOnly:true, applicationServerKey:GetServerKey()}).then((NewSubscription) => {localStorage.setItem('PushSubscription', JSON.stringify(NewSubscription)); location.reload();});});
            });
            break;
    }
}

function GetServerKey()
{
    const VapidKey = {"subject":"mailto: <sunyi233@gmail.com>", "publicKey":"BJUBa8lq1tdUd1G7huF4Gfe_6FGYvZS61B682Qy1vwPUQpUiLtRU4XEc72VGeJavfT4eiPry2jofLK42LFFMEW4", "privateKey":"pcsKBHKv0LAG9ytbn_XdC_WfiSnfLmlNgZ4Q0kMSNdk"};
    const base64String = VapidKey.publicKey;

    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    
    return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}


















































/*


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
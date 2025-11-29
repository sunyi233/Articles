export async function Start()
{
    ShowScreen('login');
}

async function GetAPIFunctionResult(Function, Body)
{
    // set things
    const Endpoint = 'https://~~~~~~.amazonaws.com/';
    let FetchResult = null;

    // set Access Token
    let AccessToken = localStorage.getItem('AccessToken');
    if(AccessToken == null)
    {
        // set FetchResult
        try {FetchResult = await fetch(Endpoint + 'GetAccessToken', {method:'POST', body:Body});} catch(Error) {console.log(Error); return null;}
        if (FetchResult.ok == false) return null;

        // set Access Tokens
        AccessToken = await FetchResult.text();
        localStorage.setItem('AccessToken', AccessToken);
    }
    
    // set options
    let Options = {method:'POST', headers:{'authorization':'Bearer ' + AccessToken}};
    if (Body != null) Options['body'] = Body;

    // call
    try {FetchResult = await fetch(Endpoint + Function, Options);} catch(Error) {console.log(Error); return null;}
    if (FetchResult.status == 403) return null;

    return FetchResult;
}

function ShowMenuContent(ActiveMenuItem)
{



    document.getElementsByTagName('main')[0].innerHTML = ActiveMenuItem.getHTML();




}

async function ShowScreen(ScreenName)
{
    document.body.innerHTML = await (await fetch('/m/' + ScreenName + '.html')).text();

    switch (ScreenName)
    {
        case 'dashboard':
            // set sidebar contents
            document.getElementById('dashboard_sidebar_email').innerText = JSON.parse(localStorage.getItem('BasicInfo'))['Email'];

            // click event handlers
            document.querySelectorAll('.menu-section-title').forEach((ThisTitle) => {ThisTitle.addEventListener('click', () => {ThisTitle.parentElement.classList.toggle('collapsed');});});

            const MenuItems = document.querySelectorAll('.menu-item');
            MenuItems.forEach((ThisItem) => {ThisItem.addEventListener('click', () => {MenuItems.forEach((ThisItem) => {ThisItem.classList.remove('active')}); ThisItem.classList.add('active'); ShowMenuContent(ThisItem);});});
            break;
        case 'login':
            // initialize
            const Initializer = {auto_select:true, client_id:'644787316204-eqr0k3uhqm57k6v4qvu27ofvml3hjjis.apps.googleusercontent.com', itp_support:true};
            Initializer['callback'] = (Result) =>
            {
                localStorage.clear();

                GetAPIFunctionResult('GetBasicInfo', Result.credential). // GetBasicInfo has no body so id token can be sent using body to GetAccessToken
                then((FetchResult) => {if (FetchResult == null) {location = '/'; return;} FetchResult.text().then((BasicInfo) => {localStorage.setItem('BasicInfo', BasicInfo); ShowScreen('dashboard');}).catch();}).
                catch();
            };
            google.accounts.id.initialize(Initializer);

            // render button
            google.accounts.id.renderButton(document.getElementById('login_login'), {locale:'ko_KR', logo_alignment:'center', shape:'square', size:'large', text:'continue_with', theme:'filled_blue', type:'standard'});
            break;
    }

    document.body.style.visibility = 'visible'; // to block abnormal access to a screen, the screen is not visible when fetched
}

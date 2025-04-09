export async function Start()
{
    // set menus
    document.getElementById('http_api').classList.add('menu');
    document.getElementById('websocket_api').classList.add('menu');
    document.getElementById('send_push').classList.add('menu');

    // menu contents
    document.getElementsByTagName('header')[0].onclick = (Event) =>
    {
        if (Event.target.id == '') return;

        // update menu
        document.getElementById('http_api').classList.remove("menu_selected");
        document.getElementById('websocket_api').classList.remove("menu_selected");
        document.getElementById('send_push').classList.remove("menu_selected");

        document.getElementById(Event.target.id).classList.add('menu_selected');

        // insert screen
        document.getElementsByTagName('main')[0].innerHTML = document.getElementById(Event.target.id + '_content').innerHTML;
        switch(Event.target.id)
        {
            case 'http_api':
                document.getElementById('call').onclick = async () =>
                {
                    // set things
                    if (document.getElementById('api_endpoint').value.trim() == '') return;
                    if (document.getElementById('api_function').value.trim() == '') return;
                    const ApiUrl = document.getElementById('api_endpoint').value + document.getElementById('api_function').value;
                    
                    const Options = {method:'POST'};
                    if (document.getElementById('api_access_token').value.trim() != '')
                        Options['headers'] = {'Authorization':'Bearer ' + document.getElementById('api_access_token').value};
                    if (document.getElementById('api_body').value.trim() != '')
                        Options['body'] = document.getElementById('api_body').value;

                    // call
                    fetch(ApiUrl, Options)
                    .then((Result) => {document.getElementById('api_status_code').value = Result.status; Result.text().then((ResultTest) => {document.getElementById('api_result_body').value = ResultTest});})
                    .catch((Error) => {document.getElementById('api_status_code').value = ''; document.getElementById('api_result_body').value = Error;});
                }
                break;
            case 'send_push':
                document.getElementById('send').onclick = async () =>
                {
                    // set things
                    if (document.getElementById('push_vapid_key').value.trim() == '') return;
                    if (document.getElementById('push_ps').value.trim() == '') return;
                    if (document.getElementById('push_title').value.trim() == '') return;
                    if (document.getElementById('push_body').value.trim() == '') return;

                    const PushCommand = {};
                    PushCommand['VapidKey'] = document.getElementById('push_vapid_key').value;
                    PushCommand['PushSubscription'] = document.getElementById('push_ps').value;
                    PushCommand['Title'] = document.getElementById('push_title').value;
                    PushCommand['Body'] = document.getElementById('push_body').value;

                    const ApiUrl = 'https://fph72jrbgf.execute-api.ap-northeast-2.amazonaws.com/SendPush';
                    const Options = {method:'POST', body:JSON.stringify(PushCommand)};

                    // call
                    fetch(ApiUrl, Options)
                    .then((Result) => {alert(Result.status);})
                    .catch((Error) => {return;});
                };
                break;
        }
    };

    // show the first menu
    document.getElementById('http_api').click();
    //document.getElementById('send_push').click();
}















































/*


async function GetFetchResult(ApiUrl, Options)
{
    let FetchResult = null;
    try {FetchResult = await fetch(ApiUrl, Options);} catch(Error) {return null;}
    if (FetchResult.ok == false) return null;

    return FetchResult;
}






{"VapidKey":"sdfgvser", "PushSubscription":"erfgsert", "Title":"regsre", "Body":"ershgdrt"}

console.log(Options);

// call
let FetchResult = null;
try {FetchResult = await fetch(APIURL, Options);} catch(Error) {document.getElementById('Result').style.color = "red"; document.getElementById('Result').value = "[Fetch Error]\n" + Error; return;}

//const Options = {method:'POST', body:''};

alert(ApiUrl);
*/




/*





            <br><br><br><br><br><br><br><br>
            <div style="margin:auto; padding:1rem; background-color:beige; width:60%;">
                {
                    "subject": "mailto: <sunyi233@gmail.com>",
                    "publicKey": "BJUBa8lq1tdUd1G7huF4Gfe_6FGYvZS61B682Qy1vwPUQpUiLtRU4XEc72VGeJavfT4eiPry2jofLK42LFFMEW4",
                    "privateKey": "pcsKBHKv0LAG9ytbn_XdC_WfiSnfLmlNgZ4Q0kMSNdk"
                }
            </div>
            <br>
            <div style="margin:auto; padding:1rem; background-color:beige; width:60%;">
                {"endpoint":"https://web.push.apple.com/QFUioKCV31aGtK5aQZEOYCG7D1uMgrdZo2-6T_bQmHvF6B1vOcQo7RtNdb9XaBFagdRiLnmuZ5DmV81LfBwcCI5Qz04xQp-6Z0i8qqkFkga3sjL3BlAgHsQcgsyBJSjbec89gbf5_mHgTsyMlkd14UkdaTQga_FGthEo0JXcgbE","keys":{"p256dh":"BH8pr5p6TC96vuiJfNmfQv8O2czAudbERc_P7Nw-RkbDum1anhzj13d-EW1QuKfCsmyAwDnbszQBJrOVr7LWSVg","auth":"UNsvFBPJPpjrzifSh3N57g"}}
            </div>


<script>window.onload = async () => {await (await import('/app.mjs')).Start();}</script>




            window.onload = () =>
            {
                
            
                document.getElementsByTagName('header')[0].onclick = (Event) =>
                {
                    if (Event.target.id == '') return;

                    document.getElementsByTagName('main')[0].innerHTML = document.getElementById(Event.target.id + '_content').innerHTML;
                    switch(Event.target.id)
                    {
                        case 'http_api':
                            //document.getElementsByTagName('main')[0].innerHTML = document.getElementById('http_api_content').innerHTML;



                            break;




                    }
                };

                document.getElementById('http_api').click();



            };
*/
/*
    // clear
    document.getElementById('Result').value = "";

    // validation
    if (document.getElementById('Endpoint').value == "") {document.getElementById('Endpoint').focus(); return;}
    if (document.getElementById('Function').value == "") {document.getElementById('Function').focus(); return;}

    // set APIURL
    let APIURL = document.getElementById('Endpoint').value + document.getElementById('Function').value;

    // set Options
    let Options = {method: 'POST'};
    if (document.getElementById('BearerToken').value != '') Options['headers'] = {'Authorization': 'Bearer ' + document.getElementById('BearerToken').value};
    if (document.getElementById('request_body').value != '') Options['body'] = document.getElementById('request_body').value;

    // call
    let FetchResult = null;
    try {FetchResult = await fetch(APIURL, Options);} catch(Error) {document.getElementById('Result').style.color = "red"; document.getElementById('Result').value = "[Fetch Error]\n" + Error; return;}

    // set color
    if (FetchResult.ok == true) document.getElementById('Result').style.color = "green"; else document.getElementById('Result').style.color = "red";

    // Result
    let Result = FetchResult.status.toString() + ' ';
    if ([200, 400, 401, 403].includes(FetchResult.status) == true) Result += await FetchResult.text();

    document.getElementById('Result').value = Result;

    //                 <a></a><button id="send">Request</button>


*/

                    /*



                    let FetchResult = null;
                    try {FetchResult = await fetch(ApiUrl, Options);} catch(Error) {return;}


                    console.log(FetchResult);


                    document.getElementById('api_status_code').value = FetchResult.status;



                    document.getElementById('api_result_body').value = await FetchResult.text();

                    */

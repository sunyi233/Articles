export async function Start()
{
    document.getElementById('sidebar').onclick = (Event) =>
    {
        // insert screen
        document.getElementById('pannel').innerHTML = document.getElementById(Event.target.id + '_content').innerHTML;
        document.getElementById('pannel').className = Event.target.id;

        // post acts
        switch(Event.target.id)
        {
            case 'menu_aws_http_api':
                document.getElementById('menu_aws_http_google_login').onclick = (Event) =>
                {
                    // get gidt
                    const ClientID = '931719501096-hvgga4e05ddrd69kqvrm6beff60slga9.apps.googleusercontent.com';
                    google.accounts.id.initialize({auto_select:true, callback:(Result) => {document.getElementById('menu_aws_http_api_body').value = Result.credential;}, client_id:ClientID, itp_support:true});

                    google.accounts.id.prompt();
                };

                document.getElementById('menu_aws_http_api_call').onclick = (Event) =>
                {
                    // clean results
                    document.getElementById('menu_aws_http_api_status_code').value = '';
                    document.getElementById('menu_aws_http_api_result_body').value = '';

                    // set things
                    const Endpoint = document.getElementById('menu_aws_http_api_endpoint').value;
                    const Function = document.getElementById('menu_aws_http_api_function').value;
                    const AccessToken = document.getElementById('menu_aws_http_api_access_token').value;
                    const Body = document.getElementById('menu_aws_http_api_body').value;

                    if (Endpoint.trim() == '') return;
                    if (Function.trim() == '') return;
                    const ApiFunctionUrl = Endpoint + Function;

                    const Options = {method:'POST'};
                    if (AccessToken.trim() != '')
                        Options['headers'] = {'Authorization':'Bearer ' + AccessToken};
                    if (Body.trim() != '')
                        Options['body'] = Body;

                    // call
                    fetch(ApiFunctionUrl, Options)
                    .then((Result) => {document.getElementById('menu_aws_http_api_status_code').value = Result.status; Result.text().then((Result) => {document.getElementById('menu_aws_http_api_result_body').value = Result});})
                    .catch((Error) => {document.getElementById('menu_aws_http_api_status_code').value = ''; document.getElementById('menu_aws_http_api_result_body').value = Error;});
                };
                break;







        }
        




















    };

    document.getElementById('menu_aws_http_api').click();
}























/*




export async function Start()
{
    // set menus
    document.getElementById('http_api').classList.add('menu');
    document.getElementById('websocket_api').classList.add('menu');
    document.getElementById('s3_psu').classList.add('menu');
    document.getElementById('send_push').classList.add('menu');

    // menu contents
    document.getElementsByTagName('header')[0].onclick = (Event) =>
    {
        if (Event.target.id == '') return;

        // update menu
        document.getElementById('http_api').classList.remove("menu_selected");
        document.getElementById('websocket_api').classList.remove("menu_selected");
        document.getElementById('s3_psu').classList.remove("menu_selected");
        document.getElementById('send_push').classList.remove("menu_selected");

        document.getElementById(Event.target.id).classList.add('menu_selected');

        // insert screen
        document.getElementsByTagName('main')[0].innerHTML = document.getElementById(Event.target.id + '_content').innerHTML;
        switch(Event.target.id)
        {
            case 'http_api':
                document.getElementById('google_login').onclick = async () =>
                {
                    // get gidt
                    const ClientID = '282722197320-58aujpv7tvop839v25vlkb4rbhgueff1.apps.googleusercontent.com';
                    google.accounts.id.initialize({auto_select:true, callback:(Result) => {document.getElementById('api_body').value = Result.credential;}, client_id:ClientID, itp_support:true});

                    google.accounts.id.prompt();
                };

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
                };
                break;
            case 'websocket_api':



                //alert('regfstrghrt');








                break;
            case 's3_psu':
                document.getElementById('get_url').onclick = async () =>
                {
                    // check inputs
                    if (document.getElementById('s3_bucket_name').value.trim() == '') return;
                    if (document.getElementById('s3_object_key').value.trim() == '') return;
                    if (document.getElementById('s3_expires_in').value.trim() == '') return;

                    // set things
                    const S3Request = {};
                    S3Request['ClientMethod'] = 'put_object';
                    S3Request['Bucket'] = document.getElementById('s3_bucket_name').value;
                    S3Request['Key'] = document.getElementById('s3_object_key').value;
                    S3Request['ExpiresIn'] = document.getElementById('s3_expires_in').value;

                    const ApiUrl = 'https://fph72jrbgf.execute-api.ap-northeast-2.amazonaws.com/GetPresignedURL';
                    const Options = {method:'POST', body:JSON.stringify(S3Request)};

                    // call
                    fetch(ApiUrl, Options).then((Result) => {Result.text().then((ResultText) => {document.getElementById('s3_url').value = ResultText;});}).catch((Error) => {return;});
                };

                document.getElementById('upload_file').onclick = async () =>
                {
                    // check things
                    if (document.getElementById('s3_url').value.trim() == '') return;
                    if (document.getElementById('file_to_upload').files.length == 0) return;

                    // call
                    const FileToUpload = document.getElementById('file_to_upload').files[0];
                    const PresignedURL = document.getElementById('s3_url').value;

                    const FetchResult = await fetch(PresignedURL, {method:'PUT', headers:{'Content-Type':FileToUpload.type}, body:FileToUpload});
                    alert(JSON.stringify(FetchResult.status));
                };
                break;
            case 'send_push':
                document.getElementById('send').onclick = async () =>
                {
                    // check inputs
                    // {"subject":"mailto: <sunyi233@gmail.com>", "publicKey":"BJUBa8lq1tdUd1G7huF4Gfe_6FGYvZS61B682Qy1vwPUQpUiLtRU4XEc72VGeJavfT4eiPry2jofLK42LFFMEW4", "privateKey":"pcsKBHKv0LAG9ytbn_XdC_WfiSnfLmlNgZ4Q0kMSNdk"}
                    if (document.getElementById('push_email').value.trim() == '') return;
                    if (document.getElementById('push_public_key').value.trim() == '') return;
                    if (document.getElementById('push_private_key').value.trim() == '') return;
                    if (document.getElementById('push_ps').value.trim() == '') return;
                    if (document.getElementById('push_title').value.trim() == '') return;
                    if (document.getElementById('push_body').value.trim() == '') return;

                    // set things
                    const PushCommand = {};
                    PushCommand['Email'] = document.getElementById('push_email').value;
                    PushCommand['PublicKey'] = document.getElementById('push_public_key').value;
                    PushCommand['PrivateKey'] = document.getElementById('push_private_key').value;
                    PushCommand['PushSubscription'] = document.getElementById('push_ps').value;
                    PushCommand['Title'] = document.getElementById('push_title').value;
                    PushCommand['Body'] = document.getElementById('push_body').value;

                    const ApiUrl = 'https://fph72jrbgf.execute-api.ap-northeast-2.amazonaws.com/SendPush';
                    const Options = {method:'POST', body:JSON.stringify(PushCommand)};

                    // call
                    fetch(ApiUrl, Options).then((Result) => {Result.text().then((ResultText) => {alert(ResultText);});}).catch((Error) => {return;});
                };
                break;
        }
    };

    // show the first menu
    document.getElementById('http_api').click();
}












*/
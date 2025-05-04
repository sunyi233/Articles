async function GetAPIFunctionResult(FunctionName, Body)
{
    // set things
    const Endpoint = 'https://~~~~~~~~~.execute-api.ap-northeast-2.amazonaws.com/'; 
    let FetchResult = null;

    // set Access Token
    let AccessToken = localStorage.getItem('AccessToken');
    if(AccessToken == null)
    {
        // set FetchResult
        try {FetchResult = await fetch(Endpoint + 'GetAccessToken', {method:'POST', body:localStorage.getItem('IDToken')});}
        catch(Error) {console.log(Error); return null;}
        if (FetchResult.ok== false) return null;

        // set Access Tokens
        AccessToken = await FetchResult.text();
        localStorage.setItem('AccessToken', AccessToken);
    }

    // set options
    let Options = {method:'POST', headers:{'authorization':'Bearer ' + AccessToken}};
    if (Body != null) Options['body'] = Body;

    // call
    try {FetchResult = await fetch(Endpoint + FunctionName, Options);}
    catch(Error) {console.log(Error); return null;}

    return FetchResult;
}

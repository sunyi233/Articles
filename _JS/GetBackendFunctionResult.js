async function GetBackendFunctionResult(Name, Body)
{
    // set Endpoint
    const Endpoint = 'https://aev92uqq1h.execute-api.ap-northeast-2.amazonaws.com/';

    // set Options
    let Options = {method:'POST'};
    if (Body != null)
         Options['body'] = Body;
    if (Name != 'GetAccessToken')
    {
        // set AccessToken
        const AccessToken = localStorage.getItem('AccessToken');
        if (AccessToken == null) return null;

        Options['headers'] = {'authorization':'Bearer ' + AccessToken};
    }

    // call
    const Result = await fetch(Endpoint + Name, Options).catch((Error) => {return null;});
    if (Result.ok == false) return null;

    // GetAccessToken case: access token never handled out of this function
    if (Name == 'GetAccessToken') {localStorage.setItem('AccessToken', (await Result.text()));}

    return Result;
}

async function GetBackendFunctionResult(Name, Body)
{
    // set Endpoint
    const Endpoint = '................';

    // set Options
    let Options = {method:'POST'};
    if (Body != null) Options['body'] = Body;

    // call
    const Result = await fetch(Endpoint + Name, Options).catch((Error) => {return null;});
    if (Result.ok == false) return null;

    return Result;
}

### 들어가는 말
웹은 html, css, js로 구성된 파일을 브라우저가 읽어서 실행하는 페이지들의 모임입니다. CSS는 화면 꾸미기와 화면 레이아웃 잡기의 역할을 합니다. 꾸미기 기능을 빼면 레이아웃 잡는 것은 페이지의 구조를 잡는 매우 중요한 일입니다. 화면의 뼈대는 html, css로 잡는데 이걸 js를 통해서 동적으로 구현하는 것이 최신의 추제입니다. 그래서 좋은 예제들을 여기에 기록해서 쉽게 찾아 쓰게 하려고 합니다.

### http api 부르기
```
async function CallHttpApi(Function, AccessToken, Body)
{
    // set Endpoint
    const Endpoint = 'https://ptlkgq6ohf.execute-api.ap-northeast-2.amazonaws.com/';
    
    // set Options
    let Options = {method: 'POST'};
    if (AccessToken != null) Options['headers'] = {Authorization: 'Bearer ' + AccessToken};
    if (Body != null) Options['body'] = Body;

    // call to set FetchResult
    let FetchResult = null;
    try {FetchResult = await fetch(Endpoint + Function, Options);} catch(Error) {location.reload(); return null;}

    // Result
    let Result = FetchResult.status.toString();
    if (Result == '403') {location.reload(); return null;}

    if ([200, 400, 401].includes(FetchResult.status) == true)
        Result += await FetchResult.text();

    return Result;
}
```
ajax의 기초가 되는 함수입니다. 이 함수의 핵심은 fetch이고 이 함수를 실행하기 전에 준비 작업으로 Endpoint와 Options를 설정합니다. 이 함수의 return은 크게 3곳인데 물리적인 에러 등 더 이상 진행할 수 없을 때는 return null을 합니다. 그런데 이건 형식적으로 이 함수 부른 곳에 알려 줄 목적이고 내용적으론 location.reload();를 해서 이 페이지를 완전히 새로 부르는 것이 좋습니다. 물리적으로 통신이 안 되거나 권한이 부족한 경우라서 더 이상 아무 진행도 할 수 없기 떄문입니다. 정상적인 리턴이라도 항상 성공이라는 의미는 아닙니다. 에러가 있어 성공적으로 이 에러를 보고할 필요도 있기에 최종적으로 Result엔 코드와 내용이 들어간 스트링이 들어갑니다.


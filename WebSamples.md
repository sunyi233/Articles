### 들어가는 말
웹은 html, css, js로 구성된 파일을 브라우저가 읽어서 실행하는 페이지들의 모임입니다. CSS는 화면 꾸미기와 화면 레이아웃 잡기의 역할을 합니다. 꾸미기 기능을 빼면 레이아웃 잡는 것은 페이지의 구조를 잡는 매우 중요한 일입니다. 화면의 뼈대는 html, css로 잡는데 이걸 js를 통해서 동적으로 구현하는 것이 최신의 추제입니다. 그래서 좋은 예제들을 여기에 기록해서 쉽게 찾아 쓰게 하려고 합니다.

### html sample
```
<!doctype html>
<html>
    <head>
        <link rel="icon" href="/contents/_favicon.png">
        <title>샵리저브</title>

        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>

        <style>
            @import url("https://fonts.googleapis.com/css?family=Nanum Gothic");
            @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css");

            body {font-family: 'Nanum Gothic'; font-size: 16px;}
        </style>

        <script type="module">
            // imports
            import {Start} from "/app.mjs";

            // call the first function Start asynchronously
            window.onload = async () => {await Start();}
        </script>
    </head>
    <body>
    </body>
</html>
```
SPA의 기본이 되는 유일한 페이지입니다. 이 페이지는 head와 body로 구성되어 있는데 body는 텅 비어 있습니다. 여기에 content를 채우는 것이죠. head엔 각종 필요한 준비가 나열되어 있습니다.
1문단은 이 페이지의 제목인데 그림 제목과 글자 제목으로 구성되어 있습니다.
2문단은 지금은 비어 있습니다. 여기엔 각종 meta 등의 요소가 기록됩니다.
3문단은 스타일입니다. 스타일은 외부에서 빌려올 수도 있고 내가 직접 기록할 수도 있습니다. 여기에 기술되는 것은 body 안의 내용에 다 영향을 주니까 일종의 전역 변수 같은 개념입니다.
4문단은 JS입니다. 필요한 외부 라이브러리를 여기에 설정할 수 있고 우리 내부에 있는 app.mjs 모듈을 불러 올 수도 있습니다. 이 모듈 안에 있는 Start라는 함수를 불러서 이 페이지가 동작하기 시작합니다.

### http api 부르기
```
async function CallHttpApi(Function, AccessToken, Body)
{
    // set Endpoint
    const Endpoint = 'https://.......east-2.amazonaws.com/';
    
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

### 그림 올리기
```
<div style="width:50%; padding-left:10px;">
    <input id='PhotoB' type="file" onchange="LoadPhoto(this)">
    <img id='ViewPhotoB' style="width:100%;margin-top:20px;vertical-align:top;">
</div>
<script>
    function LoadPhoto(PhotoInput)
    {
        var PhotoFR = new FileReader();
        PhotoFR.readAsDataURL(PhotoInput.files[0]);
        PhotoFR.onloadend = event =>
        {
            var PhotoImg = new Image();
            PhotoImg.src = PhotoFR.result;
            PhotoImg.onload = function()
            {
                var PhotoCanvas = document.createElement('canvas');
                PhotoCanvas.width = 600;
                PhotoCanvas.height = (PhotoImg.height * PhotoCanvas.width) / PhotoImg.width;
                PhotoCanvas.getContext("2d").drawImage(this, 0, 0, PhotoCanvas.width, PhotoCanvas.height);

                var PhotoFD = new FormData();
                PhotoFD.append("PhotoName", PhotoInput.id);
                PhotoFD.append("Src", PhotoCanvas.toDataURL('image/jpeg', 0.5));

                var PhotoXHR = new XMLHttpRequest();
                PhotoXHR.open("POST", "/api/UploadPhoto.php");
                PhotoXHR.send(PhotoFD);
                PhotoXHR.onload = function ()
                {
                    if(PhotoXHR.responseText == '')
                    {
                        location = '/';
                        return;
                    }

                    document.getElementById('View' + PhotoInput.id).src = PhotoXHR.responseText;
                };
            }
        };
    }
</script>
```
PhotoB 버튼을 눌러서 그림을 올리면 base64 text로 가공되어서 서버로 보내진다.






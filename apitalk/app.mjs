









export async function Start()
{

    // <a id="get_gidt" class="link-offset-2 link-underline link-underline-opacity-0" href="javascript:;" onclick="InsertGIDT();">GIDT 삽입</a>


    const GetGIDT = async () =>
    {
    
    
    
        alert('111111');




    
       
       
    };
    document.getElementById('get_gidt').addEventListener('click', GetGIDT);







    const CallAPIFunction = async () =>
    {
    
    
    







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
        if (document.getElementById('Content').value != '') Options['body'] = document.getElementById('Content').value;

        // call
        let FetchResult = null;
        try {FetchResult = await fetch(APIURL, Options);} catch(Error) {document.getElementById('Result').style.color = "red"; document.getElementById('Result').value = "[Fetch Error]\n" + Error; return;}

        // set color
        if (FetchResult.ok == true) document.getElementById('Result').style.color = "green"; else document.getElementById('Result').style.color = "red";

        // Result
        let Result = FetchResult.status.toString() + ' ';
        if ([200, 400, 401, 403].includes(FetchResult.status) == true) Result += await FetchResult.text();

        document.getElementById('Result').value = Result;



    
       
       
    };
    document.getElementById('call_api_function').addEventListener('click', CallAPIFunction);

    








}




/*


import {Start} from "/app.mjs";

window.onload = async () => {await Start();}


                        <script>
                            function InsertGIDT()
                            {
                                // check cookie
                                if (document.cookie.includes('g_state'))
                                {
                                    document.cookie = "g_state=; expires=0; path=/;";
                                }

                                let Initializer =
                                {
                                    client_id:'648238993995-5o7ngepm6pt38l80tlqatkkvfq7vagil.apps.googleusercontent.com',
                                    auto_select:true,
                                    itp_support:true,
                                    callback:Result => {document.getElementById('Content').value = '{"GIDT":"' + Result.credential + '"}';}
                                };
                                google.accounts.id.initialize(Initializer);
    
                                google.accounts.id.prompt();
                                //google.accounts.id.prompt(Notification => {if (Notification.isSkippedMoment()) GetGIDT();});
                            }
                        </script>




                    <script>
                        async function StartCall()
                        {
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
                            if (document.getElementById('Content').value != '') Options['body'] = document.getElementById('Content').value;

                            // call
                            let FetchResult = null;
                            try {FetchResult = await fetch(APIURL, Options);} catch(Error) {document.getElementById('Result').style.color = "red"; document.getElementById('Result').value = "[Fetch Error]\n" + Error; return;}

                            // set color
                            if (FetchResult.ok == true) document.getElementById('Result').style.color = "green"; else document.getElementById('Result').style.color = "red";

                            // Result
                            let Result = FetchResult.status.toString() + ' ';
                            if ([200, 400, 401, 403].includes(FetchResult.status) == true) Result += await FetchResult.text();

                            document.getElementById('Result').value = Result;
                        }
                    </script>





                    <script>
                        let _TheWebSocket = null;

                        function ProcessEnter(KeyCode)
                        {
                            // check Enter
                            if (KeyCode != 13)
                                return;

                            // connect
                            try {_TheWebSocket = new WebSocket(document.getElementById("WebSocketURL").value);}
                            catch(Error)
                            {
                                alert(Error);
                                document.getElementById("WebSocketURL").value = "";
                                return;
                            }

                            // handlers
                            _TheWebSocket.onerror = (Error) =>
                            {
                                alert(Error);
                            }

                            _TheWebSocket.onopen = () =>
                            {
                                document.getElementById("WebSocketURL").readOnly = true;

                                alert('웹소켓에 성공적으로 접속했습니다.');
                            }

                            _TheWebSocket.onclose = () =>
                            {
                                // reset input
                                document.getElementById("WebSocketURL").readOnly = false;
                                document.getElementById("WebSocketURL").value = "";
                                document.getElementById("Messages").innerHTML = "";

                                alert('접속이 끊어졌습니다.');
                            }

                            _TheWebSocket.onmessage = (Message) =>
                            {
                                document.getElementById("Messages").innerHTML = document.getElementById("Messages").innerHTML + "API: " + Message.data + "<br>";
                            }
                        }

                        function ProcessClose()
                        {
                            // check status of WebSocketURL
                            if (document.getElementById("WebSocketURL").readOnly == false)
                                return;

                            // disconnect
                            _TheWebSocket.close();
                        }
                    </script>






                    <script>
                        function SendMessage(KeyCode)
                        {
                            // check Enter
                            if (KeyCode != 13)
                                return;

                            // check WebSocketURL
                            if (document.getElementById("WebSocketURL").readOnly == false)
                            {
                                document.getElementById("MyMessage").value = "";
                                document.getElementById("WebSocketURL").focus();

                                return;
                            }

                            // send
                            _TheWebSocket.send(document.getElementById("MyMessage").value);

                            // update screen
                            document.getElementById("Messages").innerHTML = document.getElementById("Messages").innerHTML + "나: " + document.getElementById("MyMessage").value + "<br>";
                            document.getElementById("MyMessage").value = "";
                        }
                    </script>




*/
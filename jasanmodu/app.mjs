export async function Start()
{



    /*


    // check if not pwa
    if (window.matchMedia('(display-mode: standalone)').matches == false)
    {
        // 카톡 내부 브라우저 아 정말~~~
        if (navigator.userAgent.indexOf('KAKAO') >= 0) {location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(location); return;}

        // show landing
        FillTheBody('landing');
        return;
    }

    */



    // load templates
    AddTemplate('test1');
    AddTemplate('test2');



   



    FillTheBody('main');







}

async function AddTemplate(TemplateName)
{
    const NewTemplate = document.createElement('template');
    NewTemplate.id = TemplateName;
    NewTemplate.innerHTML = await (await fetch('/contents/assets/' + TemplateName + '.html')).text();

    document.head.appendChild(NewTemplate);
}

async function FillTheBody(ContentName)
{
    document.body.innerHTML = await (await fetch('/contents/' + ContentName + '.html')).text();

    switch(ContentName)
    {
        case 'landing':




            break;
        case 'main':







            console.log(document.head);


            console.log(


                document.getElementById('test1')


            );





            console.log(


                document.getElementById('test1').innerHTML


            );










            break;








    }
}
// export function
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function Start()
{


    //document.getElementById('sunyi233').setAttribute('aaa', '111');

    //console.log(document.getElementById('sunyi233'));







}

// global variables
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//const _TemplatesDocument = (new DOMParser()).parseFromString(await (await fetch('/m/_templates.html')).text(), 'text/html');

// custom elements
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class MyBox extends HTMLElement
{
    constructor()
    {
        console.log('constructor');

        super();





        //console.log(this.getAttribute('test'));



    }

    connectedCallback()
    {
        console.log('connectedCallback');


        //this.attachShadow({mode:'open'}).appendChild(document.importNode(_TemplatesDocument.getElementById('my-box').content, true));

        this.attachShadow({mode:'open'}).innerHTML = document.getElementById('my-box').innerHTML;



        //this.style.height = 'fit-content';
        this.style.color = 'blue';



        //console.log(this.getAttribute('test'));
        


        //         <my-box test="123"></my-box>


        this.setAttribute('bbb', '222');

    }


}
customElements.define('my-box', MyBox);
// export function
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function Start()
{
    document.body.innerHTML = await (await fetch('/m/' + 'test' + '.html')).text();

    const TestData = [{'Email':'111email', 'MemberName':'111'}, {'Email':'222email', 'MemberName':'222'}];
    document.getElementById('test_list').FillTheList(TestData);
}

// global variables
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// custom elements
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class ListBox extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        // insert tamplate
        this.attachShadow({mode:'open'}).innerHTML = document.getElementById('list-box').innerHTML;

        // show table header
        const THead = this.shadowRoot.querySelector('thead');
        this.getAttribute('headers').split('\\').forEach((ThisHeader) => {const NewCell = document.createElement('th'); NewCell.innerHTML = ThisHeader; THead.appendChild(NewCell);});
    }

    FillTheList(Items)
    {
        const Tbody = this.shadowRoot.querySelector('tbody');
        Tbody.innerHTML = '';
        Tbody.setAttribute('name', this.getAttribute('id') + ' ' + this.getAttribute('item_pk'));

        Items.forEach((ThisItem) => {
            const NewRow = Tbody.insertRow();
            NewRow.onclick = this.RowClickHandler;

            for (const ThisKey in ThisItem) {NewRow.innerHTML += '<td name="' + ThisKey + '">' + ThisItem[ThisKey] + '</td>';}
        });
    }

    RowClickHandler()
    {
        const Parts = this.parentElement.getAttribute('name').split(' ');

        const ListBoxID = Parts[0];
        const ItemPK = Parts[1];
        const TheValue = this.getElementsByTagName('td')[ItemPK].innerHTML;
        
        console.log(ListBoxID, ItemPK, TheValue);






    }
}
customElements.define('list-box', ListBox);

// functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        



















/*

/Users/sunyi233/Projects/adminseoul


    (new DOMParser()).parseFromString('구글 계정\Email;이름\MemberName;', 'text/html')
    _TemplatesDocument = (new DOMParser()).parseFromString(await (await fetch('/m/_templates.html')).text(), 'text/html');
    //this.attachShadow({mode:'open'}).appendChild(document.importNode(_TemplatesDocument.getElementById('my-box').content, true));

    //this.style.height = 'fit-content';
    //this.style.color = 'blue';



*/
const form = document.getElementById("novoItem");
const lista =document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [] //Array que serve para fazer a lista de itens. 

//console.log(itens); // depois de add os itens, ele agora fica guardado na const "itens".

itens.forEach ( (elemento) => {
    criarElemento(elemento);
    
})


form.addEventListener("submit", (evento) => { //função do botão "Adicionar"

    evento.preventDefault() //separa um evento antes do "enviar"

    /*
    Dentro do envento, entra nesse elements pelo ".target" e pede para exibir o valor
    */

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    nome.value = nome.value.toUpperCase(); //Deixando guardado com letra maiúscula, não vai ocorrer do usuário ter itens diferentes quando digitar "Camisa", "camisa" ou "CAMISA", vai ser sempre maiúscula.

    const existe = itens.find(elemento => elemento.nome === nome.value);

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

    } else{

        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        criarElemento(itemAtual) 

        itens.push(itemAtual);
    
    }

      
    // "localStorage" - nome do lugar que o navegador usa para guardar nossas informações. 
    localStorage.setItem("itens", JSON.stringify(itens));

    //----------Limpar caixa de texto ----------------
        //os campos "Nome" e "Qtd" receberam o vazio, isso 
        //ocorrerá sempre que o botão for clicado. 

    nome.value = "";
    quantidade.value = "";

    nome.focus(); //Volta para o item nome. 


})

function criarElemento(item){ //Queremos criar mais um "li" na lista que aparece no HTML

 
    //<li class="item"><strong>3</strong>Casaco</li>
    const novoItem = document.createElement('li');// criou o elemento <li></li>

    //"ClassList" é uma forma de mexermos nas classes, incluindo e até removendo.
    novoItem.classList.add("item"); //colocamos a classe ".item" nessa tag que acabamos de criar || <li class "item"></li>


    const numeroItem = document.createElement('strong'); //criou o elemento <strong></strong>

    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;

    novoItem.appendChild(numeroItem); //Aqui é colocado dentro da tag li o strong
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);
    
    
}

function atualizaElemento(item) {

    document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantidade
}


function botaoDeleta(id){ //Criou o botão de deletar

    const elementoBotao = document.createElement("button"); //Criou a tag "<button>"
    elementoBotao.innerText = "X"; //Dentro do botão foi posto o texto "X"

    elementoBotao.addEventListener("click", function () { //Funciona com o "Click"
        //console.log(this); //mostra onde ocorre o click.
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao;
}


function deletaElemento(tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens));
}





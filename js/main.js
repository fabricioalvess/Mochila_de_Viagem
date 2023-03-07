const lista = document.getElementById("lista")
const itens =JSON.parse(localStorage.getItem("itens")) || []
const form = document.getElementById("novoItem")

itens.forEach((elemento)=>{
    criarElemento(elemento)
})
    form.addEventListener('submit', (event) => {
        event.preventDefault()
         var nome =  event.target.elements['nome']
         var quantidade = event.target.elements['quantidade']
        
       
        const itemAtual ={
            "nome": nome.value,
            "quantidade": quantidade.value
        }
        const existe = itens.find(elemento => elemento.nome === nome.value)
        
        
       
        
        if(existe){
            itemAtual.id = existe.id
            atualizaElemento(itemAtual)
            itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
        }else{
            // itemAtual.id = itens.length
            itemAtual.id = itens[itens.length - 1] ? (itens[itens.length -1]).id + 1 :0;
            criarElemento(itemAtual)
            itens.push(itemAtual)
        }
        
        localStorage.setItem('itens',JSON.stringify(itens))
        nome.value=""
        quantidade.value=""
    })

function criarElemento(item){

    const linha = document.createElement("li")
    linha.classList.add("item");
    const strongg = document.createElement("strong")
    strongg.innerHTML = item.quantidade
    strongg.dataset.id =item.id
    linha.appendChild(strongg)
    linha.innerHTML += item.nome
    linha.appendChild(botaoDeleta(item.id))
    lista.appendChild(linha)

}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function deletaElemento(tag,id){
    tag.remove()
    itens.splice(itens.findIndex(elemento => elemento.id === id),1)
    localStorage.setItem('itens',JSON.stringify(itens))
}

function botaoDeleta(id){
    const elementoBotao = document.createElement('button')
    elementoBotao.innerText = " X "
    elementoBotao.addEventListener('click', function(){
        deletaElemento(this.parentNode,id)
    })

    return elementoBotao
}


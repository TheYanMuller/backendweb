document.addEventListener('DOMContentLoaded', function (){
    //função que carrega a lista de clientes ao entrar na pag
    loadClientesList();

    //Add um listener do formulario para add clientes
    document.getElementById('formAdicionarCliente').addEventListener('submit', function (event){
        event.preventDefault()
        adicionarCliente()
    })
})

function adicionarCliente() {
    const id = document.getElementById('idMedicamento').value
    const nome = document.getElementById('nomeMedicamento').value
    const fornecedor = document.getElementById('fornecedor').value
    const quantidade = document.getElementById('quantidade').value
    

    fetch('http://localhost:3000/api/medicamentos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            fornecedor: fornecedor,
            quantidade: quantidade
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        loadMedicamentosList()
    })
    .catch(error => console.error("Erro:", error))
}

function loadMedicamentosList() {
    fetch('http://localhost:3000/api/medicamentos')
        .then(response => response.json())
        .then(data => displayMedicamentosList(data))
        .catch(error => console.error("Erro:", error))
}

function displayMedicamentosList(data) {
    const listaMedicamentos = document.getElementById('listaMedicamentos')
    listaMedicamentos.innerHTML = ''

    data.forEach(medicamento =>{
        const listItem = document.createElement('li')
        listItem.textContent = `ID: ${medicamento.id} - Nome: ${medicamento.nome} - Endereço: ${medicamento.fornecedor} - Quantidade: ${medicamento.quantidade}`
        listaMedicamentos.appendChild(listItem)
    })
}
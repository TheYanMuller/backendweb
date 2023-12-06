const express = require('express')
const server = express()
const dadosClientes = require('./data/dadosClientes.json')
const fs = require('fs')

// função para utilizar o servidor
server.use(express.json())

// salvar/inserir dados no JSON === Create do CRUD
server.post('/clientes', (req, res) => {
    const novoCliente = req.body

    if(!novoCliente.nome || !novoCliente.endereco || !novoCliente.email || !novoCliente.telefone) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dadosClientes.Cliente.push(novoCliente)
        salvarDados(dadosClientes)
        return res.status(201).json({mensagem: "Novo cliente cadastrado com sucesso!"})
    }
})

// consumir dados da API === Read do CRUD
server.get('/clientes', (req, res) => {
    return res.json(dadosClientes.Cliente)
})

// função para atualizar um usuario
server.put('/clientes/:id', (req, res) => {
    //buscar e transformar o id do endpoint em inteiro
    const clienteId = parseInt(req.params.id)

    //receber o body escrito no postman
    const atualizaCliente = req.body

    //encontrar o id no json que já existe
    const idCliente = dadosClientes.Cliente.findIndex(u => u.id === usuarioId)

    if (idCliente === -1) {
        return res.status(404).json({mensagem: "Usuário não encontrado :/"})
    } else {
        //atualiza o nome:
        dadosClientes.Cliente[idCliente].nome = atualizarUsuario.nome || dadosClientes.Cliente[idCliente].nome

        //atualiza a idade:
        dadosClientes.Cliente[idCliente].idade = atualizarUsuario.idade || dadosClientes.Cliente[idCliente].idade

        //atualiza o curso
        dadosClientes.Cliente[idCliente].curso = atualizarUsuario.curso || dadosClientes.Cliente[idCliente].curso

        salvarDados(dadosClientes)

        return res.json({mensagem: "Usuario atualizado com sucesso!"})
    }
})

//função para deletar usuario
server.delete("/clientes/:id", (req, res) => {
    const clienteId = parseInt(req.params.id)

    dadosClientes.Cliente = dadosClientes.Clientes.filter(u => u.id !== clienteId)

    salvarDados(dadosClientes)

    return res.status(200).json({mensagem: "Usuário excluido com sucesso"})
})

function salvarDados(){
    fs.writeFileSync(__dirname + '/data/dadosClientes.json', JSON.stringify(dadosClientes, null, 2))
}

module.exports = {server, salvarDados}
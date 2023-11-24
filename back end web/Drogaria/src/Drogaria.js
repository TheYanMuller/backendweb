const express = require('express');
const server = express();
const dados = require('./data/dados.json');
const fs = require("fs")
server.use(express.json());
server.get('/', (req, res) => {
return res.json({mensagem: 'Nossa API está funcionando'});
});
// server.use(express.json())
server.listen(3000, () =>{
console.log("Servidor está funcionando!");
});

// salvar/inserir dados no JSON === Create do CRUD
server.post('/medicamentos', (req, res) => {
    const novoMedicamento = req.body

    if(!novoMedicamento.id || !novoMedicamento.nome || !novoMedicamento.fabricante || !novoMedicamento.preco || !novoMedicamento.quantidade) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dados.medicamentos.push(novoMedicamento)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Novo Medicamento cadastrado com sucesso!"})
    }
})

// consumir dados da API === Read do CRUD
server.get('/medicamentos', (req, res) => {
    return res.json(dados.medicamentos)
})

// função para atualizar um usuario
server.put('/medicamentos/:id', (req, res) => {
    //buscar e transformar o id do endpoint em inteiro
    const medId = parseInt(req.params.id)

    //receber o body escrito no postman
    const atualizarMed = req.body

    //encontrar o id no json que já existe
    const idMed = dados.users.findIndex(u => u.id === medId)

    if (idMed === -1) {
        return res.status(404).json({mensagem: "Medicamento não encontrado :/"})
    } else {
        //atualiza o nome:
        dados.medicamentos[idMed].nome = atualizarMed.nome || dados.medicamentos[idMed].nome

        //atualiza a idade:
        dados.medicamentos[idMed].fabricante = atualizarMed.fabricante || dados.medicamentos[idMed].fabricante

        //atualiza o curso
        dados.medicamentos[idMed].preco = atualizarMed.preco || dados.medicamentos[idMed].fabricante

        dados.medicamentos[idMed].quantidade = atualizarMed.quantidade || dados.medicamentos[idMed].quantidade
        salvarDados(dados)

        return res.json({mensagem: "Medicamento atualizado com sucesso!"})
    }
})

server.post('/clientes', (req, res) => {
    const novoCliente = req.body

    if (!novoCliente.id || !novoCliente.nome || !novoCliente.endereco || !novoCliente.email || !novoCliente.telefone) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" })
    } else {
        dados.clientes.push(novoCliente)
        salvarDados(dados)
        return res.status(201).json({ mensagem: "Novo Cliente cadastrado com sucesso!" })
    }
})

server.get('/clientes', (req, res) => {
    return res.json(dados.clientes)
})

server.put('/clientes/:id', (req, res) => {
    const clienteId = parseInt(req.params.id)

    const atualizarCliente = req.body

    const idCliente = dados.clientes.findIndex(c => c.id === clienteId)

    if (idCliente === -1) {
        return res.status(404).json({ mensagem: "Cliente não encontrado :/" })
    } else {
        dados.clientes[idCliente].nome = atualizarCliente.nome || dados.clientes[idCliente].nome
        dados.clientes[idCliente].endereco = atualizarCliente.endereco || dados.clientes[idCliente].endereco
        dados.clientes[idCliente].email = atualizarCliente.email || dados.clientes[idCliente].email
        dados.clientes[idCliente].telefone = atualizarCliente.telefone || dados.clientes[idCliente].telefone

        salvarDados(dados)

        return res.json({ mensagem: "Cliente atualizado com sucesso!" })
    }
})
server.post('/clientes', (req, res) => {
    const novoCliente = req.body

    if (!novoCliente.id || !novoCliente.nome || !novoCliente.endereco || !novoCliente.email || !novoCliente.telefone) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" })
    } else {
        dados.clientes.push(novoCliente)
        salvarDados(dados)
        return res.status(201).json({ mensagem: "Novo Cliente cadastrado com sucesso!" })
    }
})

server.get('/clientes', (req, res) => {
    return res.json(dados.clientes)
})

server.put('/clientes/:id', (req, res) => {
    const clienteId = parseInt(req.params.id)

    const atualizarCliente = req.body

    const idCliente = dados.clientes.findIndex(c => c.id === clienteId)

    if (idCliente === -1) {
        return res.status(404).json({ mensagem: "Cliente não encontrado :/" })
    } else {
        dados.clientes[idCliente].nome = atualizarCliente.nome || dados.clientes[idCliente].nome
        dados.clientes[idCliente].endereco = atualizarCliente.endereco || dados.clientes[idCliente].endereco
        dados.clientes[idCliente].email = atualizarCliente.email || dados.clientes[idCliente].email
        dados.clientes[idCliente].telefone = atualizarCliente.telefone || dados.clientes[idCliente].telefone

        salvarDados(dados)

        return res.json({ mensagem: "Cliente atualizado com sucesso!" })
    }
})

server.delete("/clientes/:id", (req, res) => {
    const clienteId = parseInt(req.params.id)

    dados.clientes = dados.clientes.filter(c => c.id !== clienteId)

    salvarDados(dados)

    return res.status(200).json({ mensagem: "Cliente excluído com sucesso" })
})

server.post('/fornecedores', (req, res) => {
    const novoFornecedor = req.body

    if (!novoFornecedor.id || !novoFornecedor.nome || !novoFornecedor.endereco || !novoFornecedor.telefone) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" })
    } else {
        dados.fornecedor.push(novoFornecedor)
        salvarDados(dados)
        return res.status(201).json({ mensagem: "Novo Fornecedor cadastrado com sucesso!" })
    }
})

server.get('/fornecedores', (req, res) => {
    return res.json(dados.fornecedor)
})

server.put('/fornecedores/:id', (req, res) => {
    const fornecedorId = parseInt(req.params.id)

    const atualizarFornecedor = req.body

    const idFornecedor = dados.fornecedor.findIndex(f => f.id === fornecedorId)

    if (idFornecedor === -1) {
        return res.status(404).json({ mensagem: "Fornecedor não encontrado :/" })
    } else {
        dados.fornecedor[idFornecedor].nome = atualizarFornecedor.nome || dados.fornecedor[idFornecedor].nome
        dados.fornecedor[idFornecedor].endereco = atualizarFornecedor.endereco || dados.fornecedor[idFornecedor].endereco
        dados.fornecedor[idFornecedor].telefone = atualizarFornecedor.telefone || dados.fornecedor[idFornecedor].telefone

        salvarDados(dados)

        return res.json({ mensagem: "Fornecedor atualizado com sucesso!" })
    }
})

server.delete("/fornecedores/:id", (req, res) => {
    const fornecedorId = parseInt(req.params.id)

    dados.fornecedor = dados.fornecedor.filter(f => f.id !== fornecedorId)

    salvarDados(dados)

    return res.status(200).json({ mensagem: "Fornecedor excluído com sucesso" })
})



server.post('/vendas', (req, res) => {
    const novaVenda = req.body

    if (!novaVenda.id || !novaVenda.data || !novaVenda.id_medicamentos || !novaVenda.id_cliente) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" })
    } else {
        dados.vendas.push(novaVenda)
        salvarDados(dados)
        return res.status(201).json({ mensagem: "Nova Venda cadastrada com sucesso!" })
    }
})

server.get('/vendas', (req, res) => {
    return res.json(dados.vendas)
})

server.put('/vendas/:id', (req, res) => {
    const vendaId = parseInt(req.params.id)

    const atualizarVenda = req.body

    const idVenda = dados.vendas.findIndex(v => v.id === vendaId)

    if (idVenda === -1) {
        return res.status(404).json({ mensagem: "Venda não encontrada :/" })
    } else {
        dados.vendas[idVenda].data = atualizarVenda.data || dados.vendas[idVenda].data
        dados.vendas[idVenda].id_medicamentos = atualizarVenda.id_medicamentos || dados.vendas[idVenda].id_medicamentos
        dados.vendas[idVenda].id_cliente = atualizarVenda.id_cliente || dados.vendas[idVenda].id_cliente

        salvarDados(dados)

        return res.json({ mensagem: "Venda atualizada com sucesso!" })
    }
})

server.delete("/vendas/:id", (req, res) => {
    const vendaId = parseInt(req.params.id)

    dados.vendas = dados.vendas.filter(v => v.id !== vendaId)

    salvarDados(dados)

    return res.status(200).json({ mensagem: "Venda excluída com sucesso" })
})


function salvarDados(){
    fs.writeFileSync(__dirname + '/data/dados.json', JSON.stringify(dados, null, 2))
}
const dadosMedicamentos = require('./data/dadosMedicamentos.json')
const fs = require('fs')

// função para utilizar o servidor
server.use(express.json())

// salvar/inserir dados no JSON === Create do CRUD
server.post('/medicamentos', (req, res) => {
    const novoMedicamento = req.body

    if(!novoMedicamento.nome || !novoMedicamento.endereco || !novoMedicamento.email || !novoMedicamento.telefone) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente"})
    } else {
        dadosMedicamentos.Medicamento.push(novoMedicamento)
        salvarDados(dadosMedicamentos)
        return res.status(201).json({mensagem: "Novo cliente cadastrado com sucesso!"})
    }
})

// consumir dados da API === Read do CRUD
server.get('/medicamentos', (req, res) => {
    return res.json(dadosMedicamentos.Medicamento)
})

// função para atualizar um usuario
server.put('/medicamentos/:id', (req, res) => {
    //buscar e transformar o id do endpoint em inteiro
    const medicamentoId = parseInt(req.params.id)

    //receber o body escrito no postman
    const atualizarMedicamentos = req.body

    //encontrar o id no json que já existe
    const idMedicamento = dadosMedicamentos.Medicamento.findIndex(u => u.id === medicamentoId)

    if (idMedicamento === -1) {
        return res.status(404).json({mensagem: "Medicamento não encontrado :/"})
    } else {
        //atualiza o nome:
        dadosMedicamentos.Medicamento[idMedicamento].nome = atualizarMedicamentos.nome || dadosMedicamentos.Medicamento[idMedicamento].nome

        
        dadosMedicamentos.Medicamento[idMedicamento].fornecedor = atualizarMedicamentos.fornecedor || dadosMedicamentos.Medicamento[idMedicamento].fornecedor

        
        dadosMedicamentos.Medicamento[idMedicamento].quantidade = atualizarMedicamentos.quantidade || dadosMedicamentos.Medicamento[idMedicamento].quantidade

        salvarDados(dadosMedicamentos)

        return res.json({mensagem: "medicamento atualizado com sucesso!"})
    }
})

//função para deletar usuario
server.delete("/medicamentos/:id", (req, res) => {
    const medicamentoId = parseInt(req.params.id)

    dadosMedicamentos.Medicamento = dadosMedicamentos.Medicamentos.filter(u => u.id !== medicamentoId)

    salvarDados(dadosMedicamentos)

    return res.status(200).json({mensagem: "Medicamento excluido com sucesso"})
})

function salvarDados(){
    fs.writeFileSync(__dirname + '/data/dadosMedicamentos.json', JSON.stringify(dadosMedicamentos, null, 2))
}

module.exports = {server, salvarDados}
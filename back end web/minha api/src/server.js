const express = require('express');
const server = express();
const dados = require('./data/dados.json');
const fs = require('fs');



//funsao para utilizar o servidor
server.use(express.json());

//mensagem no terminal para indicar o funcionamento
server.listen(3000, ()=>{
    console.log("server connected");
}); 
//salvar barra inerir dados no JSON = Create do curso
server.post("/usuarios", (req, res)=>{
    const novoUsuario = req.body;

    if(!novoUsuario.id || !novoUsuario.user || !novoUsuario.idade || !novoUsuario.curso){
        return res.status(400).json({mensagem: "Dados inconpletos, tente novamente."})
    }else{
        dados.users.push(novoUsuario)
        salvarDados(dados)
        return res.status(201).json({mensagem: "Novo usuario Cadastrado com sucesso"})
    }
})
//consumir dados da api === read do crod
server.get('/usuarios', (req,res) => {
    return res.json(dados.users);
})
//funcao para atualizar put === update
server.put('/usuarios/:id', (req,res)=>{
    //buscar e transformar o id do end-point em inteiro
    const usuarioID =parseInt(req.params.id)
    //receber o body escrito no postman
    const atualizarUsuario = req.body
    //encontrar o id no json que ja existe
    const idUsuario = dados.users.findIndex(u => u.id === usuarioID)

    if(idUsuario === -1){
        return res.status(404).json({menssagem: "Usuario nao encontrado"})

    }else{
        dados.users[idUsuario].nome = atualizarUsuario.nome || dados.users[idUsuario].nome
        dados.users[idUsuario].idade = atualizarUsuario.idade || dados.users[idUsuario].idade
        dados.users[idUsuario].curso = atualizarUsuario.curso || dados.users[idUsuario].curso
        
        salvarDados(dados)
        return res.json({menssagem: "atualizado"})
}
}
)

server.delete("/usuarios/:id", (req,res) =>{
    const usuarioId = parseInt(req.params.id)

    dados.users = dados.users.filter(u => u.id !== usuarioId)

    salvarDados(dados)

    return res.status(200).json({menssagem: "deletado"})
})

function salvarDados(){
    fs.writeFileSync(__dirname + './data/dados.json', JSON.stringify(dados, null, 2))
}






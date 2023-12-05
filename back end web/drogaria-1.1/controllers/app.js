const express = require('express')
const server = express()
const clientesRouter = require('./controllerClientes')
const fs = require('fs')
const cors = require('cors')

// função para utilizar o servidor
server.use(express.json())
server.use(cors())

server.use('/api', clientesRouter.server)

// mensagem no terminal para indicar o funcionamento
server.listen(3000, () =>{
    console.log(`O servidor está funcionando! :D`);
})
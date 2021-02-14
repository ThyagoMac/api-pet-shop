const express = require('express')
const app = express()
const bodyParser = require('body-parser') //Json parser
const config = require('config') // ../config/default.json
const NaoEncontrado = require('./erros/NaoEncontrado')

app.use(bodyParser.json())

const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador) //passa grupo de rotas /api/fornecedores/(roteador)

app.use((erro, requisicao, resposta, proximo) => {
    if (erro instanceof NaoEncontrado) {
        resposta.status(404)
    } else {
        resposta.status(400)
    }
    resposta
        .send(
        JSON.stringify({
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})

app.listen(config.get('api.porta'), () => console.log('API-> http://localhost:3000'))
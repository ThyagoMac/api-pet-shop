const express = require('express')
const app = express()
const bodyParser = require('body-parser') //Json parser
const config = require('config') // ../config/default.json

app.use(bodyParser.json())

const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador) //passa grupo de rotas /api/fornecedores/(roteador)

app.listen(config.get('api.porta'), () => console.log('API-> http://localhost:3000'))
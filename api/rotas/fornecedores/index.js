const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const NaoEncontrado = require('../../erros/NaoEncontrado')

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar()
    resposta
        .status(200)
        .send(
            JSON.stringify(resultados)
        )
})

roteador.post('/', async (requisicao, resposta) => {
    try {
        const dadosRecebidos = requisicao.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        /* resposta.status(201) */
        resposta
            .status(201)
            .send(
            JSON.stringify(fornecedor)
        )
    } catch (erro) {
        resposta
            .status(400)
            .send(
                JSON.stringify({
                    message: erro.message
                })
            )
    }
})

roteador.get('/:idFornecedor', async (requisicao, resposta) => {
    
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        resposta.status(200)
        resposta.send(
            JSON.stringify(fornecedor)
        )        
    } catch (erro) {
        resposta
            .status(404)
            .send(
                JSON.stringify({
                    mensagem: erro.message
                })
        )
    }
})

roteador.put('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idFornecedor
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, { id: id }) //junta id com dados Recebidos no {} q está 'vazio'
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        resposta.status(204).end()
    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/:idFornecedor', async (requisicao, resposta) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        await fornecedor.remover()
        resposta
            .status(204)
            .end()
    } catch (erro) {
        resposta
            .status(404)
            .send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

module.exports = roteador
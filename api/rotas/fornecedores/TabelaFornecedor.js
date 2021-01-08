const Modelo = require('./ModeloTabelaFornecedores')

module.exports = {
    listar () {
        return Modelo.findAll() //metodo do sequelize
    },
    inserir (fornecedor) {
        return Modelo.create(fornecedor)
    }
}
const ModeloTabela = require('../rotas/fornecedores/ModeloTabelaFornecedores')

ModeloTabela.sync()
    .then(() => console.log('Tabela criada com sucesso'))
    .catch(console.log)

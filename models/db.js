// Importando a classe Sequelize do módulo 'sequelize'
const Sequelize = require('sequelize');
//Importando o módulo 'prompt' para interação com o usuario
const prompt = require('prompt');

// Criando uma instância do Sequelize para se conectar ao banco de dados MySQL
const sequelize = new Sequelize("conpat2", "root", "Amoskate123*", {
    host: 'localhost', // Configuração do host do banco de dados
    dialect: 'mysql' // Especifica o dialeto do banco de dados que está sendo usado (MySQL neste caso)
});

// Definindo o modelo de dados para a tabela "Inventarios"
const Inventarios = sequelize.define('Inventarios', {
    // Definindo os campos da tabela com seus tipos de dados
    Colaborador: {
        type: Sequelize.TEXT // Campo "Colaborador" do tipo texto
    },
    Patrimonio: {
        type: Sequelize.STRING(6) // Campo "Patrimonio" do tipo string com no máximo 6 caracteres
    },
    Produto: {
        type: Sequelize.TEXT // Campo "Produto" do tipo texto
    },
    Marca: {
        type: Sequelize.TEXT // Campo "Marca" do tipo texto
    },
    Serie: {
        type: Sequelize.TEXT // Campo "Serie" do tipo texto
    },
    Modelo: {
        type: Sequelize.TEXT // Campo "Modelo" do tipo texto
    },
    Entrada: {
        type: Sequelize.TEXT // Campo "Entrada" do tipo texto
    },
    Saida: {
        type: Sequelize.TEXT // Campo "Saida" do tipo texto
    }
}, {
    timestamps: false // Desabilita a criação automática de createdAt e updatedAt
});

//função para verificar se a tabela já existe
async function verificarTabelaExistente() {
    try {
        const tabela = await sequelize.queryInterface.showAllTables();
        return tabela.incluides('Inventarios');
    } catch (err) {
        console.error('Erro ao verificar se a tabela existe: ', err);
        return false;
    }
}

//Função para criar a tabela se não existir
async function sincronizarTabela() {
    const tabelaExiste = await verificarTabelaExistente();
    if (!tabelaExiste) {
        await sequelize.sync();
        console.log('Tabela "inventarios" criada com sucesso.');
    } else {
        console.log('A tabela "inventarios" já existe.');
    }
}

//Função para solicitar entrada do usuário e criar entrada na tabela
function solicitarEntrada() {
    prompt.start();

    const schema = {
        properties: {
            Colaborador: { description: 'Colaborador:' },
            Patrimonio: { description: 'Patrimonio:' },
            Produto: { description: 'Produto:' },
            Marca: { description: 'Marca:' },
            Serie: { description: 'Serie:' },
            Modelo: { description: 'Modelo' },
            Entrada: { description: 'Entrada:' },
            Saida: { description: 'Saida' }
        }
    };

    prompt.get(schema, function (err, result) {
        if (err) {
            console.error('Erro ao solicitar entrada:', err);
            return;
        }

        Inventarios.create(result)
        .then( () => {
            console.log('Entrada criada com sucesso.');

    })
    .catch(err => {
        console.log('Erro ao criar entrada: ', err);
    });

    });
}

// Testando a conexão com o banco de dados
sequelize.authenticate() // Tenta autenticar a conexão com o banco de dados
    .then(function () {
        console.log("Conectado com sucesso!"); // Mensagem de sucesso ao se conectar ao banco de dados
    }).catch(function (erro) {
        console.log("Falha ao se conectar: " + erro) // Mensagem de falha ao conectar ao banco de dados
    });

module.exports = sequelize; // Exporta a instância do Sequelize para uso em outros módulo


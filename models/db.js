// Importando a classe Sequelize do módulo 'sequelize'
const Sequelize = require('sequelize');

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

// Sincronizando o modelo com o banco de dados e criando a tabela se não existir
sequelize.sync() // Executa a sincronização com o banco de dados
    .then(() => {
        console.log('Tabela "Inventarios" sincronizada com sucesso.'); // Mensagem de sucesso ao sincronizar a tabela
        // Criando uma entrada na tabela Inventarios após a sincronização
        return Inventarios.create({
            Colaborador: "Gabriel Rocha", // Dados do colaborador
            Patrimonio: "000570", // Número de patrimônio
            Produto: "Gabinete", // Produto relacionado ao patrimônio
            Marca: "Dell", // Marca do produto
            Serie: "BRG12JP87", // Número de série do produto
            Modelo: "Workstation T3610", // Modelo do produto
            Entrada: "Entrada", // Tipo de operação (entrada)
            Saida: "-" // Tipo de operação (saída)
        });
    })
    .then(() => {
        console.log('Entrada criada com sucesso.'); // Mensagem de sucesso ao criar a entrada na tabela
    })
    .catch(err => {
        console.error('Erro ao sincronizar tabela ou criar entrada:', err); // Mensagem de erro em caso de falha na sincronização ou criação de entrada
    });

// Testando a conexão com o banco de dados
sequelize.authenticate() // Tenta autenticar a conexão com o banco de dados
    .then(function () {
        console.log("Conectado com sucesso!"); // Mensagem de sucesso ao se conectar ao banco de dados
    }).catch(function (erro) {
        console.log("Falha ao se conectar: " + erro) // Mensagem de falha ao conectar ao banco de dados
    });

module.exports = sequelize; // Exporta a instância do Sequelize para uso em outros módulo

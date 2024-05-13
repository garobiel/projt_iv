const Sequelize = require('sequelize');
const prompt = require('prompt');

const sequelize = new Sequelize("conpat2", "root", "Amoskate123*", {
    host: 'localhost',
    dialect: 'mysql'
});

const Inventarios = sequelize.define('Inventarios', {
    Colaborador: {
        type: Sequelize.TEXT
    },
    Patrimonio: {
        type: Sequelize.STRING(6)
    },
    Produto: {
        type: Sequelize.TEXT
    },
    Marca: {
        type: Sequelize.TEXT
    },
    Serie: {
        type: Sequelize.TEXT
    },
    Modelo: {
        type: Sequelize.TEXT
    },
    Entrada: {
        type: Sequelize.TEXT
    },
    Saida: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: false,
    primaryKey: false
});

// Função para solicitar entrada do usuário para cada campo da tabela
function solicitarEntrada(campoAtual) {
    prompt.start();
    const campos = Object.keys(Inventarios.rawAttributes);

    // Função recursiva para solicitar entrada para cada campo sequencialmente
    function solicitarCampo(indice) {
        if (indice === campos.length) {
            // Se todos os campos foram preenchidos, cria uma entrada na tabela
            Inventarios.create(valores)
                .then(() => {
                    console.log('Entrada criada com sucesso.');
                })
                .catch(err => {
                    console.error('Erro ao criar entrada:', err);
                });
            return;
        }

        const campo = campos[indice];
        prompt.get(campo, function (err, result) {
            if (err) {
                console.error('Erro ao solicitar entrada:', err);
                return;
            }

            const valor = result[campo];

            // Verifica se o valor inserido não é nulo
            if (!valor) {
                console.error('O valor não pode estar vazio.');
                // Chama a função recursivamente para solicitar entrada novamente
                solicitarCampo(indice);
                return;
            }

            // Associa o valor ao campo correspondente
            valores[campo] = valor;

            // Chama a função recursivamente para o próximo campo
            solicitarCampo(indice + 1);
        });
    }

    // Objeto para armazenar os valores dos campos
    const valores = {};

    // Inicia a solicitação de entrada para o primeiro campo
    solicitarCampo(0);
}

// Sincronizando o modelo com o banco de dados e chamando a função para solicitar entrada
sequelize.sync()
    .then(() => {
        console.log('Tabela "Inventarios" sincronizada com sucesso.');
        solicitarEntrada(); // Chama a função para solicitar entrada do usuário
    })
    .catch(err => {
        console.error('Erro ao sincronizar tabela:', err);
    });

// Testando a conexão com o banco de dados
sequelize.authenticate()
    .then(function () {
        console.log("Conectado com sucesso!");
    }).catch(function (erro) {
        console.log("Falha ao se conectar: " + erro);
    });

module.exports = sequelize;

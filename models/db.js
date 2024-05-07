// Importando a classe Sequelize do módulo 'sequelize'
const Sequelize = require('sequelize');

// Criando uma instância do Sequelize para se conectar ao banco de dados MySQL
const sequelize = new Sequelize("conpat3", "root", "Amoskate123*", {
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
// Função para criar múltiplos registros na tabela Inventarios de maneira automática
async function criarDadosAutomaticamente() {
    try {
        // Defina quantos registros deseja criar
        const quantidadeRegistros = 10;

        // Array para armazenar os dados a serem inseridos na tabela
        const dadosParaInserir = [];

        // Loop para criar os dados
        for (let i = 0; i < quantidadeRegistros; i++) {
            // Crie os dados para o novo registro
            const novoRegistro = {
                Colaborador: "Nome do Colaborador " + i,
                Patrimonio: "000" + i, // Aqui você pode usar alguma lógica para gerar números de patrimônio únicos
                Produto: "Produto " + i,
                Marca: "Marca " + i,
                Serie: "Serie " + i,
                Modelo: "Modelo " + i,
                Entrada: "Entrada",
                Saida: "-"
            };

            // Adicione os dados ao array
            dadosParaInserir.push(novoRegistro);
        }

        // Insira os dados na tabela usando o método 'bulkCreate' do Sequelize
        await Inventarios.bulkCreate(dadosParaInserir);

        console.log('Dados criados automaticamente com sucesso.');
    } catch (error) {
        console.error('Erro ao criar dados automaticamente:', error);
    }
}
// Função para remover registros duplicados na tabela Inventarios de maneira automática
async function removerRegistrosDuplicados() {
    try {
        // Query SQL para selecionar registros únicos com base em Colaborador e Patrimonio
        const query = `
            DELETE FROM Inventarios 
            WHERE id NOT IN (
                SELECT MIN(id) 
                FROM Inventarios 
                GROUP BY Colaborador, Patrimonio
            )
        `;

        // Executa a consulta SQL para remover registros duplicados
        const resultado = await sequelize.query(query);

        console.log('Registros duplicados removidos com sucesso.');
    } catch (error) {
        console.error('Erro ao remover registros duplicados:', error);
    }
}

// Chame a função para remover registros duplicados automaticamente
removerRegistrosDuplicados();


// Chame a função para criar dados automaticamente
criarDadosAutomaticamente();


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

module.exports = sequelize; // Exporta a instância do Sequelize para uso em outros módulos

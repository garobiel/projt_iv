const mysql = require('mysql2/promise');
const prompt = require('prompt');

async function main() {
    // Configurações de conexão com o banco de dados
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Amoskate123*',
        database: 'conpat'
    });

    // Função para verificar se a tabela existe
    async function verificaTabelaExiste() {
        const [rows] = await connection.execute("SHOW TABLES LIKE 'Inventarios'");
        return rows.length > 0;
    }

    // Função para criar a tabela se ela não existir
    async function criarTabela() {
        const sql = `
            CREATE TABLE IF NOT EXISTS Inventarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                Colaborador TEXT,
                Patrimonio VARCHAR(6),
                Produto TEXT,
                Marca TEXT,
                Serie TEXT,
                Modelo TEXT,
                Entrada TEXT,
                Saida TEXT
            )
        `;
        await connection.execute(sql);
    }

    // Função para solicitar entrada do usuário para cada campo da tabela
    function solicitarEntrada(indice) {
        prompt.start();
        const campos = ['Colaborador', 'Patrimonio', 'Produto', 'Marca', 'Serie', 'Modelo', 'Entrada', 'Saida'];

        function solicitarCampo() {
            if (indice === campos.length) {
                // Se todos os campos foram preenchidos, insere uma entrada na tabela
                const sql = 'INSERT INTO Inventarios (Colaborador, Patrimonio, Produto, Marca, Serie, Modelo, Entrada, Saida) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                const valores = Object.values(valoresCampos);
                connection.execute(sql, valores)
                    .then(() => {
                        console.log('Entrada criada com sucesso.');
                        connection.end(); // Fecha a conexão após a inserção
                    })
                    .catch(err => {
                        console.error('Erro ao criar entrada:', err);
                        connection.end(); // Fecha a conexão em caso de erro
                    });
                return;
            }

            const campo = campos[indice];

            // Solicita entrada para o campo atual
            prompt.get(campo, function (err, result) {
                if (err) {
                    console.error('Erro ao solicitar entrada:', err);
                    return;
                }

                const valor = result[campo].trim();

                // Associa o valor ao campo correspondente
                valoresCampos[campo] = valor;

                // Chama a função recursivamente para o próximo campo
                solicitarEntrada(indice + 1);
            });
        }

        // Objeto para armazenar os valores dos campos
        const valoresCampos = {};

        // Inicia a solicitação de entrada para o campo atual
        solicitarCampo();
    }

    // Verifica se a tabela existe e a cria se necessário
    verificaTabelaExiste()
        .then(tabelaExiste => {
            if (!tabelaExiste) {
                return criarTabela();
            }
        })
        .then(() => {
            console.log('Tabela "Inventarios" verificada e criada com sucesso ou já existente.');
            // Inicia o processo de solicitação de entrada
            solicitarEntrada(0);
        })
        .catch(err => {
            console.error('Erro ao verificar ou criar a tabela:', err);
            connection.end(); // Fecha a conexão em caso de erro
        });
}

// Chama a função principal
main();

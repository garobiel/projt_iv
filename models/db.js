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
    async function solicitarEntrada(campos, valoresCampos, indice = 0) {
        if (indice >= campos.length) {
            await inserirNoBanco(valoresCampos);
            return;
        }

        const campo = campos[indice];
        let valor = await promptInput(campo);
        while (!valor) {
            console.error('O valor não pode estar vazio.');
            valor = await promptInput(campo);
        }
        valoresCampos[campo] = valor;
        console.clear(); // Limpa o console
        console.log('Campos preenchidos:');
        for (let i = 0; i <= indice; i++) {
            console.log(`${campos[i]}: ${valoresCampos[campos[i]]}`);
        }
        await solicitarEntrada(campos, valoresCampos, indice + 1);
    }

    // Função para inserir os valores no banco de dados
    async function inserirNoBanco(valoresCampos) {
        const campos = Object.keys(valoresCampos);
        const sql = `INSERT INTO Inventarios (${campos.join(', ')}) VALUES (${campos.map(() => '?').join(', ')})`;
        const valores = Object.values(valoresCampos);
        await connection.execute(sql, valores);
        console.log('Entrada criada com sucesso.');
        connection.end();
    }

    // Função auxiliar para solicitar entrada do usuário para um campo específico
    function promptInput(campo) {
        return new Promise((resolve, reject) => {
            prompt.get(campo, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[campo].trim());
                }
            });
        });
    }

    // Verifica se a tabela existe e a cria se necessário
    try {
        const tabelaExiste = await verificaTabelaExiste();
        if (!tabelaExiste) {
            await criarTabela();
        }
        console.log('Tabela "Inventarios" verificada e criada com sucesso ou já existente.');
        const campos = ['Colaborador', 'Patrimonio', 'Produto', 'Marca', 'Serie', 'Modelo', 'Entrada', 'Saida'];
        const valoresCampos = {};
        await solicitarEntrada(campos, valoresCampos);
    } catch (error) {
        console.error('Erro:', error);
        connection.end();
    }
}

// Chama a função principal
main().catch(err => console.error(err));

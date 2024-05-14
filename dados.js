const connection = require('./main'); // Importa a configuração do banco de dados
const mysql = require('mysql2/promise');

// Estabelece uma conexão com o banco de dados usando a configuração importada
mysql.createConnection(connection)
    .then(async conn => {
        // Realiza a consulta para criar a tabela
        await conn.query(`
            CREATE TABLE IF NOT EXISTS Controle_iv (
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
        `);
        console.log('Tabela criada com sucesso!');
        // Não se esqueça de fechar a conexão quando terminar de usar
        conn.end();
    })
    .catch(error => {
        console.error('Erro ao conectar ao banco de dados:', error);
    });

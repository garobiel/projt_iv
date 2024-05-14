// Importa o módulo mysql2/promise, que fornece uma interface Promise para interagir com o MySQL em Node.js.
const mysql = require('mysql2/promise');

// Cria um pool de conexões com o banco de dados MySQL usando a função createPool do módulo mysql2/promise.
// Um pool de conexões gerencia várias conexões com o banco de dados e as reutiliza conforme necessário para melhorar o desempenho e a eficiência.
const pool = mysql.createPool({
    host: 'localhost',      // Endereço do servidor do banco de dados (neste caso, localhost)
    user: 'root',           // Nome de usuário para acessar o banco de dados
    password: 'Amoskate123*', // Senha para acessar o banco de dados
    database: 'teste'       // Nome do banco de dados a ser usado
});

// Exporta o pool de conexões para que ele possa ser usado em outros arquivos JavaScript no projeto.
// Isso permite que outros arquivos importem o pool de conexões usando a instrução require('./main') e usem-no para interagir com o banco de dados MySQL.
module.exports = pool;

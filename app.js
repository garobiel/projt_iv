// app.js

const express = require('express');
const app = express();
const path = require('path');

//Importa o pool de conexões com o banco de dados MySQL
const pool = require('./main')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
    try {
        // Consulta ao banco de dados para obter os dados da tabela
        const [rows] = await pool.query('SELECT * FROM Controle_iv');

        // Renderiza a pagina HTML e envia os dados da tabela para ela.
        res.render('index', {dados: rows });
    } catch (error) {
        console.error('Erro ao obter dados do banco de dados:', error);
        res.status(500).send('Erro ao recuperar os dados do banco de dados');
    }
});

app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080');
});

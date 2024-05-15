// app.js

const express = require('express');
const app = express();
const db = require('./models/db');
const path = require('path');
const pool = require('./dados')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
    try {
        // Consulta ao banco de dados para obter os dados
        const dados = await pool.show(); // Suponha que obterDados() seja uma função que retorna os dados do banco de dados

        // Renderiza a visualização com os dados
        res.render('index', { dados });
    } catch (error) {
        console.error('Erro ao obter dados do banco de dados:', error);
        res.status(500).send('Erro ao recuperar os dados do banco de dados');
    }
});

app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080');
});

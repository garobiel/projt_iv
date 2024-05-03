const express = require('express');
const app = express();

const db = require('./models/db');

app.get("/", async(req, res) => {
    res.send("Página inicial - CONPAT ");

});

app.post

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080")

});

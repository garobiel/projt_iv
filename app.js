const express = require('express');
const app = express();
const conectdados = require('./dados')
const db = require('./models/db');

app.set('view engine', 'ejs')

app.get("/", async(req, res) => {
    

});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080")

});

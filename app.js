const express = require('express');
const app = express();
const conectdados = require('./dados')
const db = require('./models/db');
const rots = express.Router()
app.set('view engine', 'ejs')

rots.get("/", async(req, res) => {
    res.redirect('')

});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080")

});

module.exports = rots;
//Importação do mysql
const dados = require('mysql2/promise')

const connection = dados.createConnection({
    host:'localhost',
    user:'root',
    password:'Amoskate123*',
    database:'teste'

})


module.exports = connection;
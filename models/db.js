// Aqui estamos pegando dentro do modulo a classe sequelize e tambem estamos importando a biblioteca sequelize
const  Sequelize  = require('sequelize');

//Aqui vamos criar instancias(instancia e um objeto especifico criado aparti de uma classe ou de um contrutor)
const sequelize = new Sequelize( "conpat", "root","Amoskate123*", {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log("Conexão ativa!");
}).catch(function(){
    console.log("Falha ao se conectar: ")
});

module.exports = sequelize; 



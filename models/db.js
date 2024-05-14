// Aqui estamos pegando dentro do modulo a classe sequelize e tambem estamos importando a biblioteca sequelize
const  Sequelize  = require('sequelize');

//Aqui vamos criar instancias(instancia e um objeto especifico criado aparti de uma classe ou de um contrutor)
const sequelize = new Sequelize( "teste", "root","Amoskate123*", {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log("Conxexão com o banco de dados estabelecida com sucesso!");
}).catch(function(){
    console.log("Erro: Conexão com o banco de dados não realizada com sucesso!");
});

module.exports = sequelize; 




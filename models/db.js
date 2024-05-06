// Aqui estamos pegando dentro do modulo a classe sequelize e tambem estamos importando a biblioteca sequelize
const  Sequelize  = require('sequelize');

//Aqui vamos criar instancias(instancia e um objeto especifico criado aparti de uma classe ou de um contrutor)
const sequelize = new Sequelize( "conpat2", "root","Amoskate123*", {
    host: 'localhost',
    dialect: 'mysql'
});

const Usuario =  sequelize.define('Inventarios',  {
    Colaborador: {
        type: Sequelize.TEXT
 },
   Patrimonio: {
        type:Sequelize.STRING(6)
   },
    Produto: {
        type:Sequelize.TEXT
    },
    Serie: {
        type:Sequelize.TEXT
    }, 
    Modelo: {   
        type:Sequelize.TEXT
    },
    Entrada: {
        type:Sequelize.TEXT
    },
    Saida: {
        type:Sequelize.TEXT
    }

});

// Usuario.sync({force: true});
sequelize.authenticate()
    .then(function () {
        console.log("Conectado com sucesso!");
    }).catch(function (erro) {
        console.log("Falha ao se conectar : " + erro)
    });



module.exports = sequelize; 

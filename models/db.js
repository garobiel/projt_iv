// Importando a classe Sequelize do módulo 'sequelize'
const  Sequelize  = require('sequelize');

// Criando uma instância do Sequelize para se conectar ao banco de dados MySQL
const sequelize = new Sequelize( "conpat2", "root","Amoskate123*", {
    host: 'localhost',
    dialect: 'mysql'
});

// Definindo o modelo de dados para a tabela "Inventarios"
const Usuario =  sequelize.define('Inventarios',  {
    // Definindo os campos da tabela com seus tipos de dados
    Colaborador: {
        type: Sequelize.TEXT // Campo "Colaborador" do tipo texto
 },
   Patrimonio: {
       type: Sequelize.STRING(6) // Campo "Patrimonio" do tipo string com no máximo 6 caracteres
   },
    Produto: {
        type: Sequelize.TEXT // Campo "Produto" do tipo texto
    },
    Serie: {
        type: Sequelize.TEXT // Campo "Serie" do tipo texto
    }, 
    Modelo: {   
        type: Sequelize.TEXT // Campo "Modelo" do tipo texto
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

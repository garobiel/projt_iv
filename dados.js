const connection = require('./main') //Importa a configuração do banco de dados

connection.query(`CREATE TABLE Controle_iv (
    id intger primary key autoincrement,
    Colaborador TEXT,
    Patrimonio VARCHAR(6)

)
    
`) 

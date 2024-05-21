const pool = require('./main');

pool.getConnection()
    .then(async conn => {
        try { 
        await conn.query(`
            CREATE TABLE IF NOT EXISTS Controle_iv (
                id INT AUTO_INCREMENT PRIMARY KEY,
                Colaborador TEXT,
                Patrimonio VARCHAR(6),
                Produto TEXT,
                Marca TEXT,
                Serie TEXT,
                Modelo TEXT
              
            )
        `);
        await conn.query(`
            INSERT INTO controle_iv (
                Colaborador,
                Patrimonio,
                Produto,
                Marca,
                Serie,
                Modelo
            
            ) VALUES("Gabriel", "001001", "CPU", "DELL", "BRG12345", "T3610") 
        
        `);

        console.log('Dados inseridos com sucesso!');

        //Funcao para exibir os dados
        const show = async () => {
            const [rows] = await conn.query('SELECT * FROM controle_iv');
            console.log(rows);

        };

        await show(); //Chama a funcao para exibir os dados

        conn.release(); //Liberar a conexao de volta para o pool
    } catch (error) {
        console.error('Erro ao executar a query:', error);
        conn.release(); //Certifique-se de liberar a conexao em caso de erro
    }
})
.catch(error => {
    console.error('Erro ao conectar ao banco de dados')
}); 
 


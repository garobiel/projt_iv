const pool = require('./main');

pool.getConnection()
    .then(async conn => {
        await conn.query(`
            CREATE TABLE IF NOT EXISTS controle_iventario_2 (
                id INT AUTO_INCREMENT PRIMARY KEY,
                Colaborador TEXT,
                Patrimonio VARCHAR(6),
                Produto TEXT,
                Marca TEXT,
                Serie TEXT,
                Modelo TEXT,
                Entrada TEXT,
                Saida TEXT
            )
        `);
          
        await conn.query(`
        INSERT INTO controle_iventario_2 (
                Colaborador, 
                Patrimonio,
                Produto,
                Marca,
                Serie,
                Modelo,
                Entrada,
                Saida
            ) VALUES("Allan", "001001", "CPU", "DELL", "BRG12345", "T3610", "E", "-")
           
        `);
        const select = await conn.query(`
        SELECT * FROM controle_iventario_2
        `)
        console.log(select)

        
        console.log('Dados inseridos com sucesso!');
        conn.release(); // Liberar a conexão de volta para o pool
    })
    .catch(error => {
        console.error('Erro ao conectar ao banco de dados:', error);
    });
 
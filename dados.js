const pool = require('./main');

pool.getConnection()
    .then(async conn => {
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
        module.exports = {
            async show() {
                const select = await conn.query(`
        SELECT * FROM controle_iv
        `)
                console.log(select) 
            }
        }

        // dados.js

        const pool = require('./models/db');

        async function getAllData() {
            try {
                const [rows] = await pool.query('SELECT * FROM Inventarios');
                return rows;
            } catch (error) {
                throw error;
            }
        }

        module.exports = {
            getAllData
        };

        /*
                
                await conn.query(`
                INSERT INTO controle_iv (
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
                */
        console.log('Dados inseridos com sucesso!');
        conn.release(); // Liberar a conexão de volta para o pool
    })
    .catch(error => {
        console.error('Erro ao conectar ao banco de dados:', error);
    });



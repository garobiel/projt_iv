<<<<<<< HEAD
const mysql = require('mysql2/promise');
const prompt = require('prompt');
const { exec } = require('child_process');

async function main() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Amoskate123*',
        database: 'conpat'
    });

    async function verificaTabelaExiste() {
        const [rows] = await connection.execute("SHOW TABLES LIKE 'Inventarios'");
        return rows.length > 0;
    }

    async function criarTabela() {
        const sql = `
=======
const mysql = require('mysql2/promise'); // Importa o módulo mysql2/promise para interagir com o banco de dados MySQL de forma assíncrona.
const prompt = require('prompt'); // Importa o módulo prompt para solicitar entrada de dados do usuário no terminal.
const { exec } = require('child_process'); // Importa a função exec do módulo child_process para executar comandos no terminal.

async function main() { // Define a função assíncrona principal do programa.
    const connection = await mysql.createConnection({ // Estabelece uma conexão com o banco de dados MySQL.
        host: 'localhost', // Define o host do banco de dados.
        user: 'root', // Define o usuário do banco de dados.
        password: 'Amoskate123*', // Define a senha do banco de dados.
        database: 'conpat' // Define o nome do banco de dados.
    });

    async function verificaTabelaExiste() { // Define uma função assíncrona para verificar se a tabela 'Inventarios' existe no banco de dados.
        const [rows] = await connection.execute("SHOW TABLES LIKE 'Inventarios'"); // Executa uma consulta SQL para verificar a existência da tabela.
        return rows.length > 0; // Retorna true se a tabela existir, caso contrário, retorna false.
    }

    async function criarTabela() { // Define uma função assíncrona para criar a tabela 'Inventarios' no banco de dados, se ela não existir.
        const sql = `  Define a consulta SQL para criar a tabela 'Inventarios' com as colunas especificadas.
>>>>>>> d0ab0eba2d8cf09d028a1ad31ebd4ce8f8afc605
            CREATE TABLE IF NOT EXISTS Inventarios (
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
        `;
        await connection.execute(sql); // Executa a consulta SQL para criar a tabela no banco de dados.
    }
<<<<<<< HEAD

    async function solicitarEntrada(campos, valoresCampos, indice = 0) {
        if (indice >= campos.length) {
            await inserirNoBanco(valoresCampos);
            return;
=======
    
    async function solicitarEntrada(campos, valoresCampos, indice = 0) { // Define uma função assíncrona para solicitar entrada do usuário para cada campo da tabela.
        if (indice >= campos.length) { // Verifica se todos os campos foram preenchidos.
            await inserirNoBanco(valoresCampos); // Chama a função para inserir os valores no banco de dados.
            return; // Encerra a execução da função.
>>>>>>> d0ab0eba2d8cf09d028a1ad31ebd4ce8f8afc605
        }

        const campo = campos[indice]; // Obtém o nome do campo a ser preenchido.
        let valor = await promptInput(campo); // Solicita entrada do usuário para o campo especificado.
        while (!valor) { // Enquanto o valor estiver vazio, solicita novamente ao usuário.
            console.error('O valor não pode estar vazio.'); // Exibe uma mensagem de erro no console.
            valor = await promptInput(campo); // Solicita entrada do usuário novamente para o campo.
        }
        valoresCampos[campo] = valor; // Armazena o valor inserido pelo usuário no objeto de valores dos campos.
        console.clear(); // Limpa o console para uma nova entrada.
        console.log('Campos preenchidos:'); // Exibe uma mensagem indicando os campos preenchidos até o momento.
        for (let i = 0; i <= indice; i++) { // Itera sobre os campos preenchidos até o momento.
            console.log(`${campos[i]}: ${valoresCampos[campos[i]]}`); // Exibe o nome do campo e o valor correspondente.
        }
        await solicitarEntrada(campos, valoresCampos, indice + 1); // Chama recursivamente a função para o próximo campo.
    }

<<<<<<< HEAD
    async function inserirNoBanco(valoresCampos) {
        const campos = Object.keys(valoresCampos);
        const sql = `INSERT INTO Inventarios (${campos.join(', ')}) VALUES (${campos.map(() => '?').join(', ')})`;
        const valores = Object.values(valoresCampos);
        await connection.execute(sql, valores);
        console.log('Entrada criada com sucesso.');
        const resposta = await promptInput('Deseja preencher uma nova entrada? (Sim/Não)');
        if (resposta.trim().toLowerCase() === 'sim') {
            console.clear(); // Limpa o console
            await solicitarEntrada(campos, {}); // Reinicia o processo de preenchimento
        } else {
            connection.end(); // Encerra a conexão com o banco de dados
            console.log('Encerrando o programa...');
            process.exit(); // Encerra o processo Node.js
        }
    }

    function promptInput(campo) {
        return new Promise((resolve, reject) => {
            prompt.get(campo, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[campo].trim());
=======
    async function inserirNoBanco(valoresCampos) { // Define uma função assíncrona para inserir os valores no banco de dados.
        const campos = Object.keys(valoresCampos); // Obtém os nomes dos campos a partir do objeto de valores dos campos.
        const sql = `INSERT INTO Inventarios (${campos.join(', ')}) VALUES (${campos.map(() => '?').join(', ')})`; // Define a consulta SQL para inserir os valores na tabela.
        const valores = Object.values(valoresCampos); // Obtém os valores a serem inseridos a partir do objeto de valores dos campos.
        await connection.execute(sql, valores); // Executa a consulta SQL para inserir os valores no banco de dados.
        console.log('Entrada criada com sucesso.'); // Exibe uma mensagem indicando que a entrada foi criada com sucesso.
        const resposta = await promptInput('Deseja preencher uma nova entrada? (Sim/Não)'); // Solicita ao usuário se deseja preencher uma nova entrada.
        if (resposta.trim().toLowerCase() === 'sim') { // Verifica se a resposta é 'sim' (ignorando maiúsculas e minúsculas).
            console.clear(); // Limpa o console para iniciar um novo preenchimento.
            await solicitarEntrada(campos, {}); // Chama a função para solicitar entrada do usuário para preencher uma nova entrada.
        } else { // Se a resposta não for 'sim', encerra o programa.
            connection.end(); // Encerra a conexão com o banco de dados.
            console.log('Encerrando o programa...'); // Exibe uma mensagem indicando que o programa está sendo encerrado.
            process.exit(); // Encerra o processo Node.js.
        }
    }

    function promptInput(campo) { // Define uma função para solicitar entrada do usuário para um campo específico.
        return new Promise((resolve, reject) => { // Retorna uma Promise para lidar com a entrada assíncrona do usuário.
            prompt.get(campo, (err, result) => { // Solicita entrada do usuário utilizando o módulo prompt.
                if (err) { // Se ocorrer um erro durante a entrada do usuário.
                    reject(err); // Rejeita a Promise com o erro.
                } else { // Se a entrada do usuário for bem-sucedida.
                    resolve(result[campo].trim()); // Resolve a Promise com o valor inserido pelo usuário (removendo espaços em branco extras).
>>>>>>> d0ab0eba2d8cf09d028a1ad31ebd4ce8f8afc605
                }
            });
        });
    }

<<<<<<< HEAD
    try {
        const tabelaExiste = await verificaTabelaExiste();
        if (!tabelaExiste) {
            await criarTabela();
            console.log('Tabela "Inventarios" verificada e criada com sucesso!');
        } else {
            console.log('Tabela já existente.');
        }
        const campos = ['Colaborador', 'Patrimonio', 'Produto', 'Marca', 'Serie', 'Modelo', 'Entrada', 'Saida'];
        await solicitarEntrada(campos, {});
    } catch (error) {
        console.error('Erro:', error);
        connection.end();
    }
}

main().catch(err => console.error(err));
=======
    try { // Bloco try-catch para lidar com erros durante a execução do programa.
        const tabelaExiste = await verificaTabelaExiste(); // Verifica se a tabela 'Inventarios' existe no banco de dados.
        if (!tabelaExiste) { // Se a tabela não existir.
            await criarTabela(); // Cria a tabela 'Inventarios' no banco de dados.
            console.log('Tabela "Inventarios" criada com sucesso.'); // Exibe uma mensagem indicando que a tabela foi criada com sucesso.
        } else { // Se a tabela existir.
            console.log('Tabela "Inventarios" já existe.'); // Exibe uma mensagem indicando que a tabela já existe.
        }
        const campos = ['Colaborador', 'Patrimonio', 'Produto', 'Marca', 'Serie', 'Modelo', 'Entrada', 'Saida']; // Define os nomes dos campos da tabela.
        await solicitarEntrada(campos, {}); // Inicia o processo de solicitação de entrada do usuário para preencher os campos da tabela.
    } catch (error) { // Captura e trata qualquer erro ocorrido durante a execução do programa.
        console.error('Erro:', error); // Exibe o erro no console.
        connection.end(); // Encerra a conexão com o banco de dados.
    }
}

main().catch(err => console.error(err)); // Chama a função principal e lida com erros durante sua execução.
>>>>>>> d0ab0eba2d8cf09d028a1ad31ebd4ce8f8afc605

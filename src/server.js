require('dotenv').config();
const app = require('./app');
const connection = require('./config/database');

// Importar os modelos para o Sequelize saber que eles existem
require('./models/User');

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        // Isso sincroniza os modelos com o banco (cria as tabelas que não existem)
        await connection.sync(); 
        console.log('Banco de dados conectado e sincronizado!');
        console.log(`Servidor rodando na porta ${PORT}`);
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
});
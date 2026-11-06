const express = require('express');
const userRoutes = require('./routes/userRoutes'); // <-- Importamos a rota
const app = express();

//Middleware que permite a nossa API entender as requisições com corpo em JSON
app.use(express.json());

// Rota base para usuários (/v1/user) conforme o escopo
app.use('/v1/user', userRoutes);
//Rota de teste
app.get('/', (req, res) => {
  res.status(200).json('API funcionando corretamente!');
});

module.exports = app;

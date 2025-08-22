//importa o express, rotas e o middeware de tratamento de erro
const express = require('express');
const app = express();
const scheduleRoutes = require('./routes/scheduleCharge');
const scheduleErrorHandler = require('./middlewares/scheduleErrorHandler');

//Middleware para JSON
app.use(express.json());
//Rotas da API
app.use('/api', scheduleRoutes);
//Middleware de erro
app.use(scheduleErrorHandler);

//exporta o app para uso em testes
module.exports = app;
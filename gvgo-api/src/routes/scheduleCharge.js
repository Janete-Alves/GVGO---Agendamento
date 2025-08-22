// importa o Express, cria um roteador e importa o controller responsavel pelo agendamento
const express = require('express');
const router = express.Router();
const { scheduleCharge } = require('../controllers/scheduleController');

// rota de teste para verificar se a API está respondendo
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// define a rota POST para agendamento de cobrança
router.post('/schedule-charge', scheduleCharge);

module.exports = router;
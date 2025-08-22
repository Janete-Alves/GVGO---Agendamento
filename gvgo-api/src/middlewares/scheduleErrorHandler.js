//Middleware para tratamento de erros
function scheduleErrorHandler(err, req, res, next) {
  //console.error('Erro interno:', err.message);
  res.status(500).json({ erro: 'Erro no servidor.' });
}

module.exports = scheduleErrorHandler;
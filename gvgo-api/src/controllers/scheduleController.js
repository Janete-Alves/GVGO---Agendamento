//importa as funções de validação
const {
  validarCamposObrigatorios,
  validarEstacao,
  validarSQLInjection,
  validarDatas,
  validarValor
} = require('../utils/scheduleValidation');

//processa o agendamento de cobrança e extrai dados do corpo da requisição
function scheduleCharge(req, res, next) {
  try {
    const { user_id, station_id, start_time, end_time, valor } = req.body;

    //simula erro interno
    if (user_id === 'erro_500') throw new Error('Simulação de erro interno');

    //valida campos obrigatórios
    const erroCampos = validarCamposObrigatorios({ user_id, station_id, start_time, end_time });
    if (erroCampos) return res.status(400).json(erroCampos);

    //valida se a estação é valida
    const erroEstacao = validarEstacao(station_id);
    if (erroEstacao) return res.status(400).json(erroEstacao);

    //verifica se a tentativa de SQL Injection
    const erroSQL = validarSQLInjection(user_id, station_id, start_time, end_time);
    if (erroSQL) return res.status(400).json(erroSQL);

    //valida datas e converte para objetos Date
    const resultadoDatas = validarDatas(start_time, end_time);
    if (resultadoDatas.erro) return res.status(400).json(resultadoDatas);
    const { start, end } = resultadoDatas;

    //valida o valor informado
    const resultadoValor = validarValor(valor);
    if (resultadoValor.erro) return res.status(400).json(resultadoValor);
    const { valorNumerico } = resultadoValor;

    //monta os dados de resposta
    const dados = {
      user_id: user_id.trim(),
      station_id: station_id.trim(),
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      ...(valorNumerico != null && { valor: valorNumerico })
    };

    //Retorna sucesso
    return res.status(200).json({ message: 'Agendamento realizado com sucesso', dados });
  } catch (err) {
    next(err);
  }
}

module.exports = { scheduleCharge };
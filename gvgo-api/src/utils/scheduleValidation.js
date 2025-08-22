const estacoesValidas = ['station_001', 'station_002'];
const VALOR_MINIMO = 10;
const VALOR_MAXIMO = 1000;

//verifica se os campos obrigatorios foram preenchidos
function validarCamposObrigatorios({ user_id, station_id, start_time, end_time }) {
  if (!user_id?.trim() || !station_id?.trim() || !start_time || !end_time) {
    return { erro: 'Todos os campos obrigatórios devem ser preenchidos.' };
  }
  return null;
}

//verifica se a estação informada é valida
function validarEstacao(station_id) {
  if (!estacoesValidas.includes(station_id.trim())) {
    return { erro: 'Estação não encontrada.' };
  }
  return null;
}

//detecta padrões comuns de SQL Injection
function containsSQLInjection(value) {
  const regex = /('|--|;|\/\*|\*\/|\b(SELECT|INSERT|DELETE|UPDATE|DROP|UNION|OR|AND)\b)/i;
  return typeof value === 'string' && regex.test(value);
}

//aplica verificação de SQL Injection em multiplos campos
function validarSQLInjection(...campos) {
  for (const campo of campos) {
    if (containsSQLInjection(campo)) {
      return { erro: 'Entrada inválida detectada.' };
    }
  }
  return null;
}

//valida se as datas são validas e dentro do intervalo permitido
function validarDatas(start_time, end_time) {
  const start = new Date(start_time);
  const end = new Date(end_time);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { erro: 'Formato de data inválido.' };
  }

  const now = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(now.getFullYear() + 1);

  if (start > maxDate || end > maxDate) {
    return { erro: 'Data de agendamento fora do limite permitido.' };
  }

  return { start, end };
}

//valida se o valor é numérico e esta dentro do intervalo permitido
function validarValor(valor) {
  if (valor != null) {
    const valorNumerico = Number(valor);
    if (!Number.isFinite(valorNumerico)) {
      return { erro: 'Valor inválido.' };
    }
    if (valorNumerico < VALOR_MINIMO || valorNumerico > VALOR_MAXIMO) {
      return { erro: 'Valor fora do intervalo permitido.' };
    }
    return { valorNumerico };
  }
  return {};
}

//exporta todas as funções de validação
module.exports = {
  validarCamposObrigatorios,
  validarEstacao,
  containsSQLInjection,
  validarSQLInjection,
  validarDatas,
  validarValor
};
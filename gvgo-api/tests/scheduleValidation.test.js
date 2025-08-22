//importa as funções de validação que serão testadas
const {
    validarCamposObrigatorios,
    validarEstacao,
    validarValor
} = require('../src/utils/scheduleValidation');

// Esta agruando os testes relacionados as validações, verificando se os campos estão vazios
describe('Validações', () => {
    test('Campos obrigatórios', () => {
        const erro = validarCamposObrigatorios({ user_id: '', station_id: '', start_time: '', end_time: '' });
        expect(erro).toHaveProperty('erro');
    });
    //validando se a estação é invalida
    test('Estação válida', () => {
        const erro = validarEstacao('station_999');
        expect(erro).toHaveProperty('erro');
    });

    //validando se tem valor fora do intervalo permitido
    test('Valor fora do intervalo', () => {
        const erro = validarValor(5000);
        expect(erro).toHaveProperty('erro');
    });
});
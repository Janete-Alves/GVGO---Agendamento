//importa o supertest para simular requisições HTTP e o app Express configurado
const request = require('supertest');
const app = require('../src/app');

//Teste simula uma requisição POST com dados validos
describe('POST /api/schedule-charge', () => {
  it('deve retornar sucesso com dados válidos', async () => {
    const res = await request(app).post('/api/schedule-charge').send({
      user_id: 'user_123',
      station_id: 'station_001',
      start_time: '2025-09-01T10:00:00Z',
      end_time: '2025-09-01T11:00:00Z',
      valor: 100
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Agendamento realizado com sucesso');
  });
});
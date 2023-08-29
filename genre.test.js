const request = require('supertest');
const app = require('./app.js'); // Chemin vers votre fichier app.js

describe('GET /genres/:id', () => {
  it('responds with JSON containing the requested genre', async () => {
    const response = await request(app).get('/genres/2'); 
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('responds with 404 if genre is not found', async () => {
    const response = await request(app).get('/genres/50'); // ID qui n'existe pas
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Genre not found');
  });

  it('responds with 500 on server error', async () => {
   const response = await request(app).get('/genres/1');
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal server error');
  });
});

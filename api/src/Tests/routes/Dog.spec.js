const { expect } = require('chai');
const request = require('supertest');
const app = require('../app'); // Importa tu aplicación Express

describe('Dog routes', () => {
  it('GET /dogs should respond with status 200', (done) => {
    request(app)
      .get('/dogs')
      .expect(200, done);
  });

  it('GET /dogs/:id should respond with status 200 and return a dog', (done) => {
    request(app)
      .get('/dogs/1') // Utiliza un ID válido existente en tu base de datos
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        // Agrega más expectativas para verificar la estructura del objeto devuelto
        done();
      });
  });

  it('POST /dogs should respond with status 200 and create a new dog', (done) => {
    const newDog = {
      name: 'Test Dog',
      // Agrega más propiedades según la estructura de tu modelo de perro
    };

    request(app)
      .post('/dogs')
      .send(newDog)
      .expect(200, done);
  });
});
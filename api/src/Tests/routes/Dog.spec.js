const { expect } = require('chai');
const request = require('supertest');
const app = require('../app'); 
describe('Dog routes', () => {
  it('GET /dogs should respond with status 200', (done) => {
    request(app)
      .get('/dogs')
      .expect(200, done);
  });

  it('GET /dogs/:id should respond with status 200 and return a dog', (done) => {
    request(app)
      .get('/dogs/1') 
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        
        done();
      });
  });

  it('POST /dogs should respond with status 200 and create a new dog', (done) => {
    const newDog = {
      name: 'Test Dog',
    
    };

    request(app)
      .post('/dogs')
      .send(newDog)
      .expect(200, done);
  });
});
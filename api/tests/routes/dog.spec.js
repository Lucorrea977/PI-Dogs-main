const { expect } = require('chai');
const request = require('supertest');
const express = require('express');
const router = require('../../src/routes/DogRouter');

describe('Dog routes', () => {
  let app;

  before(() => {
    app = express();
    app.use('/dogs', router);
  });

  it('GET /dogs should respond with status 200', (done) => {
    request(app)
      .get('/dogs')
      .expect(200, done);
  });

  it('GET /dogs/:id should respond with status 200 and return a dog', async () => {
    const response = await request(app).get('/dogs/1'); 
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object'); 
  });
})
  
   
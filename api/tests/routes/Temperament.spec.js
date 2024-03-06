const { expect } = require('chai');
const request = require('supertest');
const express = require('express');
const router = require('../../src/routes/TemperamentRouter');

describe('Temperament routes', () => {
  let app;

  before(() => {
    app = express();
    app.use('/temperament', router);
  });

  it('GET /temperament should respond with status 200', (done) => {
    request(app)
      .get('/temperament')
      .expect(200, done);
  });

  it('GET /temperament should return an array of temperaments', (done) => {
    request(app)
      .get('/temperament')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
       
        done();
      });
  });
});
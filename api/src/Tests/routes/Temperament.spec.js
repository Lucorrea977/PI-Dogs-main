
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Temperament, conn } = require('../../src/db.js');

const agent = session(app);

describe('Temperament routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Temperament.sync({ force: true })
    .then(() => Temperament.create({ name: 'Calm' })));
  describe('GET /temperament', () => {
    it('should get 200', () =>
      agent.get('/temperament').expect(200)
    );
  });
});
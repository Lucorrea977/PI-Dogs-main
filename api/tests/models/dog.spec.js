const { expect } = require('chai');
const { Dog, Temperament, conn } = require('../../src/db');

describe('Dog model', () => {
  before(async () => {
    await conn.sync({ force: true });
  });

  it('should create a dog with associated temperament', async () => {
    const dog = await Dog.create({
      name: 'Pug',
      height_max: 30,
      height_min: 20,
      weight_max: 20,
      weight_min: 10
    });

    const temperament = await Temperament.create({
      name: 'Calm'
    });

    await dog.addTemperament(temperament);

    const foundDog = await Dog.findOne({
      where: { name: 'Pug' },
      include: Temperament
    });

    expect(foundDog).to.exist;
    expect(foundDog.name).to.equal('Pug');
    expect(foundDog.Temperaments).to.exist;
    expect(foundDog.Temperaments[0].name).to.equal('Calm');
  });

  it('should throw an error if name is null', async () => {
    let error;
    try {
      await Dog.create({
        height_max: 30,
        height_min: 20,
        weight_max: 20,
        weight_min: 10
      });
    } catch (err) {
      error = err;
    }
    expect(error).to.exist;
  });
});
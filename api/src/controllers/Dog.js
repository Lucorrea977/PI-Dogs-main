const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { getApi, getDb, getAllDogs } = require('../Helpers/DogHelper');

const getDogsByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    const apiInfo = await getApi();
    const dbInfo = await getDb();
    const information = apiInfo.concat(dbInfo);

    if (!name) {
      information.length
        ? res.status(200).send(information)
        : res.status(404).send("Api not found");
    } else {
      const dogName = information.filter((d) =>
        d.name.toLowerCase().includes(name.toLowerCase())
      );
      dogName.length
        ? res.status(200).send(dogName)
        : res.status(404).send("Dog not found");
    }
  } catch (error) {
    next(error);
  }
};

const getDogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dogsTotal = await getAllDogs();
    if (typeof id === "string" && id.length > 8) {
      let filter = dogsTotal.filter((el) => el.id == id);

      res.status(200).send(filter);
    } else {
      const api = await axios(
        ` https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`
      );
      const infoApi = api.data.map((response) => {
        return {
          id: response.id,
          name: response.name,
          life_span: response.life_span,
          weight: response.weight.metric,
          height: response.height.metric,
          temperament: response.temperament,
          origin: response.origin,
          image: response.image.url,
        };
      });

      const find = infoApi.find((data) => data.id === Number(id));

      res.status(200).json(find);
    }
  } catch (err) {
    next(err);
  }
};

const createDog = async (req, res, next) => {
  try {
    const {
      name,
      life_span,
      height_min,
      height_max,
      weight_min,
      weight_max,
      origin,
      image,
      temperament,
      createInDb,
    } = req.body;

    const newDog = await Dog.create({
      name,
      life_span,
      height_min,
      height_max,
      weight_min,
      weight_max,
      origin,
      image,
      temperament,
      createInDb,
    });

    const dogTemperament = await Temperament.findOne({
      where: {
        name: temperament,
      },
    });

    if (!dogTemperament) {
    
      throw new Error('Temperament not found');
    }

    await newDog.addTemperament(dogTemperament);
    res.status(200).send("Dog created successfully");
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getDogsByName,
  getDogById,
  createDog,
};
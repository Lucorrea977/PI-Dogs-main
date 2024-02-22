const axios = require("axios");
const { Dog, Temperament } = require("../db");

const getApi = async () => {
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`
    );
    const infoApi = response.data.map((response) => ({
      id: response.id,
      name: response.name,
      weight: response.weight.metric.split("-"),
      temperament: response.temperament,
      image: response.image.url,
    }));
    return infoApi;
  } catch (error) {
    throw new Error("Error fetching data from external API");
  }
};

const getDb = async () => {
  try {
    return await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {
    throw new Error("Error fetching data from database");
  }
};

const getAllDogs = async () => {
  try {
    const apiInfo = await getApi();
    const dbInfo = await getDb();
    const information = apiInfo.concat(dbInfo);
    return information;
  } catch (error) {
    throw new Error("Error fetching all dogs");
  }
};

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
        `https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`
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

    const createDog = await Dog.create({
      name,
      life_span,
      height_min,
      height_max,
      weight_min,
      weight_max,
      origin,
      image,
      createInDb,
    });

    const dogTemperament = await Temperament.findAll({
      where: {
        name: temperament,
      },
    });

    await createDog.addTemperament(dogTemperament);
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
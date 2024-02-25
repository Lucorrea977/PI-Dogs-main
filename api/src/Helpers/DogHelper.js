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

module.exports = {
  getApi,
  getDb,
  getAllDogs,
};
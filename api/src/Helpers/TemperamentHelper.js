const axios = require("axios");
const { Temperament } = require("../db");

const getTemperamentsFromAPI = async () => {
  try {
    const temperamentApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`
    );
    const infoTemperament = temperamentApi.data.map((d) => {
      return {
        temperament: d.temperament,
      };
    });

    const filteredTemperaments = infoTemperament
      .map((d) => d.temperament)
      .filter((t) => t !== undefined)
      .flatMap((t) => t.split(",").map((t) => t.trim()));

    const uniqueTemperaments = [...new Set(filteredTemperaments)].sort();

    return uniqueTemperaments;
  } catch (error) {
    throw error;
  }
};

const saveTemperamentsToDB = async (temperaments) => {
  try {
    const dbApi = temperaments.map((d) => {
      return Temperament.findOrCreate({
        where: {
          name: d,
        },
      });
    });

    await Promise.all(dbApi);

    const infoDbApi = await Temperament.findAll();
    return infoDbApi;
  } catch (error) {
    throw error;
  }
};

module.exports = {
    getTemperamentsFromAPI,
  saveTemperamentsToDB,
};
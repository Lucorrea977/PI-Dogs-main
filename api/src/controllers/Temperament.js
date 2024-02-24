const axios = require("axios");
const { Temperament } = require("../db");

const getTemperaments = async (req, res, next) => {
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

    const dbApi = uniqueTemperaments.map((d) => {
      return Temperament.findOrCreate({
        where: {
          name: d,
        },
      });
    });

    const infoDbApi = await Temperament.findAll();

    res.status(200).json(infoDbApi);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTemperaments,
};
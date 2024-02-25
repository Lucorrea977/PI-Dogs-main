const { getTemperamentsFromAPI, saveTemperamentsToDB } = require('../Helpers/TemperamentHelper');

const getTemperaments = async (req, res, next) => {
  try {
    const temperamentsFromAPI = await getTemperamentsFromAPI();
    const temperamentsFromDB = await saveTemperamentsToDB(temperamentsFromAPI);
    
    res.status(200).json(temperamentsFromDB);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTemperaments,
};
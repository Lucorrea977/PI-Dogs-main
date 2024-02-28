const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

async function getAllDogsFromApi() {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Error in response data format from external API.');
    }
    return response.data;
  } catch (error) {
    console.error('Error getting dogs from external API:', error);
    throw new Error('Error getting dogs from external API.');
  }
}

module.exports = {
  getAllDogsFromApi
};
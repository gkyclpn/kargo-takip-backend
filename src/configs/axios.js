const axios = require('axios');

const instance = axios.create({
  baseURL: process.env.GOOGLE_BASE_URL,
});

module.exports = instance
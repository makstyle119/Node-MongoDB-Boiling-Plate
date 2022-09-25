require('dotenv/config');
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const API_URL = process.env.API_URL;
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = { NODE_ENV, PORT, API_URL, SECRET_KEY };

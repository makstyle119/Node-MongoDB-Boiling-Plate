const express = require('express');
const { PORT, API_URL, NODE_ENV } = require('./config');
const Connect = require('./Database/MongoDB');
const routes = require('./routes');
require('dotenv/config');

const app = express();

// env Declaration
const port = PORT || 5000;
const api = API_URL || 'api/v1';

// Body Parser Middleware
app.use(express.json());

// Routes
app.use(`${api}`, routes);

// Get
if (NODE_ENV == 'production') {
  app.get('/', (req, res) => {
    res.send('BACKEND LIVE Production !');
  });
} else {
  app.get('/', (req, res) => {
    res.send('BACKEND LIVE Development!');
  });
}

// listen
app.listen(port, () => {
  Connect();
  console.log(`Example app listening at http://localhost:${port}`);
});

const express = require('express');
const Connect = require('./Database/MongoDB');
const routes = require('./routes');
require('dotenv/config');

const app = express();

// env Declaration
const port = process.env.PORT || 5000;
const api = process.env.API_URL || 'api/v1';

// Body Parser Middleware
app.use(express.json());

// Routes
app.use(`${api}`, routes);

// Get
if (process.env.NODE_ENV == 'production') {
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

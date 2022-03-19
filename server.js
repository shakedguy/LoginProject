const express = require('express');
// const dotnev = require('dotenv');
// dotnev.config({ path: `${__dirname}/config.env` });
const server = express();
const port = process.env.PORT || 3000;
const app = require('./app');

server.use(app);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

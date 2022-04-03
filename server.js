const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const dotnev = require('dotenv');
dotnev.config({ path: `${__dirname}/config.env` });

const server = express();
const port = process.env.PORT || 3000;
const app = require('./app');

server.use(app);

if (process.env.NODE_ENV === 'development') {
  https
    .createServer(
      {
        pfx: fs.readFileSync(path.join(__dirname, 'certificates', 'domain.pfx')),
        passphrase: process.env.SSL_PASSPHRASE,
      },
      server
    )
    .listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
} else {
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

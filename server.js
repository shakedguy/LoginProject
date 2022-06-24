import express from 'express';
import app from './app.js';
import {} from './utils/configEnv.js';

const server = express();

const port = process.env.PORT || 3000;

server.use(app);

server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

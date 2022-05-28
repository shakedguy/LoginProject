import express from 'express';
import {} from './utils/configEnv.js';
import app from './app.js';

const server = express();
const port = process.env.PORT || 3000;

server.use(app);

server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

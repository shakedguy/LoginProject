import express from 'express';

const indexRoute = express.Router();
import { getHomePage } from '../controllers/homeController.js';

indexRoute.route('/').get(getHomePage);

indexRoute.route('/home').get((req, res) => res.redirect('/'));

export default indexRoute;

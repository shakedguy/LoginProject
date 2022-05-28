import express from 'express';
const mobileLoginRoute = express.Router();
import { mobileLogin } from '../controllers/loginController.js';

mobileLoginRoute.route('/').get(mobileLogin);

export default mobileLoginRoute;

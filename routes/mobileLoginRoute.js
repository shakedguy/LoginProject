import express from 'express';
const mobileLoginRoute = express.Router();
import { mobileLogin } from '../controllers/loginController.js';

mobileLoginRoute.route('/').post(mobileLogin);

export default mobileLoginRoute;

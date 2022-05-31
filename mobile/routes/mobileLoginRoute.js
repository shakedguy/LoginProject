import express from 'express';
const mobileLoginRoute = express.Router();
import { mobileLogin } from '../controllers/mobileLoginController.js';

mobileLoginRoute.route('/').post(mobileLogin);

export default mobileLoginRoute;

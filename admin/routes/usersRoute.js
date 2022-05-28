import express from 'express';
import authorizationMiddleware from '../../middlewares/authorization.js';
import userDataCookieMiddleware from '../../middlewares/userDataCookie.js';
import { getAllUsers } from '../controllers/usersController.js';
const usersRoute = express.Router();

usersRoute.use(authorizationMiddleware);
usersRoute.use(userDataCookieMiddleware);

usersRoute.route('/').get(getAllUsers);

export default usersRoute;

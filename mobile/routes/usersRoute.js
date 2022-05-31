import express from 'express';
import { getAllUsers } from '../controllers/usersController.js';
const usersRoute = express.Router();
usersRoute.route('/').get(getAllUsers);

export default usersRoute;

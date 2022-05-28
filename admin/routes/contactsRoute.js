import express from 'express';
import { getAllContacts } from '../controllers/contactsController.js';
import authorizationMiddleware from '../../middlewares/authorization.js';
import userDataCookieMiddleware from '../../middlewares/userDataCookie.js';
const contactsRoute = express.Router();

contactsRoute.use(authorizationMiddleware);
contactsRoute.use(userDataCookieMiddleware);

contactsRoute.route('/').get(getAllContacts);

export default contactsRoute;

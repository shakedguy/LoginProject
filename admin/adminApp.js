import express from 'express';
const adminApp = express();
import { getMenuItems } from '../controllers/menuController.js';
import { getLoginPage, login } from '../controllers/loginController.js';
import { logout } from '../controllers/logoutController.js';
import { getHomePage } from '../controllers/homeController.js';
import profileAdminRoute from './routes/profileAdminRoute.js';
import messagesRoute from './routes/messagesRoute.js';
import usersRoute from './routes/usersRoute.js';
import contactsRoute from './routes/contactsRoute.js';
const staticFolder = new URL('../public/', import.meta.url).pathname;
const staticJs = new URL('../public/js/', import.meta.url).pathname;
const staticCss = new URL('../public/css/', import.meta.url).pathname;

adminApp.get('/', getHomePage);
adminApp.get('/home', (req, res) => res.redirect('/admin'));
adminApp.route('/login').get(getLoginPage).post(login);
adminApp.route('/logout').get(logout);
adminApp.use('/profile', profileAdminRoute);
adminApp.get('/api/menu', getMenuItems);
adminApp.use('/messages', messagesRoute);
adminApp.use('/users', usersRoute);
adminApp.use('/api/contacts', contactsRoute);

adminApp.use(express.static(staticFolder));
adminApp.use('/css', express.static(staticCss));
adminApp.use('/js', express.static(staticJs));

export default adminApp;

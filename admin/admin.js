const path = require('path');
const express = require('express');
const admin = express();
const { getMenuItems } = require(path.join(__dirname, '..', 'controllers', 'menuController.js'));
const { getLoginPage, login } = require(path.join(__dirname, '..', 'controllers', 'loginController'));
const { logout } = require(path.join(__dirname, '..', 'controllers', 'logoutController'));
const { getHomePage } = require(path.join(__dirname, '..', 'controllers', 'homeController'));

admin.get('/', getHomePage);
admin.get('/home', (req, res) => res.redirect('/admin'));
admin.route('/login').get(getLoginPage).post(login);
admin.route('/logout').get(logout);
admin.use('/profile', require(path.join(__dirname, 'routes', 'profileAdminRoute')));
admin.get('/api/menu', getMenuItems);
admin.use('/messages', require(path.join(__dirname, 'routes', 'messagesRoute')));
admin.use('/users', require(path.join(__dirname, 'routes', 'usersRoute')));
admin.use('/api/contacts', require(path.join(__dirname, 'routes', 'contactsRoute')));

admin.use(express.static(path.join(__dirname, 'public')));
admin.use('/css', express.static(path.join(__dirname, '..', 'public', 'css')));
admin.use('/js', express.static(path.join(__dirname, '..', 'public', 'js')));
admin.use('/js', express.static(path.join(__dirname, '..', 'node_modules/bootstrap/dist/js')));
admin.use('/css', express.static(path.join(__dirname, '..', 'node_modules/bootstrap/dist/css')));

module.exports = admin;

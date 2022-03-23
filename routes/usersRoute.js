const express = require('express');
const path = require('path');
const router = express.Router();
const { fetchContact } = require(path.join(__dirname, '..', 'controllers', 'contactsController.js'));
const { getAllUsers } = require(path.join(__dirname, '..', 'controllers', 'usersController.js'));

router.use(require(path.join(__dirname, '..', 'middlewares', 'authorization.js')));
router.use(require(path.join(__dirname, '..', 'middlewares', 'userDataCookie.js')));

router.route('/').get(fetchContact, getAllUsers);

module.exports = router;

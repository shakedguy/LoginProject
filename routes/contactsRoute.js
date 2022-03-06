const express = require('express');
const path = require('path');
const router = express.Router();
const { getAllContacts } = require(path.join(__dirname, '..', 'controllers', 'contactsController.js'));

router.use(require(path.join(__dirname, '..', 'middlewares', 'authorization.js')));
router.use(require(path.join(__dirname, '..', 'middlewares', 'userDataCookie.js')));

router.route('/').get(getAllContacts);

module.exports = router;

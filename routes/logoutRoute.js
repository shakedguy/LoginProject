const express = require('express');
const router = express.Router();
const path = require('path');
const { logout } = require(path.join(__dirname, '..', 'controllers', 'logoutController.js'));

router.route('/').get(logout);

module.exports = router;

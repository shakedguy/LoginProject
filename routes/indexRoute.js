const express = require('express');
const path = require('path');
const router = express.Router();
const { getHomePage } = require(path.join(__dirname, '..', 'controllers', 'homeController.js'));

router.route('/').get(getHomePage);

module.exports = router;

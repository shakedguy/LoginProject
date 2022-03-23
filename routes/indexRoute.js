const express = require('express');
const path = require('path');
const router = express.Router();
const { getHomePage } = require(path.join(__dirname, '..', 'controllers', 'homeController.js'));

router.route('/').get(getHomePage);

router.route('/home').get((req, res) => res.redirect('/'));

module.exports = router;

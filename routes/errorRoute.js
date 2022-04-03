const express = require('express');
const path = require('path');
const router = express.Router();
const { getErrorPage } = require(path.join(__dirname, '..', 'controllers', 'errorController.js'));

router.route('/').get(getErrorPage);

module.exports = router;

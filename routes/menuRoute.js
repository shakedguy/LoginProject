const express = require('express');
const router = express.Router();
const path = require('path');
const { getMenuItems } = require(path.join(__dirname, '..', 'controllers', 'menuController.js'));

router.route('/').get(getMenuItems);

module.exports = router;

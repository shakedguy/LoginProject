const express = require('express');
const router = express.Router();
const { getLoginPage, login } = require('../controllers/loginController');

router.route('/').get(getLoginPage).post(login);

module.exports = router;

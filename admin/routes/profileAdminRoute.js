const express = require('express');
const path = require('path');
const router = express.Router();
const { getProfilePage } = require(path.join(__dirname, '..', '..', 'controllers', 'profileController'));

router.use(require(path.join(__dirname, '..', '..', 'middlewares', 'authorization.js')));
router.use(require(path.join(__dirname, '..', '..', 'middlewares', 'userDataCookie.js')));

router.route('/').get(getProfilePage);

module.exports = router;

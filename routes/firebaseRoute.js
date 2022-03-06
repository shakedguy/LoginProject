const express = require('express');
const path = require('path');
const { getFirebaseConfig } = require(path.join(__dirname, '..', 'controllers', 'firebaseController.js'));

const router = express.Router();

router.route('/').get(getFirebaseConfig);

module.exports = router;

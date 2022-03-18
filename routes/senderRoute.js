const express = require('express');
const path = require('path');
const router = express.Router();
const { getSenderPage, prepareMessages, sendMessage } = require(path.join(
  __dirname,
  '..',
  'controllers',
  'senderController.js'
));

router.use(require(path.join(__dirname, '..', 'middlewares', 'authorization.js')));
router.use(require(path.join(__dirname, '..', 'middlewares', 'userDataCookie.js')));

router.route('/').get(getSenderPage).post(prepareMessages, sendMessage);

module.exports = router;

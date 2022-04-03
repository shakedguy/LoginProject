const express = require('express');
const path = require('path');
const router = express.Router();
const { getSenderPage, prepareMessages, sendMessage, receivingMessages, handler } = require(path.join(
  __dirname,
  '..',
  'controllers',
  'messagesController.js'
));

router.use(require(path.join(__dirname, '..', '..', 'middlewares', 'authorization.js')));
router.use(require(path.join(__dirname, '..', '..', 'middlewares', 'userDataCookie.js')));

router.route('/').get(getSenderPage);
router.route('/:via').post(prepareMessages, sendMessage);

router.route('/receive').all(receivingMessages);
module.exports = router;

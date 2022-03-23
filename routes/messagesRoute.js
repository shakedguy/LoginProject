const express = require('express');
const path = require('path');
const router = express.Router();
const { getSenderPage, prepareMessages, sendMessage, receiveWhatsppMessage, whatsppMessageStatus } = require(path.join(
  __dirname,
  '..',
  'controllers',
  'messagesController.js'
));

router.use(require(path.join(__dirname, '..', 'middlewares', 'authorization.js')));
router.use(require(path.join(__dirname, '..', 'middlewares', 'userDataCookie.js')));

router.route('/').get(getSenderPage).post(prepareMessages, sendMessage);
router.route('/whatsapp').post(receiveWhatsppMessage).put(whatsppMessageStatus);

module.exports = router;

const path = require('path');
const admin = require('firebase-admin');
const { getContacts } = require(path.join(__dirname, '..', 'utils', 'helpers.js'));
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);
const messagingServiceSid = process.env.MESSAGING_SERVICE_SID;
const firebaseConfig = require(path.join(__dirname, '..', 'utils', 'firebaseConfigs.js'));

let contacts = [];
const db = admin.database();
const ref = db.ref('/');
ref.once('value', (snapshot) => {
  contacts = getContacts(snapshot.val().Contacts);
});

exports.getSenderPage = (req, res) => {
  res.render('sender', {
    title: 'Messages Page',
    isLogedIn: true,
    userData: req.userData,
    firebaseConfig,
    contacts,
  });
};

exports.prepareMessages = (req, res, next) => {
  const { contacts, message, sendAt, via, now } = req.body;
  const messages = [];
  contacts.map((contact) => {
    if (contact.send) {
      const messageObj = {
        messagingServiceSid,
        body: message || `Hi ${contact.name}, this is a test message from ${req.userData.name}`,
        to: `${via === 'whatsapp' ? 'whatsapp:' : ''}${contact.phone}`,
      };
      if (!now) {
        messageObj['sendAt'] = sendAt;
        messageObj['scheduleType'] = 'fixed';
      }
      if (via === 'whatsapp') {
        messageObj['from'] = 'whatsapp:+14155238886';
      }
      messages.push(messageObj);
    }
  });

  req.messages = messages;
  next();
};

exports.sendMessage = (req, res) => {
  const { messages } = req;
  messages.map((message) => {
    twilio.messages
      .create(message)
      .then((message) => console.log(message.sid))
      .done();
  });
  res.end(JSON.stringify({ status: 'success' }));
};

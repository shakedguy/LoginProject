const path = require('path');
const admin = require('firebase-admin');
const { getContacts } = require(path.join(__dirname, '..', 'utils', 'helpers.js'));
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const firebaseConfig = require(path.join(__dirname, '..', 'utils', 'firebaseConfigs.js'));

let contacts = [];
const db = admin.database();
const ref = db.ref('/');
ref.once('value', (snapshot) => {
  contacts = getContacts(snapshot.val().Contacts);
});

const from = process.env.TWILIO_NUMBER;

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
        from: `${via === 'whatsapp' ? 'whatsapp:' : ''}${from}`,
        body: message || `Hi ${contact.name}, this is a test message from ${req.userData.name}`,
        to: `${via === 'whatsapp' ? 'whatsapp:' : ''}${contact.phone}`,
      };
      if (!now) {
        messageObj['sendAt'] = sendAt;
        messageObj['scheduleType'] = 'fixed';
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

exports.receiveSmsMessage = (req, res) => {};
exports.receiveWhatsppMessage = (req, res) => {
  console.log(req.body);
};

exports.whatsppMessageStatus = (req, res) => {
  console.log(req.body);
};

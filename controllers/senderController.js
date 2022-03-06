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

exports.sendMessage = (req, res) => {
  const contacts = req.body.contacts;
  const sendAt = req.body.sendAt;
  const message = req.body.message || null;
  console.log(req.body);
  contacts.map((contact) => {
    if (contact.send) {
      if (req.body.now) {
        if (req.body.via === 'whatsapp') {
          twilio.messages
            .create({
              messagingServiceSid,
              body: message || `Hi ${contact.name}, this is a test message from ${req.userData.name}`,
              to: 'whatsapp:' + contact.phone,
            })
            .then((message) => console.log(message.sid))
            .done();
        } else {
          twilio.messages
            .create({
              messagingServiceSid,
              body: message || `Hi ${contact.name}, this is a test message from ${req.userData.name}`,
              to: contact.phone,
            })
            .then((message) => console.log(message.sid))
            .done();
        }
      } else {
        if (req.body.via === 'whatsapp') {
          twilio.messages
            .create({
              messagingServiceSid,
              body: message || `Hi ${contact.name}, this is a test message from ${req.userData.name}`,
              sendAt,
              scheduleType: 'fixed',
              to: 'whatsapp:' + contact.phone,
            })
            .then((message) => console.log(message.sid))
            .done();
        } else {
          twilio.messages
            .create({
              messagingServiceSid,
              body: message || `Hi ${contact.name}, this is a test message from ${req.userData.name}`,
              sendAt,
              scheduleType: 'fixed',
              to: contact.phone,
            })
            .then((message) => console.log(message.sid))
            .done();
        }
      }
    }
  });
  res.end(JSON.stringify({ status: 'success' }));
};

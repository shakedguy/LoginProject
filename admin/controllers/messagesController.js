const path = require('path');
const admin = require('firebase-admin');
const { getContacts } = require(path.join(__dirname, '..', '..', 'utils', 'helpers.js'));
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const firebaseConfig = require(path.join(__dirname, '..', '..', 'utils', 'firebaseConfigs.js'));
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

let contacts = [];
const db = admin.database();
const ref = db.ref('/');
ref.once('value', (snapshot) => {
  contacts = getContacts(snapshot.val().Contacts);
});

const from = process.env.TWILIO_NUMBER;

exports.getSenderPage = (req, res) => {
  const admin = req.baseUrl.includes('admin');
  if (admin) {
    res.render('sender', {
      title: 'Messages Page',
      isLogedIn: true,
      userData: req.userData,
      firebaseConfig,
      contacts,
    });
  } else {
    res.render('error', {
      title: 'Error Page',
      message: 'Unauthorized, Admin only',
      isLogedIn: true,
      userData: req.userData,
      firebaseConfig,
      contacts,
    });
  }
};

exports.prepareMessages = (req, res, next) => {
  const { contacts, message, sendAt, now, subject } = req.body;
  const { via } = req.params;
  const messages = [];
  contacts.map((contact) => {
    if (contact.send) {
      let messageObj = {};
      if (via === 'email') {
        messageObj = {
          to: contact.email,
          from: 'shakedguy94@gmail.com',
          subject: subject || 'Message from Guy Shaked',
          text: message || `Hi ${contact.displayName || ''}, this is a test message from ${req.userData.name}`,
        };
      } else {
        messageObj = {
          messagingServiceSid,
          from: `${via === 'whatsapp' ? 'whatsapp:' : ''}${from}`,
          body: message || `Hi ${contact.displayName || ''}, this is a test message from ${req.userData.name}`,
          to: `${via === 'whatsapp' ? 'whatsapp:' : ''}${contact.phoneNumber}`,
        };
        if (!now) {
          messageObj['sendAt'] = sendAt;
          messageObj['scheduleType'] = 'fixed';
        }
      }
      messages.push(messageObj);
    }
  });

  req.messages = messages;
  next();
};

exports.sendMessage = (req, res) => {
  const { messages } = req;
  const { via } = req.params;
  const admin = req.baseUrl.includes('admin');
  if (admin) {
    if (via === 'email') {
      messages.map((message) => {
        sgMail.send(message).then((message) => console.log('Email sent'));
      });
    } else {
      messages.map((message) => {
        twilio.messages
          .create(message)
          .then((message) => console.log(message.sid))
          .done();
      });
      res.end(JSON.stringify({ status: 'success' }));
    }
  } else {
    res.end(JSON.stringify({ status: 'Unauthorized, Admin only' }));
  }
};

exports.receivingMessages = (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
};

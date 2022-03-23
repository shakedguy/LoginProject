const path = require('path');
const admin = require('firebase-admin');
const { getContacts } = require(path.join(__dirname, '..', 'utils', 'helpers.js'));

let contacts = [];
const db = admin.database();
const ref = db.ref('/');
ref.once('value', (snapshot) => {
  contacts = getContacts(snapshot.val().Contacts);
});

exports.fetchContact = (req, res, next) => {
  req.contacts = contacts;
  next();
};

exports.getAllContacts = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      contacts,
    },
  });
};

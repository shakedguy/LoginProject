const path = require('path');
const admin = require('firebase-admin');
const { getContacts, getUsers } = require(path.join(__dirname, '..', '..', 'utils', 'helpers.js'));

let contacts = [];
const db = admin.database();
const ref = db.ref('/');
ref.on('value', (snapshot) => {
  contacts = getUsers(snapshot.val().Users);
});

exports.fetchContact = (req, res, next) => {
  req.contacts = contacts;
  next();
};

exports.getAllContacts = (req, res) => {
  const admin = req.baseUrl.includes('admin');
  if (admin) {
    res.status(200).json({
      status: 'success',
      data: {
        contacts,
      },
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {},
    });
  }
};

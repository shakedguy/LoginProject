const path = require('path');

const firebaseConfig = require(path.join(__dirname, '..', 'utils', 'firebaseConfigs.js'));

exports.getAllUsers = (req, res) => {
  res.render('users', {
    users: req.contacts,
    title: 'Users Page',
    firebaseConfig,
    isLogedIn: true,
    userData: req.userData,
  });
};

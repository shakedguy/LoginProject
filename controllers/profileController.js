const path = require('path');

const firebaseConfig = require(path.join(__dirname, '..', 'utils', 'firebaseConfigs.js'));
exports.getProfilePage = (req, res) => {
  res.render('profile', {
    title: 'Profile Page',
    isLogedIn: true,
    userData: req.userData,
    firebaseConfig,
    isAlreadyLogedIn: false,
  });
};

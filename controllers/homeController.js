const path = require('path');

const firebaseConfig = require(path.join(__dirname, '..', 'utils', 'firebaseConfigs.js'));

exports.getHomePage = (req, res) => {
  const sessionCookie = req.cookies.idToken || null;
  const isLogedIn = sessionCookie ? true : false;
  const userData = req.cookies.userData || null;

  res.render('index', {
    title: 'Home Page',
    isLogedIn,
    firebaseConfig,
    userData,
  });
};

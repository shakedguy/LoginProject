const path = require('path');

const firebaseConfig = require(path.join(__dirname, '..', 'utils', 'firebaseConfigs.js'));

exports.getErrorPage = (req, res) => {
  const sessionCookie = req.cookies.idToken || null;
  const isLogedIn = sessionCookie ? true : false;
  const userData = req.cookies.userData || null;

  res.render('error', {
    title: 'Error Page',
    message: 'Page not found',
    isLogedIn,
    firebaseConfig,
    userData,
  });
};

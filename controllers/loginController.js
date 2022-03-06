const admin = require('firebase-admin');
const path = require('path');
const firebaseConfig = require(path.join(__dirname, '..', 'utils', 'firebaseConfigs.js'));

exports.getLoginPage = (req, res) => {
  const sessionCookie = req.cookies.idToken || null;
  const isLogedIn = sessionCookie ? true : false;
  const userData = req.cookies.userData || null;
  if (isLogedIn) {
    res.render('profile', {
      title: 'Profile Page',
      isLogedIn,
      userData,
      firebaseConfig,
      isAlreadyLogedIn: true,
    });
  } else {
    res.render('login', {
      title: 'Login Page',
      isLogedIn,
      firebaseConfig,
      userData,
    });
  }
};

exports.login = (req, res) => {
  const idToken = req.body.idToken.toString();
  const name = req.body.displayName?.toString();
  const email = req.body.email?.toString();
  const phoneNumber = req.body.phoneNumber?.toString();
  const photoURL = req.body.photoURL?.toString();
  const extraData = { name, email, phoneNumber, photoURL };

  const expiresIn =
    process.env.NODE_ENV === 'development' ? 1000 * 60 * 60 * 24 * 5 : Number(process.env.EXPIRES_COOKIE);

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie('idToken', sessionCookie, options);
        res.cookie('extraData', extraData);
        res.end(JSON.stringify({ status: 'success' }));
      },
      (error) => {
        res.status(401).send('UNAUTHORIZED REQUEST!');
      }
    );
};

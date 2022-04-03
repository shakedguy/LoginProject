const admin = require('firebase-admin');
const path = require('path');
const firebaseConfig = require(path.join(__dirname, '..', 'utils', 'firebaseConfigs.js'));
const { getUsers } = require(path.join(__dirname, '..', 'utils', 'helpers.js'));

const db = admin.database();
const ref = db.ref('/');
let admins = null;

ref.on('value', (snapshot) => {
  admins = snapshot.val().Admins;
});

exports.getLoginPage = (req, res) => {
  const sessionCookie = req.cookies.idToken || null;
  const isLogedIn = sessionCookie && !req.baseUrl.includes('admin') ? true : false;
  const userData = req.cookies.userData || null;
  const admin = req.baseUrl.includes('admin');
  const render = isLogedIn ? 'profile' : 'login';
  const title = isLogedIn ? 'Profile Page' : admin ? 'Login to admin' : 'Login Page';
  res.render(render, { title, isLogedIn, userData, firebaseConfig, isAlreadyLogedIn: isLogedIn, admin });
};

exports.login = (req, res) => {
  const { email, idToken } = req.body;

  if (req.baseUrl.includes('admin') && !admins.includes(email)) {
    res.status(401).json({ status: 'unauthorized' });
  } else {
    if (req.baseUrl.includes('admin') && req.userData) {
      res.redirect('/admin/logout');
    }
    const expiresIn = process.env.NODE_ENV === 'development' ? 1000 * 60 * 60 * 24 : Number(process.env.EXPIRES_COOKIE);
    admin
      .auth()
      .createSessionCookie(idToken, { expiresIn })
      .then(
        (sessionCookie) => {
          const options = { maxAge: expiresIn, httpOnly: true, secure: true };
          res.cookie('idToken', sessionCookie, options);
          if (req.baseUrl.includes('admin')) {
            res.cookie('admin', true, options);
          }
          res.end(JSON.stringify({ status: 'success' }));
        },
        (error) => {
          res.status(401).send('UNAUTHORIZED REQUEST!');
        }
      );
  }
};

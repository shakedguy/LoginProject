const path = require('path');
const admin = require('firebase-admin');
const { updateUsersDatabase, getUsers } = require(path.join(__dirname, '..', '..', 'utils', 'helpers.js'));
// const { google } = require('googleapis');

const db = admin.database();
const ref = db.ref('/');
const usersRef = ref.child('Users');
let users = null;
(async () => await updateUsersDatabase(usersRef))();
ref.on('value', (snapshot) => {
  users = getUsers(snapshot.val().Users);
});

const firebaseConfig = require(path.join(__dirname, '..', '..', 'utils', 'firebaseConfigs.js'));

// const auth = new google.auth.GoogleAuth({
//   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
//   credentials: require(path.join(__dirname, '..', 'utils', 'serviceAccountKey.js')),
// });

// const spreadsheetId = '1KLg4wTucqhnr1GP5i7MFS6GaXUa0GyGLEQFFIhOw1LU';

exports.getAllUsers = async (req, res) => {
  // const client = await auth.getClient();
  // const googleSheets = google.sheets({ version: 'v4', auth: client });
  // const metadata = await googleSheets.spreadsheets.get({
  //   auth,
  //   spreadsheetId,
  // });
  // const rows = await googleSheets.spreadsheets.values.get({
  //   auth,
  //   spreadsheetId,
  //   range: 'שבועות',
  // });
  // console.log(rows.data);
  const { uid } = req.query;
  const admin = req.baseUrl.includes('admin');
  if (admin) {
    const data = uid ? users.find((user) => user.uid === uid) : users;
    const view = uid ? 'user' : 'users';

    res.render(view, {
      users: data,
      title: 'Users Page',
      firebaseConfig,
      isLogedIn: true,
      userData: req.userData,
    });
  } else {
    res.render('error', {
      title: 'Error Page',
      message: 'Unauthorized, Admin only',
      firebaseConfig,
      isLogedIn: true,
      userData: req.userData,
    });
  }
};

exports.getUser = async (req, res) => {
  const { uid } = req.body;
  const { admin } = req;
  if (admin) {
    res.render('users', {
      users: users[uid],
      title: 'Users Page',
      firebaseConfig,
      isLogedIn: true,
      userData: req.userData,
      admin,
    });
  } else {
    res.render('error', {
      title: 'Error',
      firebaseConfig,
      userData: req.userData,
      message: 'Unauthorized, Admin only',
      admin,
    });
  }
};

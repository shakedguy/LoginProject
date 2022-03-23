const express = require('express');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(require(path.join(__dirname, 'utils', 'serviceAccountKey.js'))),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrf({ cookie: true }));
app.use(require(path.join(__dirname, 'middlewares', 'global')));
app.use(expressLayout);
app.set('layout', './layouts/default');
app.use('/', require(path.join(__dirname, 'routes', 'indexRoute')));
app.use('/login', require(path.join(__dirname, 'routes', 'loginRoute')));
app.use('/logout', require(path.join(__dirname, 'routes', 'logoutRoute')));
app.use('/profile', require(path.join(__dirname, 'routes', 'profileRoute')));
app.use('/messages', require(path.join(__dirname, 'routes', 'messagesRoute')));
app.use('/users', require(path.join(__dirname, 'routes', 'usersRoute')));
app.use('/api/contacts', require(path.join(__dirname, 'routes', 'contactsRoute')));
app.use('/api/firebase', require(path.join(__dirname, 'routes', 'firebaseRoute')));
app.use('/api/menu', require(path.join(__dirname, 'routes', 'menuRoute')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));

app.set('view engine', 'ejs');

// app.listen(port, () => {
//   console.log(`Listening on https://guyshaked-scheduled-messages.herokuapp.com:${port}`);
// });

module.exports = app;

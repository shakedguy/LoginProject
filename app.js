const express = require('express');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
// const dotnev = require('dotenv');
// dotnev.config({ path: `${__dirname}/config.env` });

const app = express();
// const port = process.env.PORT || 3000;

admin.initializeApp({
  credential: admin.credential.cert(require(path.join(__dirname, 'utils', 'serviceAccountKey.js'))),
  databaseURL: process.env.DATABASE_URL,
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
app.use('/sender', require(path.join(__dirname, 'routes', 'senderRoute')));
app.use('/api/contacts', require(path.join(__dirname, 'routes', 'contactsRoute')));
app.use('/api/firebase', require(path.join(__dirname, 'routes', 'firebaseRoute')));
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

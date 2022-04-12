const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);
const ngrok = require('ngrok');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

admin.initializeApp({
	credential: admin.credential.cert(require(path.join(__dirname, 'utils', 'serviceAccountKey.js'))),
	databaseURL: process.env.FIREBASE_DATABASE_URL,
});

app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// (async function () {
//   const url = await ngrok.connect({
//     proto: 'http',
//     addr: process.env.NGROK_ADDRESS,
//     authtoken: process.env.NGROK_AUTH_TOKEN,
//   });
//   twilio.incomingPhoneNumbers('PNccaffbab244c251f13d96aa63bcdf3ad').update({
//     smsUrl: url,
//   });
// })();

app.post('/admin/messages/receive', (req, res) => {
	const twiml = new MessagingResponse();
	console.log(req.body);
	const { Body, ProfileName } = req.body;

	let response = '';
	if (Body.toLowerCase() === 'hi' || Body.toLowerCase() === 'hello' || Body.toLowerCase() === 'hey') {
		response = `Hey ${ProfileName || 'buddy'}, I'm a bot. I can send you messages. Send 'help' to see what I can do.`;
	} else if (Body.toLowerCase() === 'bye' || Body.toLowerCase() === 'goodbye') {
		response = 'Bye, have a nice day!';
	}
	twiml.message(response);
	res.writeHead(200, { 'Content-Type': 'text/xml' });
	res.end(twiml.toString());
});
app.use(csrf({ cookie: true }));
app.use(require(path.join(__dirname, 'middlewares', 'global')));
app.use(expressLayout);
app.set('layout', path.join('layouts', 'default'));
app.use('/', require(path.join(__dirname, 'routes', 'indexRoute')));
app.use('/admin', require(path.join(__dirname, 'admin', 'admin')));
app.use('/login', require(path.join(__dirname, 'routes', 'loginRoute')));
app.use('/logout', require(path.join(__dirname, 'routes', 'logoutRoute')));
app.use('/profile', require(path.join(__dirname, 'routes', 'profileRoute')));
app.use('/api/firebase', require(path.join(__dirname, 'routes', 'firebaseRoute')));
app.use('/api/menu', require(path.join(__dirname, 'routes', 'menuRoute')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));
// app.use('/sass', express.static(path.join(__dirname, 'public', 'sass')));
// app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
// app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));

app.set('view engine', 'ejs');

app.use('*', require(path.join(__dirname, 'routes', 'errorRoute')));

module.exports = app;

// "watch:js": "parcel watch ./public/js/index.js --out-dir ./public/js --out-file bundle.js",
// "build:js": "parcel watch ./public/js/index.js --out ./public/js/bundle.js"

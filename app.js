import express from 'express';
import {} from './utils/initFirebase.js';
import serveFavicon from 'serve-favicon';
import expressEjsLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import bodyParser from 'body-parser';
import { URL } from 'url';
import globalMiddleware from './middlewares/global.js';
import indexRoute from './routes/indexRoute.js';
import firebaseRoute from './routes/firebaseRoute.js';
import loginRoute from './routes/loginRoute.js';
import logoutRoute from './routes/logoutRoute.js';
import profileRoute from './routes/profileRoute.js';
import menuRoute from './routes/menuRoute.js';
import mobileLoginRoute from './routes/mobileLoginRoute.js';
import errorRoute from './routes/errorRoute.js';
import adminApp from './admin/adminApp.js';

const defaultLayout = new URL('./views/layouts/default.ejs', import.meta.url).pathname;
const staticFolder = new URL('./public/', import.meta.url).pathname;
const staticJs = new URL('./public/js/', import.meta.url).pathname;
const staticCss = new URL('./public/css/', import.meta.url).pathname;

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilio = require('twilio')(accountSid, authToken);
// const ngrok = require('ngrok');
// const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

// admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccountKey),
// 	databaseURL: process.env.FIREBASE_DATABASE_URL,
// });

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

// app.post('/admin/messages/receive', (req, res) => {
// 	const twiml = new MessagingResponse();
// 	console.log(req.body);
// 	const { Body, ProfileName } = req.body;

// 	let response = '';
// 	if (Body.toLowerCase() === 'hi' || Body.toLowerCase() === 'hello' || Body.toLowerCase() === 'hey') {
// 		response = `Hey ${ProfileName || 'buddy'}, I'm a bot. I can send you messages. Send 'help' to see what I can do.`;
// 	} else if (Body.toLowerCase() === 'bye' || Body.toLowerCase() === 'goodbye') {
// 		response = 'Bye, have a nice day!';
// 	}
// 	twiml.message(response);
// 	res.writeHead(200, { 'Content-Type': 'text/xml' });
// 	res.end(twiml.toString());
// });
app.use(csurf({ cookie: true }));
app.use(globalMiddleware);
app.use(expressEjsLayouts);
app.set('layout', defaultLayout);
app.use('/', indexRoute);
app.use('/admin', adminApp);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/profile', profileRoute);
app.use('/api/firebase', firebaseRoute);
app.use('/api/menu', menuRoute);
app.use('api/mobile/login', mobileLoginRoute);
app.use(express.static(staticFolder));
app.use('/css', express.static(staticCss));
app.use('/js', express.static(staticJs));

app.set('view engine', 'ejs');

app.use('*', errorRoute);

export default app;

// "watch:js": "parcel watch ./public/js/index.js --out-dir ./public/js --out-file bundle.js",
// "build:js": "parcel watch ./public/js/index.js --out ./public/js/bundle.js"

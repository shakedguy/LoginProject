'use strict';
import express from 'express';
// import cookieSession from 'cookie-session';
// import Keygrip from 'keygrip';
import * as React from 'express-react-views';
import {} from './utils/initServices.js';
import path, { dirname } from 'path';
import { fileURLToPath, URL } from 'url';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import bodyParser from 'body-parser';
import globalMiddleware from './middlewares/global.js';
import indexRoute from './routes/indexRoute.js';
import firebaseRoute from './routes/firebaseRoute.js';
import loginRoute from './routes/loginRoute.js';
import logoutRoute from './routes/logoutRoute.js';
import profileRoute from './routes/profileRoute.js';
import menuRoute from './routes/menuRoute.js';
import errorRoute from './routes/errorRoute.js';
import adminApp from './admin/adminApp.js';
import mobileApi from './mobile/mobile.js';
import serveFavicon from 'serve-favicon';
const __dirname = dirname(fileURLToPath(import.meta.url));
const staticFolder = new URL('./static/', import.meta.url).pathname;

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(mobileApi);

// app.use(
// 	cookieSession({
// 		name: 'session',
// 		keys: new Keygrip(['key1', 'key2'], 'SHA256', 'base64'),
// 	})
// );

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
app.use('/', indexRoute);
app.use('/admin', adminApp);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/profile', profileRoute);
app.use('/api/firebase', firebaseRoute);
app.use('/api/menu', menuRoute);
app.use(express.static(staticFolder));
app.use(serveFavicon(path.join(__dirname, 'static', 'assets', 'favicon.ico')));

app.set('view engine', 'jsx');
const options = { beautify: true };
app.engine('jsx', React.createEngine(options));
app.set('views', './views');

app.use('*', errorRoute);

export default app;

// "watch:js": "parcel watch ./public/js/index.js --out-dir ./public/js --out-file bundle.js",
// "build:js": "parcel watch ./public/js/index.js --out ./public/js/bundle.js"

// "apiendpoint": "http://localhost:3035",
// "second": 2,
// "booleanflag": true,
// "test": {
// 	"test": "test"
// },
// "my_email": "shakedguy94@gmail.com",
// "page_titles": {
// 	"home": "Home",
// 	"profile": "Profile",
// 	"login": "Login",
// 	"admin_login": "Login as Admin",
// 	"messages": "Messages",
// 	"Users": "Users"
// }

// "props": ["name", "email", "phone", "country", "getName", "getEmail", "getPhone", "getCountry"],
// "values": [
// 	{ "type": "property", "value": "Guy Shaked" },
// 	{ "type": "property", "value": "shakedguy94@gmail.com" },
// 	{ "type": "property", "value": "+972542422521" },
// 	{ "type": "property", "value": "Israel" },
// 	{ "type": "function", "value": "() =>{ return this.name; }" },
// 	{ "type": "function", "value": "() =>{ return this.email; }" },
// 	{ "type": "function", "value": "() =>{ return this.phone; }" },
// 	{ "type": "function", "value": "() =>{ return this.country; }" }
// ]
// const classBuilder = (...properties) => {
// 	return class {
// 		constructor(...values) {
// 			for (const [index, property] of properties.entries()) {
// 				if (values[index].type === 'function') {
// 					this[property] = eval(values[index].value);
// 				} else {
// 					this[property] = values[index].value;
// 				}
// 			}
// 		}
// 	};
// };

// const TestClass = classBuilder(...AppSettings.props);

// const Todo = new TestClass(...AppSettings.values);

// const AppSettingsClass = class {};

// export { AppSettingsClass, classBuilder, TestClass, Todo };

//795993175585-ujvkpru8qiaf6fq1vovfh13hqhiai31a.apps.googleusercontent.com
//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

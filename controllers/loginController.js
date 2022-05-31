import admin from 'firebase-admin';
import User from '../models/User.js';
import { firebaseConfig } from '../utils/firebaseConfigs.js';

const db = admin.database();
const ref = db.ref('/');
let admins = null;

ref.on('value', (snapshot) => {
	admins = snapshot.val().Admins;
});

const getLoginPage = (req, res) => {
	const sessionCookie = req.cookies.idToken || null;
	const isLogedIn = sessionCookie && !req.baseUrl.includes('admin') ? true : false;
	const userData = req.cookies.userData || null;
	const admin = req.baseUrl.includes('admin');
	const render = isLogedIn ? 'profile' : 'login';
	const title = isLogedIn ? 'Profile Page' : admin ? 'Login to admin' : 'Login Page';
	res.render(render, { title, isLogedIn, userData, firebaseConfig, isAlreadyLogedIn: isLogedIn, admin });
};

const login = async (req, res) => {
	const { idToken } = req.body;
	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken);

		const user = await admin.auth().getUser(decodedToken.uid);

		const isAdmin = admins.includes(user.email);
		const adminMode = req.baseUrl.includes('admin');

		if (adminMode && !isAdmin) {
			res.status(401).json({ status: 'unauthorized' });
		} else {
			if (adminMode && req.userData) {
				res.redirect('/admin/logout');
			}
			const expiresIn =
				process.env.NODE_ENV === 'development' ? 1000 * 60 * 60 * 24 : Number(process.env.EXPIRES_COOKIE);
			const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

			const options = { maxAge: expiresIn, httpOnly: true, secure: true };
			res.cookie('idToken', sessionCookie, options);
			if (adminMode) {
				res.cookie('admin', true, options);
			}
			res.status(200).json({ status: 'success' });
		}
	} catch (error) {
		res.status(401).json({ status: 'unauthorized' });
	}
};

const mobileLogin = async (req, res) => {
	const { idToken } = req.body;
	try {
		const token = await admin.auth().verifyIdToken(idToken);
		const userCredentials = await admin.auth().getUser(token.uid);
		const user = User.fromFirebase(userCredentials);
		res.status(201).send(JSON.stringify(user));
	} catch (error) {
		res.status(401).json({ status: 'unauthorized' });
	}
};

export { getLoginPage, login, mobileLogin };

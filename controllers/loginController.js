import admin from 'firebase-admin';
import User from '../models/User.js';
import AppSettings from '../utils/appsettings.js';
import { firebaseConfig } from '../utils/firebaseConfigs.js';
import { AdminsDB, UsersDB } from '../utils/databases.js';

const getLoginPage = (req, res) => {
	const sessionCookie = req.cookies.idToken || null;
	const { userData } = req;
	const isLogedIn = sessionCookie ? true : false;
	const admin = req.baseUrl.includes('admin');
	if (isLogedIn) {
		res.cookie('redirectFromLogin', 'true', { maxAge: 2000, httpOnly: true, secure: true });
		let identifier;
		if (userData.Name) identifier = `username=${userData.Name.replaceAll(' ', '').toLowerCase()}`;
		else if (userData.Email) identifier = `email=${userData.Email}`;
		else if (userData.PhoneNumber) identifier = `phone=${userData.PhoneNumber}`;
		else identifier = `id=${userData.Id}`;
		const redirectUrl = admin ? `/admin/profile?${identifier}` : `/profile?${identifier}`;
		res.redirect(redirectUrl);
	}

	const render = isLogedIn ? 'Profile' : 'Login';
	const title = isLogedIn
		? AppSettings.page_titles.profile
		: admin
		? AppSettings.page_titles.admin_login
		: AppSettings.page_titles.login;
	res.render(render, {
		title,
		isLogedIn,
		userData,
		firebaseConfig,
		isAlreadyLogedIn: isLogedIn,
		headers: User.ProfileHeaders,
		admin,
	});
};

const login = async (req, res) => {
	const { idToken } = req.body;
	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken);

		const userRecord = await admin.auth().getUser(decodedToken.uid);
		const user = User.fromFirebase(userRecord);

		const isAdmin = AdminsDB.exists(user.Id);
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
			// const exists = UsersDB.exists(user.Id);
			// if (!exists) {
			// 	await UsersDB.insert(user);
			// }
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
		const user = await User.fromFirebase(userCredentials);
		res.status(201).send(JSON.stringify(user));
	} catch (error) {
		res.status(401).json({ status: 'unauthorized' });
	}
};

export { getLoginPage, login, mobileLogin };

import admin from 'firebase-admin';
import User from '../models/User.js';
import { UsersDB, AdminsDB } from '../utils/databases.js';
const authorizationMiddleware = async (req, res, next) => {
	const sessionCookie = req.cookies.idToken || '';
	try {
		const userData = await admin.auth().verifySessionCookie(sessionCookie, true);
		const user = await UsersDB.get(userData.uid);
		req.userData = User.toUi(user);
		next();
	} catch (error) {
		const redirect = req.baseUrl.includes('admin') ? '/admin/login' : '/login';
		res.redirect(redirect);
	}
};

export default authorizationMiddleware;

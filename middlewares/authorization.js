import admin from 'firebase-admin';
import User from '../models/User.js';
const authorizationMiddleware = async (req, res, next) => {
	const sessionCookie = req.cookies.idToken || '';
	try {
		const userData = await admin.auth().verifySessionCookie(sessionCookie, true);
		const user = await admin.auth().getUser(userData.uid);
		req.userData = User.fromFirebase(user);
		next();
	} catch (error) {
		const redirect = req.baseUrl.includes('admin') ? '/admin/login' : '/login';
		res.redirect(redirect);
	}
};

export default authorizationMiddleware;

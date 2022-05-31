import admin from 'firebase-admin';
import User from '../../models/User.js';

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

export { mobileLogin };

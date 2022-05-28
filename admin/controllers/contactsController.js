import admin from 'firebase-admin';
import { getUsers } from '../../utils/helpers.js';

let contacts = [];
const db = admin.database();
const ref = db.ref('/');
ref.on('value', (snapshot) => {
	contacts = getUsers(snapshot.val().Users);
});

const fetchContact = (req, res, next) => {
	req.contacts = contacts;
	next();
};

const getAllContacts = (req, res) => {
	const admin = req.baseUrl.includes('admin');
	if (admin) {
		res.status(200).json(contacts);
	} else {
		res.status(200).json({});
	}
};

export { fetchContact, getAllContacts };

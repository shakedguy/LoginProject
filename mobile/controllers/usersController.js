import admin from 'firebase-admin';
import { updateUsersDatabase, getUsers } from '../../utils/helpers.js';

const db = admin.database();
const ref = db.ref('/');
const usersRef = ref.child('Users');
let users = null;
(async () => await updateUsersDatabase(usersRef))();
ref.on('value', (snapshot) => {
	users = getUsers(snapshot.val().Users);
});

const getAllUsers = async (req, res) => {
	if (users) {
		res.status(200).json(users);
	} else {
		res.status(500).json({ error: 'Something went wrong' });
	}
};

export { getAllUsers };

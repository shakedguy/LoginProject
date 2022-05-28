import admin from 'firebase-admin';
import { updateUsersDatabase, getUsers } from '../../utils/helpers.js';
import { firebaseConfig } from '../../utils/firebaseConfigs.js';

const db = admin.database();
const ref = db.ref('/');
const usersRef = ref.child('Users');
let users = null;
(async () => await updateUsersDatabase(usersRef))();
ref.on('value', (snapshot) => {
	users = getUsers(snapshot.val().Users);
});

const getAllUsers = async (req, res) => {
	const { uid } = req.query;
	const admin = req.baseUrl.includes('admin');
	if (admin) {
		const data = uid ? users.find((user) => user.uid === uid) : users;
		const view = uid ? 'user' : 'users';

		res.render(view, {
			users: data,
			title: 'Users Page',
			firebaseConfig,
			isLogedIn: true,
			userData: req.userData,
		});
	} else {
		res.render('error', {
			title: 'Error Page',
			message: 'Unauthorized, Admin only',
			firebaseConfig,
			isLogedIn: true,
			userData: req.userData,
		});
	}
};

const getUser = async (req, res) => {
	const { uid } = req.body;
	const { admin } = req;
	if (admin) {
		res.render('users', {
			users: users[uid],
			title: 'Users Page',
			firebaseConfig,
			isLogedIn: true,
			userData: req.userData,
			admin,
		});
	} else {
		res.render('error', {
			title: 'Error',
			firebaseConfig,
			userData: req.userData,
			message: 'Unauthorized, Admin only',
			admin,
		});
	}
};

export { getAllUsers, getUser };

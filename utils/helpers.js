import admin from 'firebase-admin';
import User from '../models/User.js';
// import dayjs from 'dayjs';

const dateTimeUiFormat = 'DD/MM/YYYY HH:mm';
const dateTimeBigQueryFormat = 'YYYY-MM-DDTHH:mm:ss';

const getContacts = (db) => {
	const contacts = [];
	db.forEach((contact, index) => {
		contacts.push({
			id: index,
			name: contact.name,
			phone: contact.phone,
			send: false,
		});
	});

	return contacts;
};

const getUsers = (db) => {
	if (db) {
		const users = [];
		db.forEach((user) => users.push(user));

		return users;
	}
};

const db = admin.database();
const ref = db.ref('/');
let admins = [];

const updateUsersDatabase = async (usersRef, nextPageToken) => {
	const usersList = await admin.auth().listUsers(1000, nextPageToken);
	const newUsers = await Promise.all(usersList.users.map(async (user) => await User.fromFirebase(user)));
	await usersRef.set(newUsers);

	if (usersList.pageToken) {
		await updateUsersDatabase(usersRef, listUsersResult.pageToken);
	}
};

const checkDatabase = async (bigQuery) => {
	let dataset = bigQuery.dataset('SocialLogin');
	let [exists] = await dataset.exists();

	if (!exists) {
		[dataset] = await bigQuery.createDataset('SocialLogin', { location: 'US' });
	}
	const [tables] = await dataset.getTables();

	exists = tables.find((table) => table.id === 'Users');
	if (!exists) {
		const schema = User.schema();
		const options = {
			schema,
			location: 'US',
		};
		await dataset.createTable('Users', options);
	}
	exists = tables.find((table) => table.id === 'Admins');
	if (!exists) {
		const schema = [{ name: 'Id', type: 'STRING', mode: 'REQUIRED' }];
		const options = {
			schema,
			location: 'US',
		};
		await dataset.createTable('Admins', options);
	}
};

const filterContacts = (contacts) => contacts.filter((contact) => contact.Email || contact.PhoneNumber);

export {
	getContacts,
	getUsers,
	updateUsersDatabase,
	checkDatabase,
	filterContacts,
	dateTimeUiFormat,
	dateTimeBigQueryFormat,
};

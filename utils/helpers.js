const { getAuth } = require('firebase-admin/auth');
const admin = require('firebase-admin');
exports.getContacts = (db) => {
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

exports.getUsers = (db) => {
	if (db) {
		const users = [];
		db.forEach((user) => users.push(user));

		return users;
	}
};

const db = admin.database();
const ref = db.ref('/');
let admins = [];

exports.updateUsersDatabase = async (usersRef, nextPageToken) => {
	getAuth()
		.listUsers(1000, nextPageToken)
		.then(async (listUsersResult) => {
			const newUsers = listUsersResult.users.map((userRecord) => {
				return {
					uid: userRecord.uid,
					email: userRecord.email || '',
					displayName: userRecord.displayName || '',
					emailVerified: userRecord.emailVerified || false,
					photoURL: userRecord.photoURL || '',
					phoneNumber: userRecord.phoneNumber || '',
					disabled: userRecord.disabled || false,
					metadata: {
						creationTime: new Date(userRecord.metadata.creationTime).toLocaleString('he-IL') || null,
						lastRefreshTime: new Date(userRecord.metadata.lastRefreshTime).toLocaleString('he-IL') || null,
						lastSignInTime: new Date(userRecord.metadata.lastSignInTime).toLocaleString('he-IL') || null,
					},
					passwordHash: userRecord.passwordHash || null,
					passwordSalt: userRecord.passwordSalt || null,
					providerData: {
						uid: userRecord.providerData[0].uid || null,
						displayName: userRecord.providerData[0].displayName || null,
						email: userRecord.providerData[0].email || null,
						photoURL: userRecord.providerData[0].photoURL || null,
						providerId: userRecord.providerData[0].providerId || null,
						phoneNumber: userRecord.providerData[0].phoneNumber || null,
					},
					tokensValidAfterTime: userRecord.tokensValidAfterTime || null,
				};
			});

			ref.on('value', (snapshot) => {
				admins = snapshot.val().Admins;
				newUsers.forEach((user) => (user['admin'] = admins.includes(user.email)));
			});
			await usersRef.remove();
			await usersRef.set(newUsers);

			if (listUsersResult.pageToken) {
				// List next batch of users.
				await updateUsersDatabase(usersRef, listUsersResult.pageToken);
			}
		})
		.catch((error) => {
			console.log('Error listing users:', error);
		});
};

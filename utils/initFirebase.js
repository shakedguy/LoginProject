import admin from 'firebase-admin';
import serviceAccountKey from './serviceAccountKey.js';

admin.initializeApp({
	credential: admin.credential.cert(serviceAccountKey),
	databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export {};

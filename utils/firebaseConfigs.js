const env = process.env;
export const firebaseConfig = {
	apiKey: env.FIREBASE_API_KEY,
	authDomain: env.FIREBASE_AUTH_DOMAIN,
	databaseURL: env.FIREBASE_DATABASE_URL,
	projectId: env.FIREBASE_PROJECT_ID,
	storageBucket: env.FIREBASE_STORAGE_BUCKE,
	messagingSenderId: env.FIREBASE_MESSAGEING_SENDER_ID,
	appId: env.FIREBASE_APP_ID,
};

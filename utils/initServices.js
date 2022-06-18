import admin from 'firebase-admin';
import { BigQuery } from '@google-cloud/bigquery';
import { firebaseAdminServiceAccount } from './serviceAccounts.js';
import { bigQueryServiceAccount } from './serviceAccounts.js';

admin.initializeApp({
	credential: admin.credential.cert(firebaseAdminServiceAccount),
	databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const bigQueryConfig = {
	projectId: 'react-login-bd9ed',
	credentials: bigQueryServiceAccount,
};
const bigQuery = new BigQuery(bigQueryConfig);

export { bigQueryConfig, bigQuery };

const firebaseAdminServiceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
const bigQueryServiceAccount = firebaseAdminServiceAccount;

export { firebaseAdminServiceAccount, bigQueryServiceAccount };

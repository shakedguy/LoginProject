const firebaseAdminServiceAccount = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT);
const bigQueryServiceAccount = firebaseAdminServiceAccount;

export { firebaseAdminServiceAccount, bigQueryServiceAccount };

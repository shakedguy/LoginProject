// const deleteFiles = () => {
// 	fs.unlinkSync(firebasePath);
// 	fs.unlinkSync(bigQueryPath);
// };

// const initObjects = () => {
// 	const firebaseContent = JSON.parse(fs.readFileSync(firebasePath));
// 	const bigQueryContent = JSON.parse(fs.readFileSync(bigQueryPath));
// 	return { firebaseContent, bigQueryContent };
// };

// const firebasePath = process.env.FIREBASE_REMOTE_FILE_NAME;
// const bigQueryPath = process.env.BIG_QUERY_REMOTE_FILE_NAME;

// const firebaseRemoteFile = bucket.file(process.env.FIREBASE_REMOTE_FILE_NAME);
// const bigQueryRemoteFile = bucket.file(process.env.BIG_QUERY_REMOTE_FILE_NAME);
// firebaseRemoteFile.createReadStream().on('data', function (chunk) {
// 	const response = Buffer.concat([Buffer.from(''), chunk]);
// 	process.env['FIREBASE_SERVICE_ACCOUNT_OBJECT'] = JSON.stringify(response.toString());
// });
// bigQueryRemoteFile.createReadStream().on('data', function (chunk) {
// 	const response = Buffer.concat([Buffer.from(''), chunk]);

// 	process.env['BIG_QUERY_SERVICE_ACCOUNT_OBJECT'] = JSON.stringify(response.toString());
// });

// const env = process.env;
// const firebaseAdminServiceAccount = {
// 	type: env.FIREBASE_TYPE,
// 	project_id: env.FIREBASE_PROJECT_ID,
// 	private_key_id: env.FIREBASE_PRIVATE_KEY_ID,
// 	private_key:
// 		'-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCzivSdxnqbgu1p\nH5ILukrOM58lxrM1OlmWl6T1kVjSaqy1JTIkCdmXYkjCphMRodpBCJFzZTFgH789\n7kD3YCwrbP605KGwwbDLjmJsVy3xJO//Ku6E0OBBDbj3T+l6h3HkzWW+mnLw+DV6\ns5neslXCc1gzeW3jlh7bXlXADL7w3ut8NUzysldu73RZ6wPMYWnfpVzu9w9pesfL\nRGaDcVyPran/AFjnU+reKk5OinawBl1wd+S6Qo99SA3dF7YPtqGH5rtr+7GfnNVb\nAnIhzzN6/3wpSY6ihSsAJz3tE0IFbSAz0HBX+tff9jpzfy+DCFz/WT1oYZjRHwsp\nyAc7MBx1AgMBAAECggEAGwMY8nPeFm+IUHyTeHg6sPNLSl+urp9swx9ljhykBGRQ\nP6Cs/ocM2Z3L3J0n2UtEjuw/FeFvoEqmdybVV2J8wrvPRl/vg6xgcP+nBy3Gl7U6\n9mT7JbhXRPJPlcXMFscx935/hEGwcVimkyNaTwr9pBe+eWAXjFoVomN6+z3vrEVc\nv3O6G86LSLAM0AbcaB2KtNsd1BXqviOngMDzF+Men40Ogm6mT2HWtMe40PF6gma6\nyAYJfCOtcfaiR8BJ2MwczbgbPYYcN2svQJ+HNbqzTg8y4N/RCm6+9ouqXFXD148u\nxwCu89CqNx5dtopk45GQ+Jigf+w3fOCmCFT6dBZ0sQKBgQDuj+1KlzhAxZ6WKobm\naEP9TITeeqp4+PoFCILPQorcwoRezNSsU1tc9fRorPbh+OMf+4K+1ay7B+ibarFg\n4l9BnONEltq9QfV67yjeEjb7QHi+kvIOvDLd5B2lhPqQIxzDfjzXwBoetYJoNz/o\n6JIFsWB0JYxpPhJ3F7nBR75QrwKBgQDAqqIdKevvodsO/paTmnvbot2K1WjDMvWN\nyN8xdHVWS1ony4hlfTkY5kcy/C5w/iQ/dmPryDP1VmwcZNT/4oP9hVEfPcdIjTwA\nsktoGRl9r+uO9HelBWEdt/U3aDJyL+sLOyWQYDjXtFr6gdOYE+hb0WjQ7pauWgef\nKE5h9r6GGwKBgQCPx+kherCpwTGKmgkCFzdbE+JE4LOcA5tUq0ODvTxKP2ZeaJ+J\nWRgImCh9ajnGCiaBoSm08L2RX/vep9hOZ0E4H2GOdklRpc5ZEImWBm5i0gG0Aoan\nQOB7gcAogVQuySrN3Gi5NAvKFGWLgDkhnAJeMgDLH9JXn9SrOH55Mk9O+wKBgQCF\nOHeIOuiNdhmGsLtlrLhgEqmlyhL6hk4MkAzkoWZRGSFpyu6xXnkQooow0vc54kEm\nMLK+4lwrFGsE5yPxG6uwrXJ+a7VUkXQf9yj0/gYGRpJW8uuYC7QvXHgOq9nV4xRf\nW7KJtj8Xx/nwpbytt3Y/pvkXHyLJxC7o+nHYg0kSaQKBgQCyACsZjLDQ1ayNVO0Q\n9Qnj6cuIT3Ja/ki/z301rX5JU07L4z1ICBlEtSwh/74/xtOt6Cp3MNZLFSjjZRzo\nM0TYwLSKG+/8i6O79tkCmFaV5Z+uRacVRFhpkbt+guVjdREZ6SNCw3CYtsOSAL3R\nbWhPnxwhI9IppZ1a+k5+IwtCyg==\n-----END PRIVATE KEY-----\n',
// 	client_email: env.FIREBASE_CLIENT_EMAIL,
// 	client_id: env.FIREBASE_CLIENT_ID,
// 	auth_uri: env.FIREBASE_AUTH_URI,
// 	token_uri: env.FIREBASE_TOKEN_URI,
// 	auth_provider_x509_cert_url: env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
// 	client_x509_cert_url: env.FIREBASE_CLIENT_X509_CERT_URL,
// };

const firebase = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
firebase.private_key =
	'-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCzivSdxnqbgu1p\nH5ILukrOM58lxrM1OlmWl6T1kVjSaqy1JTIkCdmXYkjCphMRodpBCJFzZTFgH789\n7kD3YCwrbP605KGwwbDLjmJsVy3xJO//Ku6E0OBBDbj3T+l6h3HkzWW+mnLw+DV6\ns5neslXCc1gzeW3jlh7bXlXADL7w3ut8NUzysldu73RZ6wPMYWnfpVzu9w9pesfL\nRGaDcVyPran/AFjnU+reKk5OinawBl1wd+S6Qo99SA3dF7YPtqGH5rtr+7GfnNVb\nAnIhzzN6/3wpSY6ihSsAJz3tE0IFbSAz0HBX+tff9jpzfy+DCFz/WT1oYZjRHwsp\nyAc7MBx1AgMBAAECggEAGwMY8nPeFm+IUHyTeHg6sPNLSl+urp9swx9ljhykBGRQ\nP6Cs/ocM2Z3L3J0n2UtEjuw/FeFvoEqmdybVV2J8wrvPRl/vg6xgcP+nBy3Gl7U6\n9mT7JbhXRPJPlcXMFscx935/hEGwcVimkyNaTwr9pBe+eWAXjFoVomN6+z3vrEVc\nv3O6G86LSLAM0AbcaB2KtNsd1BXqviOngMDzF+Men40Ogm6mT2HWtMe40PF6gma6\nyAYJfCOtcfaiR8BJ2MwczbgbPYYcN2svQJ+HNbqzTg8y4N/RCm6+9ouqXFXD148u\nxwCu89CqNx5dtopk45GQ+Jigf+w3fOCmCFT6dBZ0sQKBgQDuj+1KlzhAxZ6WKobm\naEP9TITeeqp4+PoFCILPQorcwoRezNSsU1tc9fRorPbh+OMf+4K+1ay7B+ibarFg\n4l9BnONEltq9QfV67yjeEjb7QHi+kvIOvDLd5B2lhPqQIxzDfjzXwBoetYJoNz/o\n6JIFsWB0JYxpPhJ3F7nBR75QrwKBgQDAqqIdKevvodsO/paTmnvbot2K1WjDMvWN\nyN8xdHVWS1ony4hlfTkY5kcy/C5w/iQ/dmPryDP1VmwcZNT/4oP9hVEfPcdIjTwA\nsktoGRl9r+uO9HelBWEdt/U3aDJyL+sLOyWQYDjXtFr6gdOYE+hb0WjQ7pauWgef\nKE5h9r6GGwKBgQCPx+kherCpwTGKmgkCFzdbE+JE4LOcA5tUq0ODvTxKP2ZeaJ+J\nWRgImCh9ajnGCiaBoSm08L2RX/vep9hOZ0E4H2GOdklRpc5ZEImWBm5i0gG0Aoan\nQOB7gcAogVQuySrN3Gi5NAvKFGWLgDkhnAJeMgDLH9JXn9SrOH55Mk9O+wKBgQCF\nOHeIOuiNdhmGsLtlrLhgEqmlyhL6hk4MkAzkoWZRGSFpyu6xXnkQooow0vc54kEm\nMLK+4lwrFGsE5yPxG6uwrXJ+a7VUkXQf9yj0/gYGRpJW8uuYC7QvXHgOq9nV4xRf\nW7KJtj8Xx/nwpbytt3Y/pvkXHyLJxC7o+nHYg0kSaQKBgQCyACsZjLDQ1ayNVO0Q\n9Qnj6cuIT3Ja/ki/z301rX5JU07L4z1ICBlEtSwh/74/xtOt6Cp3MNZLFSjjZRzo\nM0TYwLSKG+/8i6O79tkCmFaV5Z+uRacVRFhpkbt+guVjdREZ6SNCw3CYtsOSAL3R\nbWhPnxwhI9IppZ1a+k5+IwtCyg==\n-----END PRIVATE KEY-----\n';

const firebaseAdminServiceAccount = firebase;

// const bigquery = JSON.parse(process.env.GOOGLE_CLOUD_STORAGE);
// bigquery.private_key =
// 	'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCaGiJBh7FaZjf8\nLQWffbOjShc4j8vHfPUBAEKlj6IFbYJcpKAJL6LirlopmLE/yVpWebk/ye54KSId\n9IQ+e8Mbgn5sBWwThOkAJ/uw8jEBP67HlxD18E4fXhXT4M0EqUrmk5Xwoyb+GRWn\ngS6TFOma4zhL8sh+2xRtRCTdVZIgp1ocP1JCPzl1Mw5EoCqHO86tDuQnhuQIfARI\ns9qqrcR2NFHAwzlphIt51GkcUlqs6jqhnr3zeWe/fECZmBAcscT9U7dPbLGFgl6j\nuCBZMBVMZ6UKN5UxJ8IqRJO3A4YNmuFmR460zhk6DyjORi6cQPai9CgMrDaCqcQ1\n+nZmyz8xAgMBAAECggEAHRZMO37Dmura6+pKmqt1Jh/0yJwZzIZ5T25PZiU5oZkl\nR1vaiklXzz42Lg5QfJgCyXpR3Wi97qfi9PEDqjCdp/pmZvjSCNAoU7t4TlK0rcXp\ntWo+DRIGCPUvHQ5cXGIhDWsznNeK42D0PakMU75Zhr8XT/ycXBd5oFNBuxZtDeUF\nwd2Zd4n21jD6RSU4m0Al9vmZxCle8fOwRTJ/wki/ZYw6rqX9jF2G9UuRGHjOk6Jd\nIyUnugKUaZW8dURylNq9e2GlkmNr85IzVaD2JztPx8Odo4dY7UQFKQSDJK/C2DZ4\nX5+isDSNz00w0vm53hwS7NMroJT8VvFShMEzmU0L/QKBgQDMZzoCBcBfNdX1Cean\nEUWBDuZefIeYMov8MH015lSd44loNY6XzY1FMdfDq0OBb288T2AR3lPctLK++uR4\nJTBd5lylDa4ZiTAaW2scdZpCLiDHdJX9WVykDA7KnWiN9D37aNPjX7wtpigvInaM\nQUv6RzdfD/xsQ/NRzVsFE1PODQKBgQDBAGOY5z1POMK8m3J9J5Xpo3xgsPWuaKPv\n93/uFohKKsRHhCpwsI+U54sbPv0p834XkEbReYaShmuHwYB3DPbqmPjx9jqxhe78\nPf0bT8CppkO7eKX/M2pm5/MtC/LhSz8TTKVAtKDihYZGsu8pK31NQaei0L/PNpTZ\nhNyMEaDQtQKBgFWqsdIlLPH6czimtKeygmnLn9tb38x26tqATAnqBe7CbVVilOek\ne5/TevWD8t/tnzYsojv67TTj+sI2DskX9QR1xsBaUmxbZfC1/ddIpqU0BgLyJuau\nrDgI4a4jeK19/vg+gAecmRacu9y9WegAeeJkNJ2/6nBJrlHLemlPJ2GFAoGAWOF5\n/H95X5NvMvaPag2h3z/X1puH+PLdlHQxaQ7dYvKBA8Jc3RqidNuQ11JRulEVH3rk\n8jD6BV58BL/bDnhc+brK4nsXmotofKd7eWln+3jDNoGgSH+AH7Xv6i3Xg2Nov9WL\nQNouQUNmjAZ5V0dc5Ag5UCS8QIwNToL+Ik839QUCgYEApTRYGkbKi+vcaagRz80w\nabC6wYE8NXOoAm6lVBbDq8WDSrnvx0OM4LxfHOwTFwPlk8L9nl+SxVYLH1X5KPDW\nNFmD7mFci5efJhgpXsKc/1aFmksyRxKb795k8WOpPDS1irVGfNLlHlBawHwR6lSq\n24OmOVq5kLZFwwZwtxpdzwo=\n-----END PRIVATE KEY-----\n';
const bigQueryServiceAccount = firebase;

// const bigQueryServiceAccount = {
// 	type: env.BIG_QUERY_SERVICE_TYPE,
// 	project_id: env.BIG_QUREY_PROJECT_ID,
// 	private_key_id: env.BIG_QUERY_PRIVATE_KEY_ID,
// 	private_key:
// 		'-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCulDQHfupqH7VQ\nwvhcxsa/XXXDzGGlKlJTlvyIys+N4Mi+L46LYcQC5DH66xnStTbpvkenQF930FZK\n5GzS5ud4XvlVpLY/KZLFYQ/b50xan74YI0OWEwSEQ4c4L5CY+K7+fK/AU6OzTHI2\nyc0KWZQSzzOWlVCHpGwp5nPBPH+osNz7IOtjpbonKplzNTEa4GLjENsITi6aq2Lo\nUXIg64oaaJIVJvSOWSh+f2gpkeEUnayb+Uw6ZfcwwN4vDCSCk6gOW+meLPHAMs0u\ncfl5gW4rW+A6zBqs45yC+Yv8/vQXRTXIlpa+2JUoDG+soO7manRYJUnLQH4kDNkX\nKxSdfMIdAgMBAAECggEABKcBbfO1ZoeayuCvQrWvZTkl4sZnEcI7eGvNJg4Vkufb\nIapdx5we357aMCAky4c1w+vkt/HQuX4tVoiY19P8dio9xckCbFN8zFLGW+thjwaz\nx6vk6LJwC+BK0bX+yfzSmQiUnHD+K1CNuKUPGEgD2K555vjqsPqyQTmZexxUIJgu\npPLa4ku3dW8evhMeJX7gvbdWWZ24ui2pD/RXjCOS4UVd5NDwi/dNT7FPZbk9YAtc\n2cxPwVdti8YgFAgT2fIzVEQY3xSIWbCXlBqAoGno8IOkogY/azvwpNxsnGmxZ97+\n/Jlp/u/wl8/+P0iRAbou8dQIYTgjYTuFG+vlMSfclwKBgQDxt8WgbRVD1x66Nupr\ndUvR8Suj2NxOakKDPOtee94Baw651yM9ONihbmn8oR6Ym7NWDdy+rQwmkGizqa0+\nAC4NF5CZ7qudQXvjAQ57Lxj5LE5frQY8RV+Ulmx64qbSzs9s8HtWVlfX/8isFUTX\nFgGkfQHbKqfjJDWsVAYwPaYD3wKBgQC45OL54gdM4c65Be6KodbI/15/9/RH1cRg\nftpQQgVlYdkNDp7j1aJYvqQsuBGAIXI7ahpF7Qo9NjI5TW2TUogC0fC99c3H924+\n3wfGRe6ZI5ywKtmExicw7Acrzdvbk02RyjItX+/84dIoGpM8yD8Vxb2/y4qE9U0x\nrmcOSdgZgwKBgCDmOmfTcQmCxhPiVZW6qU8x3Ba49YNWwybJq994TIc04xQ4S/uR\nOSr/tD1GULvEtWwJBvqM4xJ8pUOO3J2LuLjfdDb/XSxSNWJ4SlhJ2MRRW3l6O1cI\nujGnJ6yyHLKko2bYdHET33Dux4lke7IqtJ6GxTHnZGJuE0AZT55RRb9RAoGBAI9S\nzieJ8MLGH6sJUBoizg5M9oIYQUIWEP4EF1Mzel9WdBxNAxn1lr1YOod3wAkk5Bnu\na6Nc1h0RD+mffZs/1LLq7sUx72xc/xa5aJtnxkbrdiCRdsAXonWn4P8xuoYBL5Yd\nuLu3rJ7IplH0F8J8L3q/KBGuxBfA1y/102keEOflAoGBALsVoaXMKvSLWQr39F9x\n740AM9XtAsgJJERuAzXTtq8HBnLuFG4Zcb6Z44BaCkHCOuFt8rYDlx6YSImDY1Bq\nOmO+wFQgJG3yA5xAMss7hOshdCMHxBZnl13kxQMBvPdym/2Ql90mwbEA5eS5BGJK\nrLJzXj7axFX2fdeGqKnneBmY\n-----END PRIVATE KEY-----\n',
// 	client_email: env.BIG_QUERY_CLIENT_EMAIL,
// 	client_id: env.BIG_QUERY_CLIENT_ID,
// 	auth_uri: env.BIG_QUERY_AUTH_URI,
// 	token_uri: env.BIG_QUERY_TOKEN_URI,
// 	auth_provider_x509_cert_url: env.BIG_QUERY_AUTH_PROVIDER_X509_CERT_URL,
// 	client_x509_cert_url: env.BIG_QUERY_CLIENT_X509_CERT_URL,
// };

export { firebaseAdminServiceAccount, bigQueryServiceAccount };

import { firebaseConfig } from '../utils/firebaseConfigs.js';
import AppSettings from '../utils/appsettings.js';

const getErrorPage = (req, res) => {
	const sessionCookie = req.cookies.idToken || null;
	const isLogedIn = sessionCookie ? true : false;
	const userData = req.cookies.userData || null;

	res.render('Error', {
		title: AppSettings.page_titles.error,
		message: 'Page not found',
		isLogedIn,
		firebaseConfig,
		userData,
	});
};

export { getErrorPage };

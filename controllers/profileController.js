import AppSettings from '../utils/appsettings.js';
import { firebaseConfig } from '../utils/firebaseConfigs.js';
import User from '../models/User.js';

const getProfilePage = (req, res) => {
	const { userData } = req;
	const { redirectFromLogin } = req.cookies;
	const isLogedIn = userData ? true : false;
	res.render('profile', {
		title: AppSettings.page_titles.profile,
		isLogedIn,
		userData,
		firebaseConfig,
		isAlreadyLogedIn: redirectFromLogin,
		headers: User.ProfileHeaders,
		admin: false,
	});
};

export { getProfilePage };

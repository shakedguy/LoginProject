import { firebaseConfig } from '../utils/firebaseConfigs.js';

const getHomePage = (req, res) => {
	const sessionCookie = req.cookies.idToken || null;
	const isLogedIn = sessionCookie ? true : false;
	const userData = req.cookies.userData || null;

	res.render('index', {
		title: 'Home Page',
		isLogedIn,
		firebaseConfig,
		userData,
	});
};

export { getHomePage };

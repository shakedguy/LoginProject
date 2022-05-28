import { firebaseConfig } from '../utils/firebaseConfigs.js';

const getProfilePage = (req, res) => {
	res.render('profile', {
		title: 'Profile Page',
		isLogedIn: true,
		userData: req.userData,
		firebaseConfig,
		isAlreadyLogedIn: false,
		admin: false,
	});
};

export { getProfilePage };

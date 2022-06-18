import AppSettings from '../../utils/appsettings.js';
import User from '../../models/User.js';
import { UsersDB } from '../../utils/databases.js';

const getAllUsers = async (req, res) => {
	const { id } = req.query;
	const { userData } = req;
	const admin = req.baseUrl.includes('admin');
	if (admin) {
		const view = id ? 'User' : 'Users';
		const title = id ? AppSettings.page_titles.user_profile : AppSettings.page_titles.users;
		const headers = id ? User.ProfileHeaders : User.TableHeaders;
		const data = { title, isLogedIn: true, userData: userData, headers };
		if (id) {
			const response = await UsersDB.get(id);
			if (response) data.user = User.toUi(response);
		}

		res.render(view, data);
	} else {
		res.render('error', {
			title: 'Error Page',
			message: 'Unauthorized, Admin only',
			isLogedIn: true,
			userData,
		});
	}
};

const getUser = async (req, res) => {
	const { uid } = req.body;
	const { admin } = req;
	if (admin) {
		res.render('users', {
			users: users[uid],
			title: 'Users Page',

			isLogedIn: true,
			userData: req.userData,
			admin,
		});
	} else {
		res.render('error', {
			title: 'Error',
			userData: req.userData,
			message: 'Unauthorized, Admin only',
			admin,
		});
	}
};

export { getAllUsers, getUser };

// INSERT INTO `react-login-bd9ed.SocialLogin.Users`
// (Id, Name, Email, EmailVerified, PhoneNumber, Provider, CreationTime, LastLogin,
// LastRefreshTime, Disabled, PasswordHash, PasswordSalt, TokensValidAfterTime, Admin)
// VALUES ("30s6dnXO8phkTXtnZL6YvdyNNwl1","tal geler", "tal.g.jul@gmail.com",true,"undefined","google.com", "14/03/2022 00:57","12/04/2022 21:03","12/04/2022 21:03",false,"undefined","undefined","12/04/2022 21:03",false)

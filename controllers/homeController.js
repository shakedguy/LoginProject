import AppSettings from '../utils/appsettings.js';
const getHomePage = async (req, res) => {
	const userData = req.cookies.userData || null;
	const isLogedIn = userData ? true : false;
	res.render('Index', {
		title: AppSettings.page_titles.home,
		userData,
		isLogedIn,
	});
};

export { getHomePage };

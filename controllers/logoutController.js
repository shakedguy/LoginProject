const logout = (req, res) => {
	res.clearCookie('idToken');
	res.clearCookie('userData');
	res.clearCookie('admin');
	res.clearCookie('profileURL');
	const admin = req.baseUrl.includes('admin');
	if (admin) {
		res.redirect('/admin/login');
	} else {
		res.redirect('/login');
	}
};

export { logout };

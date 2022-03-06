exports.logout = (req, res) => {
  res.clearCookie('idToken');
  res.clearCookie('userData');
  res.redirect('/login');
};

const items = ['Home', 'Profile', 'Admin'];
const adminItems = ['Home', 'Profile', 'Messages', 'Users'];

exports.getMenuItems = (req, res) => {
  const data = req.baseUrl.includes('admin') && req.cookies.idToken ? adminItems : items;
  res.status(200).json({ data });
};

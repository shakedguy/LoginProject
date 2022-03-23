const items = ['Home', 'Profile', 'Users', 'Messages', 'Login', 'Register'];

exports.getMenuItems = (req, res) => {
  res.status(200).json({ data: items });
};

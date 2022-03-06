const userDataCookie = (req, res, next) => {
  const userData = req.userData || null;
  const expiresIn = Number(process.env.EXPIRES_COOKIE);
  const options = { maxAge: expiresIn, httpOnly: true };
  res.cookie('userData', userData, options);
  next();
};

module.exports = userDataCookie;

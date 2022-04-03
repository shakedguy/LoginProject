const admin = require('firebase-admin');

const authorization = (req, res, next) => {
  const sessionCookie = req.cookies.idToken || '';
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true)
    .then((userData) => {
      req.userData = userData;
      next();
    })
    .catch((error) => {
      const redirect = req.baseUrl.includes('admin') ? '/admin/login' : '/login';
      res.redirect(redirect);
    });
};

module.exports = authorization;

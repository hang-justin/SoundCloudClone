const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// sets JWT cookie after user is logged in or signed up
const setTokenCookie = (res, user) => {

  // Creates token for return later
  const token = jwt.sign(
    { data: user.toSafeObject() },      // returns user id, username, & email
    secret,
    { expiresIn: parseInt(expiresIn) } // currently set to 1wk in secs
  );

  const isProudction = process.env.NODE_ENV === 'production';

  // Attaches cookie to response
  res.cookie('token', token, {
    maxAge: expiresIn * 1000,   // maxAge in milliseconds
    httpOnly: true,
    secure: isProudction,       // Only sent w/ HTTPS protocol
    sameSite: isProudction && 'Lax'
  });

  return token;
};

const restoreUser = (req, res, next) => {
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) return next();

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

const requireAuth = (req, _res, next) => {
  if (req.user) return next();

  const err = new Error('Unauthorized');
  err.title = 'Unauthorized'
  err.errors = ['Unauthorized'];
  err.status = 401;
  return next(err);
}

module.exports = { setTokenCookie, restoreUser, requireAuth }

// Holds resources for route paths beginning with /api/session

const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email or username is required.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required.'),
  handleValidationErrors
]

// <-------------------- CRUD FUNCTIONS -------------------->
const getSession = async (req, res) => {
  const { user } = req;
  if (user) {
    const { id, firstName, lastName, username, email } = user.toSafeObject();
    const token = await setTokenCookie(res, user);

    return res.json({
      id,
      firstName,
      lastName,
      username,
      email,
      token
    });

  } else return res.json({});
}

const logInUser = async (req, res, next) => {
  const { credential, password } = req.body;

  let user = await User.login({ credential, password });

  if (!user) {
    const err = new Error('Invalid credentials.')
    res.statusCode = err.status = 401;
    console.error(err);

    return res.json({
      message: err.message,
      statusCode: err.status
    })
  }

  const token = await setTokenCookie(res, user);

  user = user.toJSON()
  const { id, firstName, lastName, email, username } = user;

  return res.json({
    id,
    firstName,
    lastName,
    email,
    username,
    token
  })
}

const logOut = async (_req, res) => {
  res.clearCookie('token');

  return res.json({ message: 'success' })
}

// <-------------------- CRUD ROUTERS -------------------->
router.get('/', requireAuth, getSession);
router.post('/', validateLogin, logInUser);
router.delete('/', logOut)

module.exports = router;

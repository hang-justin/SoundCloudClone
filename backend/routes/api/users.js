// holds resources for route paths beginning with /api/users

const express = require('express');
const router = express.Router();

const { paramNotFoundErrFor, paramNotFoundErrHandler } = require('../../utils/paramNotFoundError')

const { setTokenCookie } = require('../../utils/auth');
const { User, Song, Playlist, Album } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required.'),
  handleValidationErrors
]

// <-------------------- CRUD FUNCTIONS -------------------->
const signUpUser = async (req, res) => {
  try {
    const { email, password, username, firstName, lastName } = req.body;

    const user = await User.signup({ email, username, password, firstName, lastName });

    const token = await setTokenCookie(res, user);

    const { id } = user;

    return res.json({
      id,
      firstName,
      lastName,
      username,
      email,
      token
    });
  }
  catch (e) {
    const errors = {};
    e.errors.map(error => {
      errors[error.path] = error.message
    })

    res.statusCode = 403;
    res.json({
      message: 'User already exists',
      statusCode: res.statusCode,
      errors
    })
  }
}

const getSongsByArtistId = async (req, res, next) => {
  const userId = req.params.artistId;

  const artist = await User.findByPk(userId);

  if (!artist) return next(paramNotFoundErrFor('artist'))

  const allSongs = await Song.findAll({
    where: { userId }
  });

  res.json({ Songs: allSongs });
}

const getPlaylistbyUserId = async (req, res, next) => {
  const userId = req.params.userId;
  if (isNaN(parseInt(userId))) return next(paramNotFoundErrFor('user'));

  const user = await User.findByPk(userId);

  if (!user) return next(paramNotFoundErrFor('user'));

  const playlists = await Playlist.findAll({
    where: { userId }
  })

  res.statusCode = 200;
  return res.json({
    Playlists: playlists
  })

}

const getArtistDetailsById = async (req, res, next) => {
  const userId = req.params.userId;

  if (isNaN(parseInt(userId))) return next(paramNotFoundErrFor('artist'));

  let artist = await User.findByPk(userId, {
    attributes: { exclude: ['firstName', 'lastName'] }
  });
  if (!artist) return next(paramNotFoundErrFor('artist'));

  artist = artist.toJSON();
  artist.totalSongs = await Song.count({ where: { userId } })
  artist.totalAlbums = await Album.count({ where: { userId } })

  res.statusCode = 200;
  res.json(artist);
}

// <-------------------- CRUD ROUTERS -------------------->
router.post('/', validateSignup, signUpUser)
router.get('/:artistId/songs', getSongsByArtistId)
router.get('/:userId/playlists', getPlaylistbyUserId)
router.get('/:userId', getArtistDetailsById)

// <-------------------- ERROR HANDLERS -------------------->
router.use(paramNotFoundErrHandler)

module.exports = router;

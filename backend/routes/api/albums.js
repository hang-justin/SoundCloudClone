// Holds resources for route paths beginning with /api/albums

const express = require('express');
const router = express.Router();

const { paramNotFoundErrFor, paramNotFoundErrHandler } = require('../../utils/paramNotFoundError');
const { unauthorizedEditErrHandler, unauthorizedErrToEdit } = require('../../utils/unauthorizedErrToEdit');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Song, User, Album, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateAlbumPost = [
  check('title')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Album name is required'),
  handleValidationErrors
]

const validateSongPost = [
  check('title')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Song title is required'),
  check('url')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Audio is required'),
  handleValidationErrors
];

// <-------------------- CRUD FUNCTIONS -------------------->
const getAllAlbums = async (req, res) => {
  const albums = await Album.findAll();

  res.statusCode = 200;
  res.json({
    Albums: albums
  })
}

const getCurrentUserAlbums = async (req, res, next) => {
  const userId = req.user.id;

  const userAlbums = await Album.findAll({ where: { userId } });

  if (!userAlbums.length) {
    res.statusCode = 404;
    return res.json({
      message: `You have no albums.`
    })
  }

  res.statusCode = 200;
  res.json({
    Albums: userAlbums
  })
}

const getAlbumById = async (req, res, next) => {
  if (req.params.albumId === 'current') return next();
  const albumId = parseInt(req.params.albumId);

  if (isNaN(albumId)) return next(paramNotFoundErrFor(`Album`))

  const album = await Album.findByPk(albumId, {
    include: { model: Song }
  })

  if (!album) return next(paramNotFoundErrFor(`Album`))

  res.statusCode = 200;
  res.json(album)
}

const editAlbum = async (req, res, next) => {
  const userId = req.user.id;
  const albumId = req.params.albumId;

  if (isNaN(parseInt(albumId))) return next(paramNotFoundErrFor(`Album`));

  const album = await Album.findByPk(albumId);
  if (!album) return next(paramNotFoundErrFor(`Album`));
  if (album.userId !== userId) return next(unauthorizedErrToEdit('album'));

  const { title, description, imageUrl } = req.body;

  if (title) album.title = title;
  if (description) album.description = description;
  if (imageUrl) album.imageUrl = imageUrl;
  await album.save();

  res.statusCode = 200;
  res.json(album);
}

const deleteAlbumById = async (req, res, next) => {
  const userId = req.user.id;

  const albumId = req.params.albumId;
  if (isNaN(parseInt(albumId))) return next(paramNotFoundErrFor(`Album`))

  const album = await Album.findByPk(albumId);
  if (!album) return next(paramNotFoundErrFor(`Album`));
  if (userId !== album.userId) return next(unauthorizedErrToEdit('album'));

  await album.destroy();

  res.statusCode = 200;
  res.json({
    message: `Successfully deleted`,
    statusCode: res.statusCode
  })

}

const createSong = async (req, res, next) => {
  const userId = req.user.id;
  const albumId = parseInt(req.params.albumId);

  if (isNaN(albumId)) return next(paramNotFoundErrFor(`Album`));
  const album = await Album.findByPk(albumId);
  if (!album) return next(paramNotFoundErrFor(`Album`));
  if (album.userId !== userId) return next(unauthorizedErrToEdit('album'))

  const { title, description, url, imageUrl } = req.body;

  const song = await Song.create({ userId, albumId, title, description, url, imageUrl });

  res.statusCode = 201;
  res.json(song);

}

const createAlbum = async (req, res, next) => {
  const userId = req.user.id;

  const { title, description, imageUrl } = req.body;

  const album = await Album.create({ userId, title, description, imageUrl });

  res.statusCode = 201;
  res.json(album);
}

// <-------------------- CRUD ROUTERS -------------------->
router.get('/', getAllAlbums)
router.get('/:albumId', getAlbumById)
router.get('/current', requireAuth, getCurrentUserAlbums)
router.put('/:albumId', requireAuth, validateAlbumPost, editAlbum)
router.delete('/:albumId', requireAuth, deleteAlbumById)
router.post('/:albumId/songs', requireAuth, validateSongPost, createSong);
router.post('/', requireAuth, validateAlbumPost, createAlbum)

// <-------------------- ERROR HANDLERS -------------------->
router.use(unauthorizedEditErrHandler)
router.use(paramNotFoundErrHandler)

module.exports = router;

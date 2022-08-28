// Holds resources for route paths beginning with /api/songs

const express = require('express');
const router = express.Router();

const { paramNotFoundErrFor, paramNotFoundErrHandler } = require('../../utils/paramNotFoundError')

const { requireAuth } = require('../../utils/auth');
const { Song, User, Album, Comment, sequelize } = require('../../db/models')

const { check } = require('express-validator');
const { query } = require('express-validator/check')
const { handleValidationErrors } = require('../../utils/validation');

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

const validateCommentPost = [
  check('body')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage(`Comment body text is required`),
  handleValidationErrors
];

const validateQuery = [
  query('page')
    .isInt({ min: 0 }).withMessage(`Page must be greater than or equal to 0`)
    .isInt({ max: 10 }).withMessage(`Page must be less than or equal to 10`),
  query('size')
    .isInt({ min: 0 }).withMessage(`Size must be greater than or equal to 0`)
    .isInt({ max: 20 }).withMessage(`Size must be less than or equal to 20`),
  handleValidationErrors
];

// <-------------------- CRUD FUNCTIONS -------------------->
const getAllSongs = async (req, res) => {
  const pagination = {};
  let { page, size } = req.query;
  page = parseInt(page);
  size = parseInt(size);

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(size) || size < 1 || size > 20) size = 20;

  pagination.offset = size * (page - 1);
  pagination.limit = size;

  const allSongs = await Song.findAll({ ...pagination });

  res.statusCode = 200;
  return res.json({ Songs: allSongs, page, size });
}

const getCurrentUserSongs = async (req, res) => {
  const userId = req.user.toJSON().id;

  if (!userId) return next(paramNotFoundErrFor('user'));

  const results = await Song.findAll({
    where: { userId }
  })

  res.statusCode = 200;
  return res.json({
    Songs: results
  })
}

const getSongById = async (req, res, next) => {
  const id = req.params.songId;
  if (id === 'current') return next();

  if (isNaN(parseInt(id))) return next(paramNotFoundErrFor('song'));

  const song = await Song.findByPk(id, {
    include: [
      {
        model: User,
        as: 'Artist',
        attributes: ['id', 'username']
      },
      {
        model: Album,
        attributes: ['id', 'title', 'imageUrl']
      }
    ]
  });

  if (!song) return next(paramNotFoundErrFor('song'));

  res.statusCode = 200;
  return res.json(song)
}

const createSong = async (req, res, next) => {
  const { title, description, url, imageUrl, albumId } = req.body;

  let album;
  const currentUserId = req.user.dataValues.id;

  if (albumId) {
    album = await Album.findByPk(albumId);

    if (!album) return next(paramNotFoundErrFor('album'))

    // Check if album.userId matches with user posting
    // Only allow posting if match
    if (album.userId !== currentUserId) {
      const err = new Error('Forbidden')
      res.statusCode = err.status = 403;
      return res.json({
        message: err.message,
        statusCode: err.status
      })
    }
  }
  console.log(`     CURRENT USER ID IS ${currentUserId}`)
  const newSong = await Song.create({
    userId: currentUserId,
    albumId,
    title,
    description,
    url,
    imageUrl
  })

  res.statusCode = 201;
  return res.json(newSong)
}

const updateSong = async (req, res) => {
  const id = req.params.songId;
  const currentUserId = req.user.dataValues.id;

  const { title, description, url, imageUrl, albumId } = req.body;

  if (albumId) {
    const newAlbum = await Album.findByPk(albumId);
    if (!newAlbum) return next(paramNotFoundErrFor('album'));

    // if current user attempts to attach their song to an album that isn't theirs
    if (currentUserId !== newAlbum.userId) {
      const err = new Error('Forbidden');
      res.statusCode = err.status = 403;
      return res.json({
        message: err.message,
        statusCode: err.status
      })
    }
  }

  const song = await Song.findByPk(id);

  if (!song) return next(paramNotFoundErrFor('song'));

  if (currentUserId !== song.dataValues.userId) {
    const err = new Error(`Forbidden`);
    res.statusCode = err.status = 403;
    return res.json({
      message: err.message,
      statusCode: err.status
    })
  }

  if (title) song.title = title;
  if (description) song.description = description;
  if (url) song.url = url;
  if (imageUrl) song.imageUrl = imageUrl;
  if (albumId || albumId === null) song.albumId = albumId;

  song.save();
  res.statusCode = 200;
  return res.json(song);
}

const deleteSong = async (req, res) => {
  const currentUserId = req.user.dataValues.id;
  const songId = req.params.songId;

  const song = await Song.findByPk(songId);

  if (!song) return next(paramNotFoundErrFor('song'));

  if (currentUserId !== song.userId) {
    const err = new Error(`Forbidden`);
    res.statusCode = err.status = 403;
    return res.json({
      message: err.message,
      statusCode: err.status
    })
  }


  await song.destroy();
  res.statusCode = 200;
  return res.json({
    message: 'Successfully deleted.',
    statusCode: res.statusCode
  })

}

const getCommentsbySongId = async (req, res, next) => {
  const songId = req.params.songId;
  if (isNaN(parseInt(songId))) return next(paramNotFoundErrFor(`Song`));

  const song = await Song.findByPk(songId);
  if (!song) return next(paramNotFoundErrFor(`Song`));

  const comments = await Comment.findAll({ where: { songId } })

  res.statusCode = 200;
  return res.json(comments);
}

const addCommentToSong = async (req, res, next) => {
  const songId = req.params.songId;
  if (isNaN(parseInt(songId))) return next(paramNotFoundErrFor(`Song`));

  const song = await Song.findByPk(songId);
  if (!song) return next(paramNotFoundErrFor(`Song`));

  const userId = req.user.id;
  const { body } = req.body;

  let comment = await Comment.create({
    userId,
    songId,
    body
  })

  res.statusCode = 200;
  return res.json(comment)
}

// <-------------------- CRUD ROUTERS -------------------->
router.get('/', getAllSongs);
router.get('/:songId', getSongById);
router.get('/current', requireAuth, getCurrentUserSongs);
router.get('/:songId/comments', getCommentsbySongId);
router.post('/', requireAuth, validateSongPost, createSong);
router.post('/:songId/comments', requireAuth, validateCommentPost, addCommentToSong);
router.put('/:songId', requireAuth, validateSongPost, updateSong);
router.delete('/:songId', requireAuth, deleteSong);

// <-------------------- ERROR HANDLERS -------------------->
router.use(paramNotFoundErrHandler);

module.exports = router;

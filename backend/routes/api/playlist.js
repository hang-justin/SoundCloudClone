// Holds resources for route paths beginning with /api/playlists

const express = require('express');
const router = express.Router();

const { paramNotFoundErrFor, paramNotFoundErrHandler } = require('../../utils/paramNotFoundError');
const { unauthorizedEditErrHandler, unauthorizedErrToEdit } = require('../../utils/unauthorizedErrToEdit');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Playlist, Song, PlaylistsSong } = require('../../db/models')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validatePlaylistPost = [
  check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Playlist name is required'),
  handleValidationErrors
]

// <-------------------- CRUD FUNCTIONS -------------------->
const createPlaylist = async (req, res, next) => {
  const userId = req.user.id
  const { name, imageUrl } = req.body;

  const newPlaylist = await Playlist.create({
    userId,
    name,
    imageUrl
  })

  res.statusCode = 201;
  res.json(newPlaylist)
}

const addSongToPlaylist = async (req, res, next) => {
  const currentUserId = req.user.dataValues.id;
  const { songId } = req.body;

  const playlistId = req.params.playlistId;
  const playlist = await Playlist.findByPk(playlistId, {
    include: { model: User }
  })

  if (!playlist) return next(paramNotFoundErrFor(`Playlist`))
  if (playlist.User.id !== currentUserId) return next(unauthorizedErrToEdit('playlist'));

  const song = await Song.findByPk(songId);
  if (!song) return next(paramNotFoundErrFor(`Song`));

  let playlistsSong = await PlaylistsSong.create({ playlistId: playlist.id, songId });

  res.statusCode = 200;
  return res.json(playlistsSong);

}

const deleteSongFromPlaylist = async (req, res, next) => {
  const currentUserId = req.user.dataValues.id;
  const { songId } = req.body;

  const playlistId = req.params.playlistId;
  const playlist = await Playlist.findByPk(playlistId, {
    include: { model : User }
  })

  if (!playlist) return next(paramNotFoundErrFor(`Playlist`))
  if (playlist.User.id !== currentUserId) return next(unauthorizedErrToEdit('playlist'));

  const song = await Song.findByPk(songId);
  if (!song) return next(paramNotFoundErrFor(`Song`))

  let playlistsSong = await PlaylistsSong.findOne({
    where: { playlistId: playlist.id, songId }
  })

  if(playlistsSong) {
    await playlistsSong.destroy();

    res.statusCode = 200;
    return res.json({
      message: `Successfully deleted.`,
      statusCode: res.statusCode
    })
  }

}

const getPlaylistById = async (req, res, next) => {
  const { playlistId } = req.params;
  if (playlistId === 'current') return next();
  if (isNaN(parseInt(playlistId))) return next(paramNotFoundErrFor(`Playlist`))

  const playlist = await Playlist.findByPk(playlistId, {
    include: {
      model: Song,
      through: { attributes: [] } // <-- prevents mapping object from being added (join through table)
    }
  });

  if (!playlist) return next(paramNotFoundErrFor(`Playlist`))

  res.statusCode = 200;
  res.json(playlist);
}

const editPlaylist = async (req, res, next) => {
  const userId = req.user.id
  const playlistId = parseInt(req.params.playlistId);

  if (isNaN(playlistId)) return next(paramNotFoundErrFor(`Playlist`))

  const playlist = await Playlist.findByPk(playlistId);
  if (!playlist) return next(paramNotFoundErrFor(`Playlist`))
  if (userId !== playlist.userId) return next(unauthorizedErrToEdit('playlist'))

  const { name, imageUrl } = req.body;

  if (name) playlist.name = name;
  if (imageUrl) playlist.imageUrl = imageUrl;

  await playlist.save();
  res.statusCode = 200;
  res.json(playlist)
}

const deletePlaylist = async (req, res, next) => {
  const userId = req.user.id;
  const playlistId = parseInt(req.params.playlistId);

  if (isNaN(playlistId)) return next(paramNotFoundErrFor(`Playlist`));

  const playlist = await Playlist.findByPk(playlistId);
  if (!playlist) return next(paramNotFoundErrFor(`Playlist`))
  if (userId !== playlist.userId) return next(unauthorizedErrToEdit('playlist'))

  await playlist.destroy();

  res.statusCode = 200;
  return res.json({
    message: `Successfully deleted.`,
    statusCode: res.statusCode
  })
}

const getAllPlaylists = async (req, res, next) => {
  const userId = req.user.id;

  const playlists = await Playlist.findAll({
    where: { userId },
    include: {
      model: Song,
      through: { attributes: [] }
    }
  })

  if (!playlists.length) {
    res.statusCode = 404;
    return res.json({
      message: `No playlists found.`
    })
  }

  res.statusCode = 200;
  res.json({ Playlists: playlists })
}

// <-------------------- CRUD ROUTERS -------------------->
router.get('/:playlistId', getPlaylistById);
router.get('/current', requireAuth, getAllPlaylists);
router.post('/', requireAuth, validatePlaylistPost, createPlaylist)
router.post('/:playlistId/songs/add', requireAuth, addSongToPlaylist);
router.post('/:playlistId/songs/delete', requireAuth, deleteSongFromPlaylist);
router.put('/:playlistId', requireAuth, validatePlaylistPost, editPlaylist);
router.delete('/:playlistId', requireAuth, deletePlaylist);

// <-------------------- ERROR HANDLERS -------------------->
router.use(unauthorizedEditErrHandler)
router.use(paramNotFoundErrHandler)

module.exports = router;

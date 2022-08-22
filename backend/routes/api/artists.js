// Holds resources for route paths beginning with /api/artists

const express = require('express');
const router = express.Router();

const { paramNotFoundErrFor, paramNotFoundErrHandler } = require('../../utils/paramNotFoundError');

const { User, Album } = require('../../db/models')

// <-------------------- CRUD FUNCTIONS -------------------->
const getAlbumsByArtist = async (req, res, next) => {
  const artistId = req.params.userId;

  const artist = await User.findByPk(artistId);
  if (!artist) return next(paramNotFoundErrFor(`Artist`))

  const artistAlbums = await Album.findAll({ where: {userId: artistId} })
  if (!artistAlbums.length) {
    res.statusCode = 200;
    return res.json({
      message: `The artist has no albums`
    })
  }

  res.statusCode = 200;
  res.json({
    Albums: artistAlbums
  })
}

// <-------------------- CRUD ROUTERS -------------------->
router.get('/:userId/albums', getAlbumsByArtist)

// <-------------------- ERROR HANDLERS -------------------->
router.use(paramNotFoundErrHandler)

module.exports = router;

// Holds resources for route paths beginning with /api

const router = require('express').Router();

const sessionRouter = require('./session');
const usersRouter = require('./users');
const songsRouter = require('./songs');
const artistsRouter = require('./artists');
const playlistsRouter = require('./playlist')
const albumsRouter = require('./albums')
const commentsRouter = require('./comments')
const { restoreUser } = require('../../utils/auth')

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/songs', songsRouter)
router.use('/artists', artistsRouter)
router.use('/playlists', playlistsRouter)
router.use('/albums', albumsRouter)
router.use('/comments', commentsRouter)

// Test - Should be ok to remove according to phase 0 end
// router.post('/test', (req, res) => {
//   res.json(
//     {
//       requestBody: req.body
//     }
//   )
// })

module.exports = router;

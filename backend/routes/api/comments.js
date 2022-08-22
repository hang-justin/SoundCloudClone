// Holds resources for route paths beginning with /api/comments

const express = require('express');
const router = express.Router();

const { paramNotFoundErrFor, paramNotFoundErrHandler } = require('../../utils/paramNotFoundError');
const { unauthorizedEditErrHandler, unauthorizedErrToEdit } = require('../../utils/unauthorizedErrToEdit');

const { requireAuth } = require('../../utils/auth');
const { Comment } = require('../../db/models')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateCommentPost = [
  check('body')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage(`Comment body text is required`),
  handleValidationErrors
]

// <-------------------- CRUD FUNCTIONS -------------------->
const deleteComment = async (req, res, next) => {
  const userId = req.user.id;
  const commentId = req.params.commentId;

  if (isNaN(parseInt(commentId))) return next(paramNotFoundErrFor(`Comment`));

  const comment = await Comment.findByPk(commentId);
  if (!comment) return next(paramNotFoundErrFor(`Comment`));
  if (comment.userId !== userId) return next(unauthorizedErrToEdit('comment'));

  await comment.destroy();

  res.statusCode = 200;
  return res.json({
    message: `Successfully deleted.`,
    statusCode: res.statusCode
  })
}

const editComment = async (req, res, next) => {
  const userId = req.user.id;
  const commentId = req.params.commentId;

  if (isNaN(parseInt(commentId))) return next(paramNotFoundErrFor(`Comment`));

  const comment = await Comment.findByPk(commentId);
  if (!comment) return next(paramNotFoundErrFor(`Comment`));
  if (comment.userId !== userId) return next(unauthorizedErrToEdit(`comment`));

  const { body } = req.body;

  comment.body = body;
  await comment.save();

  res.statusCode = 200;
  return res.json(comment);
}

// <-------------------- CRUD ROUTERS -------------------->

router.delete('/:commentId', requireAuth, deleteComment);
router.put('/:commentId', requireAuth, validateCommentPost, editComment)

// <-------------------- ERROR HANDLERS -------------------->
router.use(paramNotFoundErrHandler)
router.use(unauthorizedEditErrHandler)

module.exports = router;

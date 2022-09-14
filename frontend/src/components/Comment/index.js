
import { useDispatch, useSelector } from 'react-redux';

import { deleteCommentFromSongReq } from '../../store/song';

import './Comment.css';


// comment parameter => { id, userId, songId, body, createdAt, updatedAt }
// render delete button if sessionUser matches comment.userId
// user passed in refers to sessionUser
const Comment = ({ commentInd, user, comment }) => {
  const dispatch = useDispatch();
  let artists = useSelector(state => state.artists)

  let commentOwner = (user?.id === comment.userId);

  const deleteHandler = () => {
    console.log(comment.id);
    // dispatch a thunk
    // thunk will have to cause a change in state in state.songs.current and
    // should cause the song component/page to re-render

    dispatch(deleteCommentFromSongReq(comment.id, commentInd))
  }

  const deleteButton = (
      <button className='delete-comment-btn' onClick={deleteHandler}>
        <i className="fa-solid fa-trash"></i>
      </button>
  )

  return (
    <div className='comment-wrapper'>

      <div className='comment-wrapper__commenter-info'>

        <div className='commenterPic'>
        </div>

        <div className='commentInfo' id={`comment${comment.id}`}>

          <div className='commenterUsername'>
            {artists[comment.userId].username}
          </div>

          <div className='commentBody'>
            {comment.body}
          </div>

        </div>

      </div>

    <div className='comment-wrapper__right'>
      {commentOwner && deleteButton}
    </div>

    </div>
  )
}

export default Comment;

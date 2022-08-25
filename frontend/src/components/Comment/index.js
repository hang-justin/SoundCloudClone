
import { useDispatch, useSelector } from 'react-redux';
import './Comment.css';


// comment parameter => { id, userId, songId, body, createdAt, updatedAt }
// render delete button if sessionUser matches comment.userId
const Comment = ({ comment }) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  if (user.id !== comment.userId) {
    // run dispatch to retrieve user
  }

  return (
    <div className='comment-wrapper'>

      <div className='commenterPic'>pic
      </div>

      <div className='commentInfo' id={`comment${comment.id}`}>

        <div className='commenterUsername'>
          {comment.userId}
        </div>

        <div className='commentBody'>
          {comment.body}
        </div>

      </div>

    </div>
  )
}

export default Comment;

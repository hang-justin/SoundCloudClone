
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheseArtists } from '../../store/artists';

import { deleteCommentFromSongReq } from '../../store/song';

import './Comment.css';


// comment parameter => { id, userId, songId, body, createdAt, updatedAt }
// render delete button if sessionUser matches comment.userId
// user passed in refers to sessionUser
const Comment = ({ commentInd, user, comment }) => {
  const dispatch = useDispatch();
  let artist = useSelector(state => state.artists[comment.userId])
  const [isLoaded, setIsLoaded] = useState(!!artist)
  const profilePics = useSelector(state => state.profilePics)

  let commentOwner = (user?.id === comment.userId);

  const deleteHandler = () => {
    console.log(comment.id);
    // dispatch a thunk
    // thunk will have to cause a change in state in state.songs.current and
    // should cause the song component/page to re-render

    dispatch(deleteCommentFromSongReq(comment, commentInd))
  }

  const deleteButton = (
      <button className='delete-comment-btn' onClick={deleteHandler}>
        <i className="fa-solid fa-trash"></i>
      </button>
  )

  // if the commenter isn't in the artist/user slice of state
  // send out a dispatch to retrieve that user's info to be able
  // to get their username


  useEffect(() => {
    if (artist) return;
    console.log('sending out a dispatch from the useEffect in Comment Component')
    dispatch(getTheseArtists(comment.userId))
    .then(() => setIsLoaded(true));
  }, [artist])

  if (!isLoaded) return <div>Loading...</div>

  const profilePicSrc = profilePics[artist.username];

  return (
    <div className='comment-wrapper'>

      <div className='comment-wrapper__commenter-info'>

        <div className='commenterPic'>
          {profilePicSrc && <img className='commenterPic' src={profilePicSrc} />}
        </div>

        <div className='commentInfo' id={`comment${comment.id}`}>

          <div className='commenterUsername'>
            {artist.username}
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

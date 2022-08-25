import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addCommentToSongReq } from '../../store/song';

import './AddComment.css';

// if no user, LogIn Modal must come up

// const keyboard =  document.querySelector('.keyboard')
// keyboard.addEventListener('keydown', func)
// useEffect to add above eventlistener
//      and use its return to removeEventListener

const AddComment = ({ songId, user }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const listenForEnter = (keydown) => {
    if (keydown.key === 'Enter') {
      keydown.preventDefault();
      let submitBtn = document.getElementById('submit-comment-btn');
      submitBtn.click();
    }
  }

  useEffect(() => {
    const commentForm = document.getElementById('form__comment__textarea')

    commentForm.addEventListener('keydown', listenForEnter);

    return () => commentForm.removeEventListener('keydown', listenForEnter);
  }, [])

  const handleCommentSubmission = (e) => {
    e.preventDefault();

    let commentSubmission = comment.trim();
    if (commentSubmission.length === 0) return;
    console.log('commentSubmission is :', commentSubmission)
    console.log(typeof commentSubmission)
    console.log('commentSubmission length is: ', commentSubmission.length)

    dispatch(addCommentToSongReq(songId, commentSubmission))
    .then(() => setComment(''))
    .then(() => document.activeElement.blur());

  }

  return (
    <form className='addCommentForm' onSubmit={(e)=>handleCommentSubmission(e)}>
      <textarea
        className='commentBody'
        id='form__comment__textarea'
        rows='1'
        placeholder={'add some comments yo'}
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <button type='submit' id='submit-comment-btn' hidden />
    </form>
  )
}

export default AddComment;

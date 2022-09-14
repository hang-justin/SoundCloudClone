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
  const [emptyCommentErrorClass, setEmptyCommentErrorClass] = useState('');
  const [commentPlaceHolder, setCommentPlaceholder] = useState('Write a comment');

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
    if (commentSubmission.length === 0) {
      setEmptyCommentErrorClass('emptyCommentField')
      setCommentPlaceholder('Comment cannot be empty')
      setComment('');
      return
    };

    dispatch(addCommentToSongReq(songId, commentSubmission))
    .then(() => setComment(''))
    .then(() => document.activeElement.blur());

  }

  // For removing emptyCommentField class from input upon entering characters
  useEffect(() => {
    if (emptyCommentErrorClass === '') return;

    if (comment.trim().length > 0) {
      setEmptyCommentErrorClass('');
      setCommentPlaceholder('Write a comment');
    }


  }, [comment])

  return (
    <form className='addCommentForm' onSubmit={(e)=>handleCommentSubmission(e)}>
      <input
        className={`commentBody ${emptyCommentErrorClass}`}
        id='form__comment__textarea'
        // rows='1'
        placeholder={commentPlaceHolder}
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <button type='submit' id='submit-comment-btn' hidden />
    </form>
  )
}

export default AddComment;

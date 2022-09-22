import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addCommentToSongReq } from '../../store/song';

import './AddComment.css';

// if no user, LogIn Modal must come up

// const keyboard =  document.querySelector('.keyboard')
// keyboard.addEventListener('keydown', func)
// useEffect to add above eventlistener
//      and use its return to removeEventListener

const AddComment = ({ songId, user, comment, setComment }) => {
  const dispatch = useDispatch();
  // const [comment, setComment] = useState('');
  const [songCommentFieldErr, setSongCommentFieldErr] = useState('');
  const [commentPlaceHolder, setCommentPlaceholder] = useState('Write a comment');

  const listenForEnter = (keydown) => {
    if (keydown.key === 'Enter') {
      keydown.preventDefault();
      let submitBtn = document.getElementById('submit-comment-btn');
      submitBtn.click();
    }
  }

  const handleCommentField = (e) => {
    if (e.target.value.trimStart().length <= 255) {
      setComment(e.target.value.trimStart());
    }
  }

  useEffect(() => {
    const addCommentField = document.getElementById('input__commentField')

    addCommentField.addEventListener('keydown', listenForEnter);

    return () => addCommentField.removeEventListener('keydown', listenForEnter);
  }, [])

  const handleCommentSubmission = (e) => {
    e.preventDefault();

    if (!user) alert('Please sign in or create an account to add a comment.')

    let commentSubmission = comment.trim();

    if (commentSubmission.length > 255) return;

    if (commentSubmission.length === 0) {
      setSongCommentFieldErr('songCommentFieldErr')
      setCommentPlaceholder('Comment cannot be empty')
      setComment('');
      return;
    };


    dispatch(addCommentToSongReq(songId, commentSubmission))
    .then(() => setComment(''))
    .then(() => document.activeElement.blur());

  }

  // For removing emptyCommentField class from input upon entering characters
  useEffect(() => {
    if (songCommentFieldErr === '') return;

    if (comment.trim().length > 0) {
      setSongCommentFieldErr('');
      setCommentPlaceholder('Write a comment');
    }

  }, [comment])

  return (
    <form className='addCommentForm' onSubmit={(e)=>handleCommentSubmission(e)}>
      <input
        className={`commentBody ${songCommentFieldErr}`}
        id='input__commentField'
        placeholder={commentPlaceHolder}
        onChange={(e) => handleCommentField(e)}
        value={comment}
      />
      <button type='submit' id='submit-comment-btn' hidden />
    </form>
  )
}

export default AddComment;

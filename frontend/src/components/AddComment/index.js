import { useState } from 'react';

import './AddComment.css';

// if no user, LogIn Modal must come up
const AddComment = ({ user }) => {

  const [comment, setComment] = useState('');

  return (
    <form className='addCommentForm'>
      <textarea
        rows='1'
        placeholder={'add some comments yo'}
        onChange={(e) => setComment(e.target.value)}
      />
    </form>
  )
}

export default AddComment;

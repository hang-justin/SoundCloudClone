import { useState } from "react";
import { useDispatch } from "react-redux";

import { editSongRequest } from "../../store/song";

import './EditSongForm.css';

const EditSongForm = ({ song, setShowModal }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(song.title);
  const [description, setDescription] = useState(song.description === null ? '' : song.description);
  const [imageUrl, setImageUrl] = useState(song.imageUrl);
  const [validTitle, setValidTitle] = useState('valid');
  const [validImgUrl, setValidImgUrl] = useState('valid');
  const [invalidTitle, setInvalidTitle] = useState('');
  const [invalidImgUrl, setInvalidImgUrl] = useState('');

  const picFileTypes = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG'];
  const closeBtnImgSrc = 'https://i.imgur.com/1aSKStp.png';

  const handleEditSong = (e) => {
    e.preventDefault();

    const errors = [];

    if (title.trim().length === 0) {
      // setValidTitle('invalid')
      setInvalidTitle('invalidTitle')
      setTitle('');
      errors.push('Invalid title field')
    }

    let validImg = picFileTypes.map(picExt => {
      return imageUrl.includes(picExt);
    })

    if (imageUrl?.trim().length !== 0 && !validImg.includes(true)) {
      // setValidImgUrl('invalid');
      setInvalidImgUrl('invalidImgUrl')
      errors.push('Invalid image url field')
    }

    if (errors.length > 0) return;

    if (imageUrl?.trim().length === 0) setImageUrl(null);
    if (description?.trim().length === 0) setDescription(null);

    const newSong = { ...song };
    console.log('newSong copied: ', newSong)
    newSong.title = title;
    newSong.description = description;
    newSong.imageUrl = imageUrl;
    console.log('newSong with new props: ', newSong)

    dispatch(editSongRequest(newSong))
      .then(() => setShowModal(false))

  }

  const checkTitleField = (e) => {
    setTitle(e.target.value);
    if (invalidTitle === '') return;

    if (e.target.value.trim() !== '') setInvalidTitle('');
  }

  const checkImgUrlField = (e) => {
    setImageUrl(e.target.value);

    if (invalidImgUrl === '') return;

    if (e.target.value === '') {
      setInvalidImgUrl('')
      return;
    };

    let validImg = picFileTypes.map(picExt => {
      return e.target.value.includes(picExt);
    });

    if (validImg.includes(true)) {
      setInvalidImgUrl('');
      return;
    };
  };

  return (
    <form onSubmit={(e) => handleEditSong(e)} className='editSongForm'>
            <button onClick={() => setShowModal(false)} id='close-edit-song-btn'><img id='close-edit-song-img' src={closeBtnImgSrc} /></button>

      <div className='editSongForm-inner-container'>

        <div className='editSong-leftContainer img-container'>
          <img id='edit-song-form-img' src={song.imageUrl} alt={`${song.title}'s song cover`} className='view-edit-song-img' />
        </div>

        <div className='editSong-middleContainer' />

        <div className='editSong-rightContainer form-input-field-container'>

          <label>
            <p className='edit-song-field edit-title'>Title<span className='title-of-req-field'>*</span></p>
            <input
              id='edit-song-title'
              className={`edit-song-input ${invalidTitle}`}
              // validInput={validTitle}
              type='text'
              placeholder='Name your track'
              value={title}
              onChange={checkTitleField}
            />
          </label>
          {invalidTitle !== '' && <span className='invalid-field-prompt'>Enter a title.</span>}

          <label>
            <p className='edit-song-field edit-description'>Description</p>
            <textarea
              className='edit-song-textarea edit-song-input'
              type='text'
              placeholder='Describe your track'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label>
            <p className='edit-song-field edit-imageUrl'>Image URL</p>
            <input
              className={`edit-song-input ${invalidImgUrl}`}
              // validInput={validImgUrl}
              type='text'
              placeholder='Image your track'
              value={imageUrl}
              onChange={checkImgUrlField}
            />
          </label>
          {invalidImgUrl !== '' && <span className='invalid-field-prompt'>Invalid image url (jpg, jpeg, png supported)</span>}

          <button id='save-edit-song-btn' className='button-edit-song' type='submit'>
            Save changes
          </button>

        </div>

      </div>

    </form>
  );
};

export default EditSongForm;

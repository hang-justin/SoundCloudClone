import { useState } from "react";
import { useDispatch } from "react-redux";

import { editSongRequest } from "../../store/song";

import './EditSongForm.css';

const EditSongForm = ({ song, display }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(song.title);
  const [description, setDescription] = useState(song.description);
  const [imageUrl, setImageUrl] = useState(song.imageUrl);
  const [validTitle, setValidTitle] = useState('valid');
  const [validImgUrl, setValidImgUrl] = useState('valid');

  const picFileTypes = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG'];

  const handleEditSong = (e) => {
    e.preventDefault();

    if (title.trim().length === 0) {
      setValidTitle('invalid')
      return;
    }

    let validImg = picFileTypes.map(picExt => {
      return imageUrl.includes(picExt);
    })

    if (imageUrl?.trim().length !== 0 && !validImg.includes(true)) {
      setValidImgUrl('invalid');
      return;
    }



    if (imageUrl?.trim().length === 0) setImageUrl(null);
    if (description?.trim().length === 0) setDescription(null);

    const newSong = { ...song };
    console.log('newSong copied: ', newSong)
    newSong.title = title;
    newSong.description = description;
    newSong.imageUrl = imageUrl;
    console.log('newSong with new props: ', newSong)

    dispatch(editSongRequest(newSong))
      .then(() => display(false))

  }

  const checkTitleField = (e) => {
    setTitle(e.target.value);
    if (validTitle === 'valid') return;

    if (e.target.value !== '') setValidTitle('valid');
  }

  return (
    <form onSubmit={(e) => handleEditSong(e)} className='editSongForm'>

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
              className='edit-song-input'
              validInput={validTitle}
              type='text'
              placeholder='Name your track'
              value={title}
              onChange={checkTitleField}
            />
          </label>
          {validTitle === 'invalid' && <span className='invalid-field-prompt'>Enter a title.</span>}

          <label>
            <p className='edit-song-field edit-description'>Description</p>
            <textarea
              className='edit-song-textarea'
              type='text'
              placeholder='Describe your track'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label>
            <p className='edit-song-field edit-imageUrl'>Image URL</p>
            <input
              className='edit-song-input'
              validInput={validImgUrl}
              type='text'
              placeholder='Image your track'
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          {validImgUrl === 'invalid' && <span className='invalid-field-prompt'>Invalid Image URL</span>}

          <button id='edit-song-btn' className='button-edit-song' type='submit'>
            Save changes
          </button>

        </div>

      </div>

    </form>
  );
};

export default EditSongForm;

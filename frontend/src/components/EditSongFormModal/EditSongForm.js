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

  const handleEditSong = (e) => {
    e.preventDefault();

    if (title.trim().length === 0) {
      setValidTitle('invalid')
      return;
    } else if (title.trim().length !== 0) {
      setValidTitle('valid');
    }

    if (imageUrl.trim().length === 0) setImageUrl(null);
    if (description.trim().length === 0) setDescription(null);

    const newSong = { ...song };
    console.log('newSong copied: ', newSong)
    newSong.title = title;
    newSong.description = description;
    newSong.imageUrl = imageUrl;
    console.log('newSong with new props: ', newSong)

    dispatch(editSongRequest(newSong))
      .then(() => display(false))

  }

  return (
    <form onSubmit={(e) => handleEditSong(e)} className='editSongForm'>

      <div className='editSongForm-inner-container'>

        <div className='editSong-leftContainer img-container'>
          <img src={song.imageUrl} alt={`${song.title}'s song cover`} className='view-edit-song-img' />
        </div>

        <div className='editSong-middleContainer' />

        <div className='editSong-rightContainer form-input-field-container'>

          <label>
            <p className='edit-song-field edit-title'>Title<span className='title-of-req-field'>*</span></p>
            <input
              valid-title={validTitle}
              type='text'
              placeholder='Name your track'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          {validTitle === 'invalid' && <span className='invalid-field-prompt'>Enter a title.</span>}

          <label>
            <p className='edit-song-field edit-description'>Description</p>
            <textarea
              type='text'
              placeholder='Describe your track'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label>
            <p className='edit-song-field edit-imageUrl'>Image URL</p>
            <textarea
              type='text'
              placeholder='Image your track'
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>

          <button className='button-edit-song' type='submit'>Save changes</button>
        </div>

      </div>

    </form>
  );
};

export default EditSongForm;

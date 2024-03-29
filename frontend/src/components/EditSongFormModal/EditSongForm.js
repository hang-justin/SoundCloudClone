import cancelBtn from '../../img/cancel-btn.png'
import { onErrorImgCoverLoader } from "../../utils";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { editSongRequest } from "../../store/song";
import CloseModalBtn from "../CloseModalBtn";

import './EditSongForm.css';

const EditSongForm = ({ song, setShowModal }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(song.title);
  const [description, setDescription] = useState(song.description === null ? '' : song.description);
  const [imageUrl, setImageUrl] = useState(song.imageUrl === null ? '' : song.imageUrl);

  // useStates below are for regulating character limit and
  //  letting users know about character limit
  const [titleLimitTextMod, setTitleLimitTextMod] = useState('');
  const [titleLimitDisplay, setTitleLimitDisplay] = useState('hidden-span');
  const [titleRedOutline, setTitleRedOutline] = useState('');
  const [descLimitTextMod, setDescLimitTextMod] = useState('');
  const [descLimitDisplay, setDescLimitDisplay] = useState('hidden-span');
  const [descRedOutline, setDescRedOutline] = useState('');
  const [imageUrlLimitTextMod, setImageUrlLimitTextMod] = useState('');
  const [imageUrlLimitDisplay, setImageUrlLimitDisplay] = useState('hidden-span');
  const [imageUrlRedOutline, setImageUrlRedOutline] = useState('');

  useEffect(() => {
    if (title.trimStart().length >= 255) setTitleLimitTextMod('red-text')
    else setTitleLimitTextMod('')

    if (title.length > 0) setTitleLimitDisplay('');
    else setTitleLimitDisplay('hidden-span');
  }, [title])

  useEffect(() => {
    if (description.trimStart().length >= 255) setDescLimitTextMod('red-text')
    else setDescLimitTextMod('')

    if (description.length > 0) setDescLimitDisplay('');
    else setDescLimitDisplay('hidden-span');
  }, [description])

  useEffect(() => {
    if (imageUrl.trimStart().length >= 255) setImageUrlLimitTextMod('red-text')
    else setImageUrlLimitTextMod('')

    if (imageUrl.length > 0) setImageUrlLimitDisplay('');
    else setImageUrlLimitDisplay('hidden-span');
  }, [imageUrl])

  const picFileTypes = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG'];

  const handleEditSong = (e) => {
    e.preventDefault();

    const errors = [];
    setTitleRedOutline('');
    setDescRedOutline('');
    setImageUrlRedOutline('');

    if (title.trim().length === 0) {
      setTitle('');
      errors.push('Invalid title field');
      setTitleRedOutline('red-outline');
    }

    if (title.trim().length > 255) {
      errors.push('Title cannot exceed 255 characters');
      setTitleRedOutline('red-outline');
    }

    if (description.trimStart().length > 255) {
      errors.push('Description cannot exceed 255 characters');
      setDescRedOutline('red-outline');
    }

    if (imageUrl.trim().length > 255) {
      errors.push('Image URL cannot exceed 255 characters');
      setImageUrlRedOutline('red-outline');
    }

    let validImg = picFileTypes.map(picExt => {
      return imageUrl.includes(picExt);
    })

    if (imageUrl?.trim().length !== 0 && !validImg.includes(true)) {
      errors.push('Invalid image url field')
      setImageUrlRedOutline('red-outline');
    }

    if (errors.length > 0) return;

    const newSong = { ...song };
    newSong.title = title;
    newSong.description = description.trim().length === 0
                            ? null
                            : description;
    newSong.imageUrl = imageUrl.trim().length === 0
                        ? null
                        : imageUrl;

    dispatch(editSongRequest(newSong))
      .then(() => setShowModal(false))

  }

  const checkTitleField = (e) => {
    setTitle(e.target.value);

    if (e.target.value.trim() !== '') setTitleRedOutline('');
  }

  const checkDescField = (e) => {
    setDescription(e.target.value);

    if (e.target.value.trimStart().length <= 255) setDescRedOutline('');
  }

  const checkImgUrlField = (e) => {
    setImageUrl(e.target.value);

    if (e.target.value === '') {
      setImageUrlRedOutline('')
      return;
    };

    let validImg = picFileTypes.map(picExt => {
      return e.target.value.includes(picExt);
    });

    if (validImg.includes(true)) {
      setImageUrlRedOutline('');
      return;
    };
  };

  return (
    <form onSubmit={(e) => handleEditSong(e)} className='editSongForm'>
            <button
              onClick={() => setShowModal(false)}
              id='close-edit-song-btn'
              >
                <img
                  src={cancelBtn}
                  id='close-edit-song-img'
                  onError={onErrorImgCoverLoader}
                  alt='close-btn'
                />
            </button>

      <div className='editSongForm-inner-container'>

        <div className='editSong-leftContainer img-container'>
          <img
            src={song.imageUrl}
            id='edit-song-form-img'
            className='view-edit-song-img'
            onError={onErrorImgCoverLoader}
            alt={`${song.title}'s song cover`}
          />
        </div>

        <div className='editSong-middleContainer' />

        <div className='editSong-rightContainer form-input-field-container'>

          <label>
            <p className='edit-song-label-header edit-title'>Title<span className='title-of-req-field'>*</span></p>
            <input
              id='edit-song-title'
              className={`edit-song-input ${titleRedOutline}`}
              type='text'
              placeholder='Name your track'
              value={title}
              onChange={checkTitleField}
            />
            <span className={`${titleLimitTextMod} ${titleLimitDisplay}`}>{255-title.trimStart().length}/255</span>
          </label>

          <label>
            <p className='edit-song-label-header edit-description'>Description</p>
            <textarea
              className={`edit-song-textarea edit-song-input ${descRedOutline}`}
              type='text'
              placeholder='Describe your track'
              value={description}
              onChange={checkDescField}
            />
            <span className={`${descLimitTextMod} ${descLimitDisplay}`}>{255-description.trimStart().length}/255</span>
          </label>

          <label>
            <p className='edit-song-label-header edit-imageUrl'>Image URL (jpg, jpeg, png supported)</p>
            <input
              className={`edit-song-input ${imageUrlRedOutline}`}
              // validInput={validImgUrl}
              type='text'
              placeholder='Image your track'
              value={imageUrl}
              onChange={checkImgUrlField}
            />
            <span className={`${imageUrlLimitTextMod} ${imageUrlLimitDisplay}`}>{255-imageUrl.trimStart().length}/255</span>
          </label>

          <div className='edit-song-modal-button-containers flx-row'>
            <CloseModalBtn closeModalSetterFunc={setShowModal} />

            <button id='save-edit-song-btn' className='button-edit-song' type='submit'>
              Save Changes
            </button>
          </div>


        </div>

      </div>

    </form>
  );
};

export default EditSongForm;

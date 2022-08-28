import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { uploadSong } from "../../store/song";

import './UploadSong.css'

// Note: Must require user to be logged in to view form
const UploadSongForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [albumId, setAlbumId] = useState('');
  const [errors, setErrors] = useState([]);
  const [uploadedSong, setUploadedSong] = useState('');

  // Question: Should I be using a useSelector to retrieve session userId
  //    Or should I be using store.getState()
  //    Or should I be passing it through props?...

  const handleSongUpload = (e) => {
    e.preventDefault();

    setErrors([]);

    const song = {
      title,
      description,
      url,
      imageUrl,
      albumId
    };

    dispatch(uploadSong(song))
      .then((res) => setUploadedSong(res))
      .catch(async (res) => {
        const data = await res.json();
        // Note: check what data is here
        // Note: check for validation errors/edge cases
        if (data.message = 'Forbidden') setErrors(['Invalid Album'])
        else if (data && data.message) setErrors(Object.values([data.message]))
      })

  };

  // title is required
  // audio url is required
  // Note add className to tags below for css
  //  to specifically target elements in form

  // if upload is successful, render a success page
  if (uploadedSong) return (
    <div>

      <div>
        <img src={uploadedSong.imageUrl} alt={`${uploadedSong.title}'s Image`} />
      </div>
      <span>{uploadedSong.title}</span>
      <NavLink to={`/${uploadedSong.userId}/songs/${uploadedSong.id}`}>Go to your track</NavLink>

    </div>
  )

  return (
    <div className='form-wrapper'>
      <form
        id='form__upload-song-form'
        onSubmit={(e) => handleSongUpload(e)}>

        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>


        <h3 id='upload-form-title'>Upload A Track</h3>

        <label className='uploadSongForm-label'>Title<span className='upload-req-field'>*</span>
          <input
            className='uploadSongForm-input'
            name='title'
            type='text'
            placeholder="Name your track"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </label>

        <label className='uploadSongForm-label'>Audio URL<span className='upload-req-field'>*</span>
          <input
            className='uploadSongForm-input'
            name='url'
            type='text'
            placeholder="Link your track"
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
          />
        </label>

        <label className='uploadSongForm-label'>Description
          <textarea
            className='uploadSongForm-textarea'
            name='description'
            type='text'
            placeholder="Describe your track"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>

        <label className='uploadSongForm-label'>Image URL
          <input
            className='uploadSongForm-input'
            name='imageUrl'
            placeholder="Visualize your track"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
          />
        </label>

        {/* <label className='uploadSongForm-label'>Album Id
          <input
            className='uploadSongForm-input'
            name='albumId'
            placeholder="House your track"
            value={albumId}
            onChange={e => setAlbumId(e.target.value)}
          />
        </label> */}

        <button
          id='upload-song-btn'
          type='submit'
        >
          Upload
        </button>

      </form>
    </div>
  )
}

const UploadSong = () => {
  // intention is to be able to upload via mp3 file
  // then fill out forms

  return (
    <div className='upload-song-form-component'>
      {/* <div className='upload-song-nav'>
        <span>Your tracks</span>
      </div> */}
      <UploadSongForm />
    </div>
  );
};

export default UploadSong;

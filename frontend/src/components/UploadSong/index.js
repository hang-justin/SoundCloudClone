import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchAllSongs, uploadSong } from "../../store/song";

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

  const [descLimitTextMod, setDescLimitTextMod] = useState('');
  const [descLimitDisplay, setDescLimitDisplay] = useState('hidden-span')

  useEffect(() => {
    if (description.trimStart().length >= 255) setDescLimitTextMod('red-text')
    else setDescLimitTextMod('')

    if (description.length > 0) setDescLimitDisplay('');
    else setDescLimitDisplay('hidden-span');
  }, [description])

  const audioFileTypes = ['mp3', 'wav', 'ogg'];
  const picFileTypes = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG'];

  // Question: Should I be using a useSelector to retrieve session userId
  //    Or should I be using store.getState()
  //    Or should I be passing it through props?...

  const handleSongUpload = (e) => {
    e.preventDefault();

    setErrors([]);

    let validationErrors = [];

    if (title.trim().length === 0) {
      validationErrors.push('Please enter a title')
    }

    if (description.trimStart().length > 255) {
      validationErrors.push('Song description cannot exceed 255 characters');
    }

    let urlParts = url.split('.');
    let audioExtension = urlParts[urlParts.length - 1];
    if (!audioFileTypes.includes(audioExtension)) {
      validationErrors.push('Invalid audio link (mp3/wav/ogg supported)')
    }

    let validImg = picFileTypes.map( picExt => {
      return imageUrl.includes(picExt);
    })

    if (!validImg.includes(true) && imageUrl.trim().length !== 0) {
      validationErrors.push('Invalid image url (jpg, jpeg, png supported)');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Note: albumId set to null
    // Production error where empty string is invalid
    // Possibly due to prod ORM diff from dev ORM
    const song = {
      title,
      description: description.trimStart(),
      url,
      imageUrl,
      albumId: null
    };

    dispatch(uploadSong(song))
      .then((res) => setUploadedSong(res))
      .then(()=> dispatch(fetchAllSongs()))
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
    <div className='return-uploaded-song-container'>
      <div className='uploaded-song-img-container'>
        <img id='just-uploaded-song-img' src={uploadedSong.imageUrl} alt={`${uploadedSong.title}'s Image`} />
      </div>
      <span className='uploaded-song-title'>{uploadedSong.title}</span>
      <NavLink to={`/${uploadedSong.userId}/songs/${uploadedSong.id}`}>Go to your track</NavLink>

    </div>
  )

  return (
    <div className='form-wrapper'>
      <form
        id='form__upload-song-form'
        onSubmit={(e) => handleSongUpload(e)}>

        <h3 id='upload-form-title'>Upload A Track</h3>

        {!!errors.length && errors.map((error, idx) => <div className='upload-errs' key={idx}>{error}</div>)}

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

        <label id='upload-desc' className='uploadSongForm-label'>Description
          <textarea
            className='uploadSongForm-textarea'
            name='description'
            type='text'
            placeholder="Describe your track"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <span id='upload-desc-char-limit' className={`${descLimitTextMod} ${descLimitDisplay}`}>{255-description.trimStart().length}/255</span>
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

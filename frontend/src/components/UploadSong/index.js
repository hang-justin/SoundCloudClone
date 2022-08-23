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

    // dispatch thunk remember to catch errors

    dispatch(uploadSong(song))
      .then((res) => setUploadedSong(res))
      .catch(async (res) => {
        const data = await res.json();
        // Note: check what data is here
        // Note: check for validation errors/edge cases
        if (data && data.errors) setErrors(Object.values(data.errors))
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
    <div>
      <h3>Upload Form</h3>

      <form onSubmit={(e) => handleSongUpload(e)}>

        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>

        <label>Title<span>*</span>
          <input
            name='title'
            type='text'
            placeholder="Name your track"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </label>

        <label>Audio URL<span>*</span>
          <input
            name='url'
            type='text'
            placeholder="Link your track"
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
          />
        </label>

        <label>Description
          <input
            name='description'
            type='text'
            placeholder="Describe your track"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>

        <label>Image URL
          <input
            name='imageUrl'
            placeholder="Visualize your track"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
          />
        </label>

        <label>Album Id
          <input
            name='albumId'
            placeholder="Buddy-up your track"
            value={albumId}
            onChange={e => setAlbumId(e.target.value)}
          />
        </label>

        <button type='submit'>So you an artist now, huh?</button>

      </form>

    </div>
  )
}

const UploadSong = () => {
  // intention is to be able to upload via mp3 file
  // then fill out forms

  return (
    <div>
      <h2>Upload Song Form Component</h2>
      <UploadSongForm />
    </div>
  );
};

export default UploadSong;

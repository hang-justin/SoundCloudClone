import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as songActions from '../../store/song';

import './Stream.css';

const Stream = () => {
  const dispatch = useDispatch();
  let songsObj = useSelector(state => state.songs)
  let songs = Object.values(songsObj);

  // Note: Thunk fetch returns: { Songs: {songs}, page, size }
  //    Will have to decide with how to handle page, size
  //      For now, with a small DB less than the max size returned
  //        - will just render all those songs
  if (!songs.length) dispatch(songActions.fetchAllSongs());

  if (!songs.length) return <div>Loading...</div>

  let clickHandler = () => {
    alert('Working on it... Stay tuned')
  }

  // Note: For img src... implement as something similar to:
  //    img src={ song.imageUrl ? song.imageUrl : defaultImage }
  //    define defaultImage to render
  let songsRender = songs.map((song) => {
    return (
      <div style={{ display: 'block' }} className='song-container' id={`song${song.id}`}>

        <NavLink className='song-link' to={`/${song.userId}/songs/${song.id}`}>
          <img className='song-image' src={song.imageUrl} alt={`${song.title}'s image`} />
        </NavLink>

        <div className='song-content'>
          <p>Render play button here</p>
          <p>Render artist name</p>
          <p>{song.title}</p>
          <p>Render waveform here</p>
          <button onClick={clickHandler}>Share</button>
          <button onClick={clickHandler}>Copy Link</button>
          <button onClick={clickHandler}>Edit</button>
        </div>

      </div>
    )
  })

  return (
    <div>
      <h2>Stream Component</h2>

        {songsRender}
    </div>
  );
};

export default Stream;

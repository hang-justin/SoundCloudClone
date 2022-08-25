import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as songActions from '../../store/song';
import { getTheseArtists } from '../../store/artists';
import EditSongFormModal from '../EditSongFormModal';

import './Stream.css';

const Stream = () => {
  const dispatch = useDispatch();
  let artists = useSelector(state => state.artists);
  let sessionUser = useSelector(state => state.session.user)
  let songsObj = useSelector(state => state.songs)
  let songs = Object.values(songsObj);

  // Note: Thunk fetch returns: { Songs: {songs}, page, size }
  //    Will have to decide with how to handle page, size
  //      For now, with a small DB less than the max size returned
  //        - will just render all those songs

  let clickHandler = () => {
    alert('Working on it... Stay tuned')
  }

  let deleteTrack = (songId) => {
    dispatch(songActions.deleteTrack(songId));
  }

  // Note: For img src... implement as something similar to:
  //    img src={ song.imageUrl ? song.imageUrl : defaultImage }
  //    define defaultImage to render
  let songsRender = songs.map((song) => {
    let songId = song.id;
    return (
      <div style={{ display: 'block' }} className='song-container' key={`song${song.id}`} id={`song${song.id}`}>

        <NavLink className='song-link' to={`/${song.userId}/songs/${song.id}`}>
          <img className='song-image' src={song.imageUrl} alt={`${song.title}'s image`} />
        </NavLink>

        <div className='song-content'>
          <p>Render play button here</p>
          <p>{artists[song.userId].username}</p>
          <p>{song.title}</p>
          <p>Render waveform here</p>
          <button onClick={clickHandler}>Share</button>
          <button onClick={clickHandler}>Copy Link</button>
          {sessionUser?.id === song.userId && <EditSongFormModal song={song} />}
          {sessionUser?.id === song.userId && <button id={song.id} onClick={(e) => deleteTrack(e.target.id)}>Delete track</button>}
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

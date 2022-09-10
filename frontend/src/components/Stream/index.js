import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as songActions from '../../store/song';
import { getTheseArtists } from '../../store/artists';
import EditSongFormModal from '../EditSongFormModal';
import * as sessionActions from '../../store/session';

import './Stream.css';
import { useEffect } from 'react';

const Stream = ({ track, setTrack, toggleBtn }) => {
  const dispatch = useDispatch();
  let artists = useSelector(state => state.artists);
  let sessionUser = useSelector(state => state.session.user)
  let songsObj = useSelector(state => state.songs)
  let songs = Object.values(songsObj);

  useEffect(() => {
    dispatch(sessionActions.restoreSession())
  }, [dispatch])

  if (!sessionUser) {
    return <div>Loading...</div>
  }

  // Note: Thunk fetch returns: { Songs: {songs}, page, size }
  //    Will have to decide with how to handle page, size
  //      For now, with a small DB less than the max size returned
  //        - will just render all those songs

  let deleteTrack = (songId) => {
    dispatch(songActions.deleteTrack(songId));
  }


  const doesUserOwn = (song) => {
    if (!(sessionUser?.id === song.userId)) return null;

    const editDeleteBtns = [
      <EditSongFormModal key={`edit-song-id-${song.id}`} song={song} />,
      <button key={`delete-song-id-${song.id}`} className='alter-track-btns' id={song.id} onClick={(e) => deleteTrack(song.id)}>
        <i className="fa-solid fa-trash"></i>
      </button>
    ];

    return editDeleteBtns;
  }

  // Note: For img src... implement as something similar to:
  //    img src={ song.imageUrl ? song.imageUrl : defaultImage }
  //    define defaultImage to render
  // songs.current will have a Artist key and is already populated
  // so the conditional below will prevent it from rendering again

  let songsRender = songs.map((song) => {
    if (song.Artist !== undefined) return null;

    const handleStreamToggle = () => {
      if (track === song) toggleBtn.click();
      else setTrack(song);
    }

    return (
      <div key={`stream-song-${song.id}`} className='song-card-container'>
        <div className='song-card-poster'>{artists[song.userId].username} posted a track</div>

        <div className='song-container' id={`song${song.id}`}>

          <div className='song-container__song-image'>
            <NavLink className='song-link' to={`/${song.userId}/songs/${song.id}`}>
              <img className='song-image' src={song.imageUrl} alt={`${song.title}'s image`} />
            </NavLink>
          </div>

          <div className='song-content'>
            <div className='song-content-links'>
              <button onClick={handleStreamToggle} id='stream-card-toggle-play-btn'>
                {/* <div className='song-content-links__play-button-wrapper'> */}
                  <img id='stream-card-toggle-play-img' src='https://cdn-icons-png.flaticon.com/512/73/73940.png' alt='toggle-play-button' />
                {/* </div> */}
              </button>
              <div className='song-content-links__song-author-title'>
                <div className='song-card__artist-name'>{artists[song.userId].username}</div>
                <div className='song-card__song-title'>{song.title}</div>
              </div>
            </div>
            <div className='waveform-container'>
              <img className='song-waveform-img' src='https://i.imgur.com/jsHWeIy.png' alt='waveform' />
            </div>

            <div className='stream-comp__audience-ui-btns'>
              { /*
            <button onClick={clickHandler}>Share</button>
            <button onClick={clickHandler}>Copy Link</button>
                */}
              {doesUserOwn(song)}
            </div>
          </div>

        </div>
      </div>
    );

  });

  return (
    <div className='stream-comp'>
      <div className='stream-comp-left'>
        <h2 id='song-cards-header'>
          Hear the latest posts from the people you’re following:
        </h2>

        <div className='song-cards-container'>
          {songsRender}
        </div>

      </div>

      <div id='right-menu-container' className='stream-comp-right'>
        <h3 id='stream-comp-right-header'>{`Hey ${sessionUser?.firstName} ${sessionUser?.lastName}`}</h3>
      </div>


    </div>
  );
};

export default Stream;

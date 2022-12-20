import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

import './Stream.css';
import { useEffect } from 'react';
import Social from '../Social';
import ListeningHistory from './ListeningHistory';
import StreamSongCards from '../StreamSongCards';

const Stream = ({ toggleBtn, setOrToggleAudio }) => {
  const dispatch = useDispatch();
  let sessionUser = useSelector(state => state.session.user)
  let songsObj = useSelector(state => state.songs)
  let songs = Object.values(songsObj);

  useEffect(() => {
    // Question: Do we want to restore session every time?
    dispatch(sessionActions.restoreSession())
  }, [dispatch])

  if (!sessionUser) {
    return <div>Loading...</div>
  }

  return (
    <div className='stream-comp'>
      <div className='stream-comp-left'>
        <h2 id='song-cards-header'>
          Hear the latest posts from the people you’re following:
        </h2>

        <div className='song-cards-container'>
          {<StreamSongCards songs={songs} setOrToggleAudio={setOrToggleAudio}/>}
        </div>

      </div>

      <div id='right-menu-container' className='stream-comp-right'>
        <div className='right-menu-content'>
          <h3 id='stream-comp-right-header'>{`Hey ${sessionUser?.firstName} ${sessionUser?.lastName}`}</h3>

          <ListeningHistory setOrToggleAudio={setOrToggleAudio} />

          <Social />
        </div>
      </div>


    </div>
  );
};

export default Stream;

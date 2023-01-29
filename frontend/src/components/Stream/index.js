import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

import './Stream.css';
import { useEffect } from 'react';
import Social from '../Social';
import ListeningHistory from './ListeningHistory';
import StreamSongCards from '../StreamSongCards';

const Stream = ({ setOrToggleAudio }) => {
  const dispatch = useDispatch();
  let sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    // Question: Do we want to restore session every time?
    dispatch(sessionActions.restoreSession())
  }, [dispatch])

  return (
    <div className='stream-comp'>
      <div className='stream-comp-left'>
        <h2 id='song-cards-header'>
          Hear the latest posts from the people you’re following:
        </h2>

        <StreamSongCards setOrToggleAudio={setOrToggleAudio} />
      </div>

      <div id='right-menu-container' className='stream-comp-right'>
        <div className='right-menu-content'>
          <h3 id='stream-comp-right-header'>
            {`Hey ${sessionUser?.firstName} ${sessionUser?.lastName}`}
          </h3>

          <ListeningHistory setOrToggleAudio={setOrToggleAudio} />

          <Social />
        </div>
      </div>
    </div>
  )
};

export default Stream;

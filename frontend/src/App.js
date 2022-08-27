import { createRef, useEffect, useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from './components/SignUpFormPage';
import Navigation from './components/Navigation';
import Library from './components/Library';
import Stream from './components/Stream';
import { SinglePlaylist } from './components/Playlists';
import UploadSong from './components/UploadSong';
import Song from './components/Song';
import Player from './components/Player';

import * as songActions from './store/song'
import * as sessionActions from './store/session';
import * as playlistsActions from './store/playlists';


function App() {
  let dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user);
  const [track, setTrack] = useState('');

  const loadPlaylists = (user) => {
    if (!user) return;
    dispatch(playlistsActions.getCurrentUserPlaylists());
  }

  useEffect(() => {
    dispatch(sessionActions.restoreSession())
      .then((user) => loadPlaylists(user))
      .then(() => dispatch(songActions.fetchAllSongs()))
      .then(() => setIsLoaded(true));
  }, [dispatch])

  if (!isLoaded) return <div>Loading...</div>

  let playerVisibility = !track ? { display: 'none' } : { display: 'block' };

  return isLoaded && (
    <div className='site-container'>
      <div className='site-container__main'>
        <div className='site-container__main__nav-container'>
          <Navigation />
        </div>

        <div className='site-container__main__component'>
          <Switch>
            <Route exact path='/stream' component={Stream} />

            {/* Note: path='/you' should redirect to /sessionUserId */}
            <Route path='/you' component={Library} />
            <Route exact path='/:userId/playlist/:playlistId' component={SinglePlaylist} />

            <Route exact path='/:userId/songs/:songId'>
              <Song track={track} setTrack={setTrack} />
            </Route>

            <Route exact path='/upload' component={user && UploadSong} />

            <Route>404</Route>
          </Switch>
        </div>

        <div className='audio-footer-container'>
          <div id='player-visibility' style={playerVisibility}>
            <Player
              track={track}
              autoPlayAfterSrcChange={true}
            />
          </div>
        </div>

      </div>
    </div>
  )
};

export default App;

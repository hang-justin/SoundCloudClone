import { createRef, useEffect, useState } from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './components/Navigation';
import Stream from './components/Stream';
import UploadSong from './components/UploadSong';
import Song from './components/Song';
import Player from './components/Player';
import SplashPage from './components/SplashPage';

// import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from './components/SignUpFormPage';
import Library from './components/Library';
import { SinglePlaylist } from './components/Playlists';

import * as songActions from './store/song'
import * as sessionActions from './store/session';
import * as playlistsActions from './store/playlists';


function App() {
  let dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user);
  const songs = useSelector(state => state.songs)
  const [track, setTrack] = useState('');

  const toggleBtn=document.getElementById('global-toggle-play-button')

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
    <div className='app-container'>

      <div className='nav-bar-sides'></div>
      <div className='site-container'>
        <div className='site-container__main-wrapper'>

          <div className='site-container__main__nav-container'>
            {user && <Navigation />}
          </div>

          <Switch>

            <Route exact path='/'>
              {user ? <Redirect to='/stream' /> : <SplashPage />}
            </Route>

            <div className='site-container__main__component'>
              <Route exact path='/stream'>
                <Stream track={track} toggleBtn={toggleBtn} setTrack={setTrack} toggleBtn={toggleBtn} />
              </Route>

              <Route exact path='/:userId/songs/:songId'>
                <Song toggleBtn={toggleBtn} track={track} setTrack={setTrack} />
              </Route>

              {/* <Route path='/you' component={Library} />
              <Route exact path='/:userId/playlist/:playlistId' component={SinglePlaylist} /> */}

              <Route exact path='/upload'>
                <UploadSong />
              </Route>

            </div>

            <Route path='/:notFound'>
              <div>HERE I AM RENDER ME</div>
            </Route>

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
    </div >
  );
};

export default App;

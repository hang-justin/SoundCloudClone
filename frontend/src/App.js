import { createRef, useEffect, useRef, useState } from 'react';
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
import { isPlaying, setActiveTrack } from './store/audioPlayer';


function App() {
  console.log('APP.JS COMPONENT RENDERING')
  let dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const currentTrack = useSelector(state => state.audioPlayer.currentTrack)

  const [isLoaded, setIsLoaded] = useState(false);
  const [audioPlayerRef, setAudioPlayerRef] = useState(null);

  const loadPlaylists = (user) => {
    if (!user) return;
    dispatch(playlistsActions.getCurrentUserPlaylists());
  }

  useEffect(() => {
    console.log('useEffect in App.js running')
    dispatch(sessionActions.restoreSession())
      .then((user) => loadPlaylists(user))
      .then(() => dispatch(songActions.fetchAllSongs()))
      .then(() => setIsLoaded(true));
  }, [dispatch])

  if (!isLoaded) return <div>Loading...</div>

  const setOrToggleAudio = (e, song) => {
    if (!currentTrack) {
      dispatch(setActiveTrack(song))
      return
    };

    if (song.id === currentTrack.id) {
      audioPlayerRef.current.togglePlay(e);
      return;
    }

    if (song.id !== currentTrack.id) {
      dispatch(setActiveTrack(song));
      return;
    }
  }

  return isLoaded && (
    <div className='app-container'>

      <div className='site-container'>
          {user && <Navigation />}
          {/* <Navigation /> */}
        <div className='site-container__main-wrapper'>


          <Switch>

            <Route exact path='/'>
              {user ? <Redirect to='/stream' /> : <SplashPage setOrToggleAudio={setOrToggleAudio} />}
              {/* <SplashPage setOrToggleAudio={setOrToggleAudio} /> */}
            </Route>


              <Route exact path='/stream'>
                {!user ? <Redirect to='/' /> :
                  <Stream setOrToggleAudio={setOrToggleAudio} />
                }
              </Route>

              <Route exact path='/:userId/songs/:songId'>
                {/* {!user ? <Redirect to='/' /> : */}
                  {!user && <Navigation />}
                  <Song setOrToggleAudio={setOrToggleAudio} />
                {/* } */}
              </Route>

              <Route exact path='/upload'>
                {!user ? <Redirect to='/' /> :
                  <UploadSong />
                }
              </Route>

            <Route>
              <h1>404</h1>
            </Route>

          </Switch>

        </div>

        <Player
          setAudioPlayerRef={setAudioPlayerRef}
        />

      </div>
    </div >
  );
};

export default App;

import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './components/Navigation';
import Stream from './components/Stream';
import UploadSong from './components/UploadSong';
import Song from './components/Song';
import Player from './components/Player';
import SplashPage from './components/SplashPage';

// import LoginFormPage from "./components/LoginFormPage";
// import SignUpFormPage from './components/SignUpFormPage';
// import Library from './components/Library';
import Playlists from './components/Playlists';
import SinglePlaylist from './components/SinglePlaylist';

import * as songActions from './store/song'
import * as sessionActions from './store/session';
import * as playlistsActions from './store/playlists';
import { setActiveTrack } from './store/audioPlayer';
import LoadingSite from './components/LoadingSite';


function App() {
  let dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const currentTrack = useSelector(state => state.audioPlayer.currentTrack)
  const currentPlaylist = useSelector(state => state.audioPlayer.currentPlaylist);

  const [isLoaded, setIsLoaded] = useState(false);
  const [audioPlayerRef, setAudioPlayerRef] = useState(null);

  useEffect(() => {
    console.log('You like to look under the hood? Why not help us build the engine? https://soundcloud.com/jobs');
    console.log('')
    console.log('SonusNimbus is a clone of SoundCloud built for educational purposes. Check out the code base. https://github.com/hang-justin/SoundCloudClone')

    const loadPlaylists = (user) => {
      if (!user) return;
      dispatch(playlistsActions.getCurrentUserPlaylists());
    }

    dispatch(sessionActions.restoreSession())
      .then((user) => loadPlaylists(user))
      .then(() => dispatch(songActions.fetchAllSongs()))
      .then(() => setIsLoaded(true));
  }, [dispatch])

  useEffect(() => {
    const loadPlaylists = (user) => {
      if (!user) return;
      dispatch(playlistsActions.getCurrentUserPlaylists());
    }

    (async () => {
      await loadPlaylists(user)
    })()
  }, [dispatch, user])

  if (!isLoaded) return <LoadingSite />

  const setOrToggleAudio = (e, song, playlist) => {
    // console.log(audioPlayerRef)
    // console.log(audioPlayerRef.current.audio)
    // console.log(audioPlayerRef.current.audio.current.currentTime)
    // Scenarios:
    //
    // User plays standalone song
    //    - no playlistId input
    // User plays song from a playlist
    //    - playlist input
    // User plays same song from diff playlist
    //    - change the playlist input
    //    - stop audio
    //    - replay it
    // User plays different song

    // If there is no song playing
    // play new song
    if (!currentTrack) {
      dispatch(setActiveTrack(song, playlist))
      return
    };

    // If currentTrack doesn't match song source,
    // play new song
    if (currentTrack.id !== song.id) {
      dispatch(setActiveTrack(song, playlist));
      return;
    }

    // If currentTrack matches
    if (currentTrack.id === song.id) {
      // if no playlist is in store and no playlist is passed in
      // song is toggled from stream/song page
      if (!currentPlaylist && !playlist) {
        audioPlayerRef.current.togglePlay(e);
        return;
      }

      // If the same song is played
      // song is being played from the song/stream page and source is passed in from playlist
      // song is being played from playlist and source is passed in from song/stream
      // one of the playlists above will be falsy while the other is truthy
      // stop player and load new audio source
      if (!!currentPlaylist ^ !!playlist) {
        // dispatch(stopPlayer());
        audioPlayerRef.current.audio.current.currentTime = 0;
        dispatch(setActiveTrack(song, playlist))
        return;
      }

      // If the same song is played
      // and there is a playlist in the store
      // and source has a different playlist
      // stop player and load new audio source
      if (currentPlaylist.id !== playlist.id) {
        // dispatch(stopPlayer());
        audioPlayerRef.current.audio.current.currentTime = 0;
        dispatch(setActiveTrack(song, playlist))
        return;
      }

      if (currentPlaylist.id === playlist.id) {
        audioPlayerRef.current.togglePlay(e)
        return;
      }
    }

    alert('Uh oh. Something went wrong. Please refresh the page and try again.')
    console.log(currentTrack, currentPlaylist)
    console.log(song, playlist)
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

              <Route exact path='/you/library'>
                <Playlists setOrToggleAudio={setOrToggleAudio} />
              </Route>

              <Route exact path='/:userId/songs/:songId'>
                {/* {!user ? <Redirect to='/' /> : */}
                  {!user && <Navigation />}
                  <Song setOrToggleAudio={setOrToggleAudio} />
                {/* } */}
              </Route>

              <Route exact path='/sets/:playlistId'>
                <SinglePlaylist setOrToggleAudio={setOrToggleAudio} />
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
          setOrToggleAudio={setOrToggleAudio}
        />

      </div>
    </div >
  );
};

export default App;

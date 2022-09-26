import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { isPlaying } from '../../store/audioPlayer';
import songsReducer from '../../store/song';

import './Player.css'

const Player = ({ setAudioPlayerRef }) => {
  const dispatch = useDispatch();
  const player = useRef();
  const currentTrack = useSelector(state => state.audioPlayer.currentTrack);
  const [playerVisibility, setPlayerVisibility] = useState('hiddenPlayer');
  const artists = useSelector(state => state.artists);
  const currentSong = useSelector(state => state.songs[currentTrack?.id])

  useEffect(() => {
    setAudioPlayerRef(player);
  }, [player])

  useEffect(() => {
    if (playerVisibility === '') return;

    if (currentTrack) setPlayerVisibility('');
  }, [currentTrack])

  const displayCurrentTrack = (currentTrack) => {
    if (!currentTrack || !currentSong) return (
      <div className='current-track-info flx-row'>
        <span id='footer-no-audio'>No audio selected. Please select a song.</span>
      </div>
    );

    let artist = artists[currentSong.userId];
    return (
      <div className='current-track-info flx-row'>
        <NavLink to={`/${artist.id}/songs/${currentSong.id}`}>
        <img id='footer-track-img' src={currentSong.imageUrl} />
        </NavLink>

        <div className='song-details flx-col'>
            <NavLink to={`/${artist.id}/songs/${currentSong.id}`}>
              <span id='footer-artist-name' className='footer-song-details'>{artist.username}</span>
            </NavLink>
            <NavLink to={`/${artist.id}/songs/${currentSong.id}`}>
              <span id='footer-song-title' className='footer song-details'>{currentSong.title}</span>
            </NavLink>
        </div>
      </div>
    )
  }

  
  if (currentTrack && currentSong === undefined) {
    player.current.audio.current.src = '';
  }

  return (
      <div className={`footer-audio-container ${playerVisibility}`}>
        <div className='react-audio-player-container'>

          <AudioPlayer
            layout='horizontal-reverse'
            src={currentTrack ? currentTrack.url : ''}
            ref={player}
            autoPlayAfterSrcChange
            onPlay={() => dispatch(isPlaying(true))}
            onPause={() => dispatch(isPlaying(false))}
          />

        </div>

        <div className='audio-footer-current-track flx-row'>
          {displayCurrentTrack(currentTrack)}
        </div>
      </div>

  )
}

export default Player;

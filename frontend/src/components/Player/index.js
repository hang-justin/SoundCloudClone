import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { isPlaying } from '../../store/audioPlayer';

import './Player.css'

const Player = ({ setAudioPlayerRef }) => {
  const dispatch = useDispatch();
  const player = useRef();
  const currentTrack = useSelector(state => state.audioPlayer.currentTrack);
  const [playerVisibility, setPlayerVisibility] = useState('hiddenPlayer');

  useEffect(() => {
    setAudioPlayerRef(player);
  }, [player])

  useEffect(() => {
    if (playerVisibility === '') return;

    if (currentTrack) setPlayerVisibility('');
  }, [currentTrack])

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
      </div>

  )
}

export default Player;

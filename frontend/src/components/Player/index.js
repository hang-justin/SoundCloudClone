import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useSelector } from 'react-redux';

import './Player.css'

const Player = ({ playerVisibility, setAudioPlayerRef }) => {
  const player = useRef();
  const currentTrack = useSelector(state => state.audioPlayer.currentTrack);

  console.log('player component rendering')
  console.log('track is ', currentTrack)

  useEffect(() => {
    setAudioPlayerRef(player);
  }, [player])


  return (
      <div className={`footer-audio-container ${playerVisibility}`}>
        <div className='react-audio-player-container'>

          <AudioPlayer
            layout='horizontal-reverse'
            src={currentTrack ? currentTrack.url : ''}
            ref={player}
            autoPlayAfterSrcChange
            onChange={() => console.log('audio player changing')}
          />

        </div>
      </div>

  )
}

export default Player;

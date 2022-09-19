import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import './Player.css'

const Player = ({ track, playerVisibility, setAudioPlayerRef }) => {
  const player = useRef();
  console.log('player component rendering')

  useEffect(() => {
    setAudioPlayerRef(player);
  }, [player])

  // const togglePlay = () => {
  //   console.log(player.current.isPlaying())
  //   if (player.current.isPlaying()) {
  //     player.current.audio.current.pause();
  //   }

  //   else player.current.audio.current.play();
  // }



  return (
      <div className={`footer-audio-container ${playerVisibility}`}>
        <div className='react-audio-player-container'>

          <AudioPlayer
            layout='horizontal-reverse'
            src={track.url}
            ref={player}
            autoPlayAfterSrcChange
            onChange={() => console.log('audio player changing')}
          />

          <button id='global-toggle-play-button'
            // onClick={togglePlay}
            style={{display: 'none'}}
          />

        </div>
      </div>

  )
}

export default Player;

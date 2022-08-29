import { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import './Player.css'

const Player = ({ track }) => {
  const player = useRef();

  const togglePlay = () => {
    console.log(player.current.isPlaying())
    if (player.current.isPlaying()) {
      player.current.audio.current.pause();
    }

    else player.current.audio.current.play();
  }


  return (
    <>

      <AudioPlayer
        // className='player-wrapper'
        layout='horizontal-reverse'
        src={track.url}
        ref={player}
      />

      <button id='global-toggle-play-button'
        onClick={togglePlay}
        style={{visibility: 'hidden'}}
      />
    </>

  )
}

export default Player;

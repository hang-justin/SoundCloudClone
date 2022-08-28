import { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import './Player.css'

let kangarooJumps = 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3'

const Player = ({ track }) => {
  const player = useRef();

  const pause = () => {
    player.current.audio.current.pause()
  };

  const play = () => {
    // use this to toggle play
    console.log(player.current.isPlaying())
    player.current.audio.current.play();
  }

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

      <button id='global-toggle-play-button' onClick={togglePlay} >Toggle Play</button>
      <button id='pause-button' onClick={pause} >pause</button>
    </>

  )
}

export default Player;

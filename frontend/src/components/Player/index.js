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
    player.current.audio.current.play();
  }


  return (
    <>

      <AudioPlayer
        // className='player-wrapper'
        layout='horizontal-reverse'
        src={track.url}
        ref={player}
      />

      <button id='play-button' onClick={play} >play</button>
      <button id='pause-button' onClick={pause} >pause</button>
    </>

  )
}

export default Player;

import { useSelector } from "react-redux";
import SplashLoadingTile from "./SplashLoadingTile";
import SplashSongTile from './SplashSongTile';

const SplashSongCards = ({ audioPlayerRef, setOrToggleAudio }) => {
  const allSongs = useSelector(state => state.songs);
  const songDisplay = Object.values(allSongs).slice(0, 8);

  while (songDisplay.length < 8) {
    songDisplay.push(null);
  }

  return (
    <div className="splash-bottom flx-row-wrap">

      {songDisplay.map((song, index) => {
        if (!song) return <SplashLoadingTile key={index} />
        
        return (
          <SplashSongTile
            key={index}
            songId={song.id}
            setOrToggleAudio={setOrToggleAudio}
          />)
      })}

    </div>
  )
}

export default SplashSongCards;

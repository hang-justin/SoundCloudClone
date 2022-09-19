import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SplashSongCards = ({ setTrack, audioPlayerRef }) => {
  const artists = useSelector(state => state.artists);
  const allSongs = useSelector(state => state.songs);
  const allSongsArr = Object.values(allSongs).slice(0, 8);

  const toggleAudio = (song) => {
    setTrack(song);
  }

  const toggle = e => {
    console.log('inside song card', audioPlayerRef.current.audio.current.src)

    audioPlayerRef.current.togglePlay(e);

    // audioPlayerRef.current.isPlaying()
    //   ? audioPlayerRef.current.audio.pause()
    //   : audioPlayerRef.current.audio.play();
  }

  return (
    <div className="splash-bottom flx-row-wrap">

      {allSongsArr.map((songObj) => {
        return (
          <div key={songObj.id} className='splash-song-card flx-col'>
              <img className='splash-song-card-img'
                src={`${songObj.imageUrl}`}
                onClick={() => toggleAudio(songObj)}
              />
              <button onClick={toggle}>Toggle Play</button>


            <NavLink to={`/${songObj.userId}/songs/${songObj.id}`}>
              <span className='splash-song-card-details'>{songObj.title}</span>
              <span className='splash-song-card-details'>{artists[songObj.userId].username}</span>
            </NavLink>
          </div>
        )
      })}

    </div>
  )
}

export default SplashSongCards;

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SplashSongCards = ({ setTrack }) => {
  const artists = useSelector(state => state.artists);
  const allSongs = useSelector(state => state.songs);
  const allSongsArr = Object.values(allSongs).slice(0, 8);

  const toggleAudio = (song) => {
    setTrack(song);
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

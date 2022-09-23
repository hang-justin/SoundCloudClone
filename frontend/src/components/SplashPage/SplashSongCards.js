import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setActiveTrack } from "../../store/audioPlayer";

const SplashSongCards = ({ audioPlayerRef, setOrToggleAudio }) => {
  const dispatch = useDispatch();

  const artists = useSelector(state => state.artists);
  const allSongs = useSelector(state => state.songs);
  const allSongsArr = Object.values(allSongs).slice(0, 8);
  const currentTrack = useSelector(state => state.audioPlayer.currentTrack);
  const isPlaying = useSelector(state => state.audioPlayer.isPlaying);
  const playBtnImg = 'https://cdn-icons-png.flaticon.com/512/73/73940.png';
  const pauseBtnImg = 'https://cdn-icons-png.flaticon.com/512/786/786279.png';

  return (
    <div className="splash-bottom flx-row-wrap">

      {allSongsArr.map((songObj) => {

        let buttonDisplay = 'hidden-play-btn';
        let playPauseImg = playBtnImg;

        if (currentTrack) {
          if (currentTrack.id !== songObj.id) {
            buttonDisplay='hidden-play-btn';
            playPauseImg = playBtnImg;
          }

          else if (currentTrack.id === songObj.id) {
            if (!isPlaying) buttonDisplay = 'hidden-play-btn';

            if (isPlaying) {
              buttonDisplay = '';
              playPauseImg = pauseBtnImg;
            }

          }
        }



        return (
          <div key={songObj.id} className='splash-song-card flx-col'>
            <div className='splash-song-card-img-wrapper'>
              <img className='splash-song-card-img'
                src={`${songObj.imageUrl}`}
              />

              <div className={`song-card-img-overlay flx-row ${buttonDisplay}`}>
                <button
                  className='song-card-toggle'
                  onClick={(e) => setOrToggleAudio(e, songObj)}
                >
                  <img className='song-card-img-playPause' src={playPauseImg} />
                </button>

              </div>
            </div>

            <NavLink to={`/${songObj.userId}/songs/${songObj.id}`}>
              <span id='splash-song-title' className='splash-song-card-details'>{songObj.title}</span>
              <span id='splash-song-artist' className='splash-song-card-details'>{artists[songObj.userId].username}</span>
            </NavLink>
          </div>
        )
      })}

    </div>
  )
}

export default SplashSongCards;

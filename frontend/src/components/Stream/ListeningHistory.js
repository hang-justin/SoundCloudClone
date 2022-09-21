import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import './ListeningHistory.css'

const ListeningHistory = ({ setOrToggleAudio }) => {
  const history = useSelector(state => state.audioPlayer.history);
  const allSongs = useSelector(state => state.songs);
  const allArtists = useSelector(state => state.artists);
  const currentTrack = useSelector(state => state.audioPlayer.currentTrack);
  const isPlaying = useSelector(state => state.audioPlayer.isPlaying);

  const playBtnImg = 'https://cdn-icons-png.flaticon.com/512/73/73940.png';
  const pauseBtnImg = 'https://cdn-icons-png.flaticon.com/512/786/786279.png';

  if (!history) return null;

  let listenHistorySongIds = [];
  let historyCopy = [...history];

  while (listenHistorySongIds.length < 3) {
    const lastSongId = historyCopy.pop();
    if (allSongs[lastSongId] === undefined) continue;

    listenHistorySongIds.push(lastSongId)
    if (historyCopy.length === 0) break;
  }

  const songTileRenders = listenHistorySongIds.map((songId, ind) => {
    let playPauseImg = playBtnImg;
    const song = allSongs[songId];
    const artist = allArtists[song.userId];
    let btnDisplay = 'hidden-play-btn';

    if (currentTrack.id === songId) {
      if (isPlaying) {
        btnDisplay = '';
        playPauseImg=pauseBtnImg;
      }
    }

    return (
      <div className='listen-history-card flx-row' key={ind}>

        <div className='listen-history-img-wrapper'>
          <img className='listen-history-img' src={song.imageUrl} />

          <div className='history-btn-wrapper'>
            <button onClick={(e) => setOrToggleAudio(e, song)} className={`listen-history-btn-overlay ${btnDisplay}`} >
              <img className='history-tile-play-pause' src={playPauseImg} />
            </button>
          </div>

        </div>

        <div className='listen-history-card-details flx-col'>
          <NavLink to={`/${song.userId}/songs/${song.id}`}>
            <span className='history--artist-name'>{artist.username}</span>
          </NavLink>
          <NavLink to={`/${song.userId}/songs/${song.id}`}>
            <span>{song.title}</span>
          </NavLink>
        </div>

      </div>
    )
  })

  return (
    <div className='listening-history-content flx-col'>
      <span className='listening-history-text'>Listening History</span>
      {songTileRenders}
    </div>
  )
}

export default ListeningHistory;

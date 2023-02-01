import playBtnImg from '../../../img/play-btn.png';
import pauseBtnImg from '../../../img/pause-btn.png';

import { onErrorImgCoverLoader } from '../../../utils';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './CurrentPlaylistTrack.css';

const CurrentPlaylistTrack = ({ setOrToggleAudio, playlist, songId }) => {
    const history = useHistory();

    const currentTrack = useSelector(state => state.audioPlayer.currentTrack);
    const isPlaying = useSelector(state => state.audioPlayer.isPlaying);

    const allSongs = useSelector(state => state.songs);
    const allArtists = useSelector(state => state.artists);

    const song = allSongs[songId];
    if (!song) return;

    const artistId = song.userId;
    const artist = allArtists[artistId];


    const isSongPlaying = song.id === currentTrack.id;

    let playlistSongTrackClass;
    let imgFilter;
    let playPauseBtnImgSrc;

    isSongPlaying   ? playlistSongTrackClass = 'active-current-playlist-song-track'
                    : playlistSongTrackClass = 'current-playlist-song-track'

    isSongPlaying   ? imgFilter = ''
                    : imgFilter = 'half-brightness-filter';


    if (isSongPlaying && isPlaying) playPauseBtnImgSrc = pauseBtnImg;
    else playPauseBtnImgSrc = playBtnImg;

    const toggleSong = (e) => {
        setOrToggleAudio(e, song, playlist)
    }

    const navToSong = (e) => {
        e.stopPropagation();
        history.push(`/${artist.id}/songs/${song.id}`)
    }

    return (
        <div className={`${playlistSongTrackClass} flx-row-align-ctr`} onClick={toggleSong}>
            <div className='playlist-popup-song-cover-img-container'>
                <img
                    src={song.imageUrl}
                    className={`playlist-popup-song-cover-img ${imgFilter}`}
                    onError={onErrorImgCoverLoader}
                    alt='song-cover-img'
                />

                <img
                    src={playPauseBtnImgSrc}
                    className='popup-song-cover-overlay'
                    alt='song-playing-state'
                />
            </div>

            <div className='flx-col-align-start'>
                <div className='playlist-popup-song-info playlist-popup-song-info__artist-name'>
                    {artist.username}
                </div>

                <div
                    className='playlist-popup-song-info playlist-popup-song-info__song-title'
                    onClick={navToSong}>
                    {song.title}
                </div>
            </div>
        </div>
    )
};

export default CurrentPlaylistTrack;

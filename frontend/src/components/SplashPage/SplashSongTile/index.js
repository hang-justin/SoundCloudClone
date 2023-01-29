import playBtnImg from '../../../img/play-btn.png';
import pauseBtnImg from '../../../img/pause-btn.png';
import { onErrorImgCoverLoader } from '../../../utils';

import './SplashSongTile.css';

import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const SplashSongTile = ({ setOrToggleAudio, songId }) => {
    const allSongs = useSelector(state => state.songs);
    const allArtists = useSelector(state => state.artists);

    const currentTrack = useSelector(state => state.audioPlayer.currentTrack);
    const isPlaying = useSelector(state => state.audioPlayer.isPlaying);

    const song = allSongs[songId];
    const artist = allArtists[song.userId];

    let buttonDisplay = 'hidden-play-btn';
    let playPauseImg = playBtnImg;

    if (currentTrack) {
        if (currentTrack.id !== song.id) {
            buttonDisplay='hidden-play-btn';
            playPauseImg = playBtnImg;
        }

        else if (currentTrack.id === song.id) {
            if (!isPlaying) buttonDisplay = 'hidden-play-btn';

            if (isPlaying) {
                buttonDisplay = '';
                playPauseImg = pauseBtnImg;
            }
        }
    }


    return (
        <div className='splash-song-card flx-col'>
            <div className='splash-song-card-img-wrapper'>
                <img
                    src={`${song.imageUrl}`}
                    className='splash-song-card-img'
                    onError={onErrorImgCoverLoader}
                    alt='song-cover-img'
                />

                <div className={`song-card-img-overlay flx-row ${buttonDisplay}`}>
                    <button
                    className='song-card-toggle'
                    onClick={(e) => setOrToggleAudio(e, song)}
                    >
                    <img
                        src={playPauseImg}
                        className='song-card-img-playPause'
                        onError={onErrorImgCoverLoader}
                        alt='is-playing-status'
                    />
                    </button>

                </div>
            </div>

            <NavLink to={`/${song.userId}/songs/${song.id}`}>
                <span id='splash-song-title' className='splash-song-card-details'>{song.title}</span>
                <span id='splash-song-artist' className='splash-song-card-details'>{artist.username}</span>
            </NavLink>
        </div>
    )
};

export default SplashSongTile;

import playBtnImg from '../../img/play-btn.png';
import pauseBtnImg from '../../img/pause-btn.png';
import songWaveformImg from '../../img/waveform-white-bg.png'
import { onErrorImgCoverLoader } from '../../utils';

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as songActions from '../../store/song'

import EditSongFormModal from "../EditSongFormModal";
import PlaylistModal from "../PlaylistModal";


const SongCard = ({setOrToggleAudio, song}) => {
    const dispatch = useDispatch();

    let sessionUser = useSelector(state => state.session.user)
    let artists = useSelector(state => state.artists);
    const currentTrack = useSelector(state => state.audioPlayer.currentTrack)
    const currentPlaylist = useSelector(state => state.audioPlayer.currentPlaylist)
    const isPlaying = useSelector(state => state.audioPlayer.isPlaying);

    const [showPlaylistModal, setShowPlaylistModal] = useState(false);

    const deleteTrack = (songId) => {
        dispatch(songActions.deleteTrack(songId));
    }

    const doesUserOwn = (song) => {
        if (!(sessionUser?.id === song.userId)) return null;

        const editDeleteBtns = [
            <EditSongFormModal key={`edit-song-id-${song.id}`} song={song} />,
            <button key={`delete-song-id-${song.id}`} className='alter-track-btns' id={song.id} onClick={(e) => deleteTrack(song.id)}>
            <i className="fa-solid fa-trash"></i>
            </button>
        ];

        return editDeleteBtns;
    }

    if (song.Artist !== undefined) return null;

    let playPauseImg = playBtnImg;

    if (currentTrack) {
        if (currentTrack.id === song.id && !currentPlaylist) {
            isPlaying
                ? playPauseImg=pauseBtnImg
                : playPauseImg=playBtnImg;
        }
    }

    return (
        <div id={`stream-song-${song.id}`} className='song-card-container'>
            <div className='song-card-poster'>{artists[song.userId].username} posted a track</div>

            <div className='song-container' id={`song${song.id}`}>

            <div className='song-container__song-image'>
                <NavLink className='song-link' to={`/${song.userId}/songs/${song.id}`}>

                <img
                    src={song.imageUrl}
                    className='song-image'
                    onError={onErrorImgCoverLoader}
                    alt={`${song.title}'s cover`}
                />
                </NavLink>
            </div>

            <div className='song-content'>
                <div className='song-content-links'>
                    <button onClick={(e) => setOrToggleAudio(e, song)} id='stream-card-toggle-play-btn'>
                        {/* <div className='song-content-links__play-button-wrapper'> */}
                        <img
                            src={playPauseImg}
                            id='stream-card-toggle-play-img'
                            onError={onErrorImgCoverLoader}
                            alt='toggle-play-button'
                        />
                        {/* </div> */}
                    </button>

                    <div className='song-content-links__song-author-title'>
                        <div className='song-card__artist-name'>{artists[song.userId].username}</div>
                        <div className='song-card__song-title'>{song.title}</div>
                    </div>
                </div>
                <div className='waveform-container'>
                    <img
                        src={songWaveformImg}
                        className='song-waveform-img'
                        onError={onErrorImgCoverLoader}
                        alt='waveform'
                    />
                </div>

                <div className='stream-comp__audience-ui-btns flx-row-align-ctr'>

                    <button className='add-song-to-playlist-icon' onClick={()=>setShowPlaylistModal(true)}>
                        <span className="material-symbols-outlined add-song-to-playlist-icon-txt">
                            playlist_add
                        </span>
                    </button>

                    {showPlaylistModal &&
                        <PlaylistModal
                            song={song}
                            showPlaylistModal={showPlaylistModal}
                            setShowPlaylistModal={setShowPlaylistModal}
                        />
                    }

                    {doesUserOwn(song)}
                </div>
            </div>

            </div>
        </div>
    );
}

export default SongCard

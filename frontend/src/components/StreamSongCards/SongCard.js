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
    const isPlaying = useSelector(state => state.audioPlayer.isPlaying);

    const [showPlaylistModal, setShowPlaylistModal] = useState(false);

    const playBtnImg = 'https://cdn-icons-png.flaticon.com/512/73/73940.png';
    const pauseBtnImg = 'https://cdn-icons-png.flaticon.com/512/786/786279.png';

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
        if (currentTrack.id === song.id) {
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

                <img className='song-image' src={song.imageUrl} alt={`${song.title}'s image`} />
                </NavLink>
            </div>

            <div className='song-content'>
                <div className='song-content-links'>
                    <button onClick={(e) => setOrToggleAudio(e, song)} id='stream-card-toggle-play-btn'>
                        {/* <div className='song-content-links__play-button-wrapper'> */}
                        <img id='stream-card-toggle-play-img' src={playPauseImg} alt='toggle-play-button' />
                        {/* </div> */}
                    </button>
                    
                    <div className='song-content-links__song-author-title'>
                        <div className='song-card__artist-name'>{artists[song.userId].username}</div>
                        <div className='song-card__song-title'>{song.title}</div>
                    </div>
                </div>
                <div className='waveform-container'>
                <img className='song-waveform-img' src='https://i.imgur.com/jsHWeIy.png' alt='waveform' />
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

import playBtnImgSrc from '../../../img/play-btn.png';
import pauseBtnImgSrc from '../../../img/pause-btn.png';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { onErrorImgCoverLoader } from '../../../utils';
import { fetchCurrentSongWithComments } from '../../../store/song';

import DeleteIcon from '../../Icons/DeleteIcon';
import './EditPlaylistTrackCard.css';

const EditPlaylistTrackCard = ({ songId, index, playlist, setOrToggleAudio, songIdsToRemove, setSongIdsToRemove }) => {
    const dispatch = useDispatch();

    const allSongs = useSelector(state => state.songs);
    const song = useSelector(state => state.songs[songId]);
    const allArtists = useSelector(state => state.artists);

    const currentTrack = useSelector(state => state.audioPlayer.currentTrack);
    const currentPlaylist = useSelector(state => state.audioPlayer.currentPlaylist);
    const isPlaying = useSelector(state => state.audioPlayer.isPlaying);

    const [hideTrack, setHideTrack] = useState(false);

    useEffect(() => {
        if (!song) dispatch(fetchCurrentSongWithComments(songId));
    }, [])

    // GUARD CLAUSES
    if (hideTrack) return;

    // return JSX while song is getting fetched
    if (!song ) return (
            <div className='track-card flx-row-align-ctr track-loading'>
                Loading song...
            </div>
        )

    const artist = allArtists[song.userId];
    if (!artist) return (
            <div className='track-card flx-row-align-ctr track-loading'>
                Loading artist...
            </div>
        )

    const addSongToRemovalArray = () => {
        setSongIdsToRemove([...songIdsToRemove, songId])
        setHideTrack(true);
        return;
    }

    const isCurrentPlaylistPlaying = currentPlaylist ?
                                        playlist.id === currentPlaylist.id :
                                        false;

    const isActiveTrack = isCurrentPlaylistPlaying ?
                                        currentTrack.id === +songId :
                                        false;

    let playPauseBtnImgSrc = playBtnImgSrc;
    if (isCurrentPlaylistPlaying && isActiveTrack && isPlaying) playPauseBtnImgSrc = pauseBtnImgSrc;

    return (
        <div
            className={`track-card flx-row-align-ctr ${isActiveTrack ? 'active-track-bg' : ''}`}
            >

            <div className='track-img-container'
                onClick={(e) => setOrToggleAudio(e, song, playlist)}
                >
                <img
                    className='track-img'
                    src={song.imageUrl}
                    onError={(e) => onErrorImgCoverLoader(e)}
                    alt='song-cover-img'
                />

                <img
                    className='track-img-play-pause-overlay'
                    src={playPauseBtnImgSrc}
                    onError={(e) => onErrorImgCoverLoader(e)}
                    alt='playing-btn'
                />
            </div>

            <span className='track-index-num'>
                {index + 1}
            </span>

            <NavLink to={`/${song.userId}/songs/${song.id}`}>
                <span className={`playlist-song-title ${isActiveTrack ? 'active-track-text' : ''}`}>
                    {song.title}
                </span>
            </NavLink>

            <span className='playlist-song-author'>
                &nbsp;
                &nbsp;
                -
                &nbsp;
                &nbsp;
                {artist.username}
            </span>

            <button
                className='edit-playlist-hide-song'
                onClick={addSongToRemovalArray}
            >
                <DeleteIcon />
            </button>
        </div>
    )
};

export default EditPlaylistTrackCard;

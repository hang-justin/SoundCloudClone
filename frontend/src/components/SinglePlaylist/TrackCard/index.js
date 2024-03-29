import playBtnImgSrc from '../../../img/play-btn.png';
import pauseBtnImgSrc from '../../../img/pause-btn.png';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchCurrentSongWithComments } from '../../../store/song';
import { onErrorImgCoverLoader } from '../../../utils';
import DeleteIcon from '../../Icons/DeleteIcon';
import './TrackCard.css';
import PlaylistDeleteModal from '../../PlaylistDeleteModal';
import { deleteSongFromPlaylist } from '../../../store/playlists';

const TrackCard = ({ songId, index, playlist, setOrToggleAudio }) => {
    const dispatch = useDispatch();

    const allSongs = useSelector(state => state.songs)
    const song = useSelector(state => state.songs[songId]);
    const allArtists = useSelector(state => state.artists);
    const currentTrack = useSelector(state => state.audioPlayer.currentTrack);
    const currentPlaylist = useSelector(state => state.audioPlayer.currentPlaylist);
    const isPlaying = useSelector(state => state.audioPlayer.isPlaying);

    useEffect(() => {
        if (!song) dispatch(fetchCurrentSongWithComments(songId));
    }, [])

    const isCurrentPlaylistPlaying = currentPlaylist ?
                                        playlist.id === currentPlaylist.id :
                                        false;

    const isActiveTrack = isCurrentPlaylistPlaying ?
                            currentTrack.id === +songId :
                            false;

    let playPauseBtnImgSrc = playBtnImgSrc;
    if (isCurrentPlaylistPlaying && isActiveTrack && isPlaying) playPauseBtnImgSrc = pauseBtnImgSrc;

    // GUARD CLAUSE
    // return JSX while song is getting fetched
    if (!song ) return <div className='track-card flx-row-align-ctr track-loading'>Loading song...</div>

    const artist = allArtists[song.userId];
    if (!artist) return <div className='track-card flx-row-align-ctr track-loading'>Loading artist...</div>

    const handleRemovalFromPlaylist = (e) => {
        e.stopPropagation();
        dispatch(deleteSongFromPlaylist(songId, playlist.id));
    }

    return (
            <div
                className={`track-card flx-row-align-ctr ${isActiveTrack ? 'active-track-bg' : ''}`}
                onClick={(e) => setOrToggleAudio(e, song, playlist)}
                >

                <div className='track-img-container'>
                    <img
                        src={song.imageUrl}
                        className='track-img'
                        onError={(e) => onErrorImgCoverLoader(e)}
                        alt='track-cover-img'
                    />

                    <img
                        src={playPauseBtnImgSrc}
                        className='track-img-play-pause-overlay'
                        onError={(e) => onErrorImgCoverLoader(e)}
                        alt='is-playing-img'
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
                    id='remove-song-from-playlist'
                    onClick={handleRemovalFromPlaylist}
                >
                    <DeleteIcon />
                </button>
            </div>
    )
};

export default TrackCard;

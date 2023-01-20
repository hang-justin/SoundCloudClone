import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchCurrentSongWithComments } from '../../../store/song';
import './TrackCard.css';

const TrackCard = ({ songId, index, playlist, setOrToggleAudio }) => {
    const dispatch = useDispatch();

    const allSongs = useSelector(state => state.songs)
    const song = useSelector(state => state.songs[songId]);
    const allArtists = useSelector(state => state.artists);
    const currentTrack = useSelector(state => state.audioPlayer.currentTrack)
    const currentPlaylist = useSelector(state => state.audioPlayer.currentPlaylist)
    const isPlaying = useSelector(state => state.audioPlayer.isPlaying)

    const isCurrentPlaylistPlaying = currentPlaylist ?
                                        playlist.id === currentPlaylist.id :
                                        false;

    const isActiveTrack = isCurrentPlaylistPlaying ?
                            currentTrack.id === +songId :
                            false;

    useEffect(() => {
        if (!song) dispatch(fetchCurrentSongWithComments(songId));
    }, [])

    // GUARD CLAUSE
    // return JSX while song is getting fetched
    if (!song ) return <div>Loading song...</div>

    const artist = allArtists[song.userId];
    if (!artist) return <div>Loading artist...</div>

    return (
        <div
            className={`track-card flx-row-align-ctr ${isActiveTrack ? 'active-track-bg' : ''}`}
            onClick={(e) => setOrToggleAudio(e, song, playlist)}
            >

            <img
                className='track-img'
                src={song.imageUrl}
            />

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
        </div>
    )
};

export default TrackCard;

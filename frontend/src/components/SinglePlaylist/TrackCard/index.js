import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentSongWithComments } from '../../../store/song';
import './TrackCard.css';

const TrackCard = ({ songId, index, playlistId, setOrToggleAudio }) => {
    const dispatch = useDispatch();

    const song = useSelector(state => state.songs[songId]);
    const allArtists = useSelector(state => state.artists);

    useEffect(() => {
        if (!song) dispatch(fetchCurrentSongWithComments(songId));
    }, [])

    // GUARD CLAUSE
    // return JSX while song is getting fetched
    if (!song) return <div>Loading...</div>

    const artist = allArtists[song.userId];

    return (
        <div className='track-card flx-row-align-ctr' onClick={(e) => setOrToggleAudio(e, song)}>
            <img
                className='track-img'
                src={song.imageUrl}
            />

            <span className='track-index-num'>
                {index + 1}
            </span>

            <span>
                {song.title}
            </span>
        </div>
    )
};

export default TrackCard;

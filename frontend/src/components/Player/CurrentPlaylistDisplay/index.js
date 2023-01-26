import { useState } from 'react';
import CurrentPlaylistSongs from '../CurrentPlaylistSongs';
import './CurrentPlaylistDisplay.css';

const CurrentPlaylistDisplay = ({ setOrToggleAudio }) => {
    const [showPlaylistSongs, setShowPlaylistSongs] = useState(false);

    const handleClick = () => {
        console.log('clicking')
        setShowPlaylistSongs(prev => !prev)
    }

    const isPlaylistShowing = showPlaylistSongs
                                ? 'playlist-songs-displaying'
                                : '';

    return (
        <>
            <span
                id='player-playlist-icon'
                className={`material-symbols-outlined ${isPlaylistShowing}`}
                onClick={handleClick}
                >
                playlist_play
            </span>

            {showPlaylistSongs &&
                <CurrentPlaylistSongs setOrToggleAudio={setOrToggleAudio} />
            }
        </>
    )
};

export default CurrentPlaylistDisplay;

import { useState } from 'react';
import CurrentPlaylistSongs from '../CurrentPlaylistSongs';
import './CurrentPlaylistDisplay.css';

const CurrentPlaylistDisplay = ({ setOrToggleAudio }) => {
    const [showPlaylistSongs, setShowPlaylistSongs] = useState(false);

    return (
        <>
            <span id='player-playlist-icon' className="material-symbols-outlined" onClick={() => alert('hi')}>
                playlist_play
            </span>

            <CurrentPlaylistSongs setOrToggleAudio={setOrToggleAudio} />
        </>
    )
};

export default CurrentPlaylistDisplay;

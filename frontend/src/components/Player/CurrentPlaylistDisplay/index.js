import { useState } from 'react';
import { useSelector } from 'react-redux';
import CurrentPlaylistSongs from '../CurrentPlaylistSongs';
import './CurrentPlaylistDisplay.css';

const CurrentPlaylistDisplay = ({ setOrToggleAudio }) => {
    const currentPlaylist = useSelector(state => state.audioPlayer.currentPlaylist);
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
                className={`material-symbols-outlined ${isPlaylistShowing} orange-text`}
                onClick={handleClick}
                >
                playlist_play
            </span>

            {showPlaylistSongs &&
                <CurrentPlaylistSongs
                    setOrToggleAudio={setOrToggleAudio}
                    setShowPlaylistSongs={setShowPlaylistSongs}
                />
            }
        </>
    )
};

export default CurrentPlaylistDisplay;

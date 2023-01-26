import { useSelector } from 'react-redux';
import './CurrentPlaylistSongs.css';

const CurrentPlaylistSongs = ({ setOrToggleAudio }) => {
    const currentPlaylist = useSelector(state => state.audioPlayer.currentPlaylist);
    const allSongs = useSelector(state => state.songs);

    if (!currentPlaylist) {
        return (
            <div id='playlist-songs'>
                No playlist
            </div>
        )
    }

    return (
        <div id='playlist-songs' className='flx-col'>
            <div>
                Song 1
            </div>

            <div>
                Song 2
            </div>
        </div>
    )
};

export default CurrentPlaylistSongs;

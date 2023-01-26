import { useSelector } from 'react-redux';
import './CurrentPlaylistSongs.css';

const CurrentPlaylistSongs = ({ setOrToggleAudio }) => {
    const currentPlaylist = useSelector(state => state.audioPlayer.currentPlaylist);
    const allPlaylists = useSelector(state => state.playlists);
    const allSongs = useSelector(state => state.songs);

    if (!currentPlaylist) {
        return (
            <div id='playlist-songs'>
                No playlist
            </div>
        )
    }

    const currentPlaylistId = currentPlaylist.id;
    const playlist = allPlaylists[currentPlaylistId]

    return (
        <div id='playlist-songs' className='flx-col'>
            {
                Object.keys(playlist.songs).map((songId) =>
                    <div key={songId} className='current-playlist-song-track flx-row'>
                        {allSongs[songId].title}
                    </div>
                )
            }
        </div>
    )
};

export default CurrentPlaylistSongs;

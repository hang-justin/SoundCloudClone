import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSongFromPlaylist } from '../../../store/playlists';
import EditPlaylistTrackCard from '../EditPlaylistTrackCard';
import './EditPlaylistTracks.css';

const EditPlaylistTracks = ({ playlist, setShowPlaylistEditModal, setOrToggleAudio }) => {
    const dispatch = useDispatch();
    const [songIdsToRemove, setSongIdsToRemove] = useState([]);
    const songIds = Object.keys(playlist.songs);

    // if (!songIds.length) return <div>No songs to edit in this playlist! :(</div>

    const removeSongListFromPlaylist = () => {
        if (!songIdsToRemove.length) return alert('Uh oh. Something went wrong.')

        songIdsToRemove.forEach( songId => dispatch(deleteSongFromPlaylist(songId, playlist.id)))
        setShowPlaylistEditModal(false);
    }

    return (
        <div id='edit-playlist-tracks-container'>
            {songIds.map((songId, index) => (
                <EditPlaylistTrackCard
                    key={songId}
                    songId={songId}
                    index={index}
                    playlist={playlist}
                    setOrToggleAudio={setOrToggleAudio}
                    songIdsToRemove={songIdsToRemove}
                    setSongIdsToRemove={setSongIdsToRemove}
                />
            ))

            }

            <button
                className={`remove-song-list-from-playlist-btn ${!songIdsToRemove.length && 'disabled-btn'}`}
                disabled={!songIdsToRemove.length}
                onClick={removeSongListFromPlaylist}
                >
                Save changes
            </button>
        </div>
    )
};

export default EditPlaylistTracks;

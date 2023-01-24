import { useState } from 'react';
import EditPlaylistTrackCard from '../EditPlaylistTrackCard';
import './EditPlaylistTracks.css';

const EditPlaylistTracks = ({ playlist, setShowPlaylistEditModal, setOrToggleAudio }) => {
    const songIds = Object.keys(playlist.songs);
    const [songIdsToRemove, setSongIdsToRemove] = useState([]);

    if (!songIds.length) return <div>No songs to edit in this playlist! :(</div>

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

            <button onClick={() => alert('working on it')}>
                Save Changes... working on it
            </button>
        </div>
    )
};

export default EditPlaylistTracks;

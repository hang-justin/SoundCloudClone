import TrackCard from '../TrackCard';
import './PlaylistTracks.css';

const PlaylistTracks = ({ playlist, setOrToggleAudio }) => {
    const songIds = Object.keys(playlist.songs);

    // GUARD CLAUSE
    if (!songIds.length) return <div>No songs in this playlist</div>

    // Need a guard clause to return an image if playlist has no songs
    return (
        <div id='tracks-container'>
            {songIds.map((songId, index) => (
                <TrackCard
                    key={songId}
                    songId={songId}
                    index={index}
                    playlistId={playlist.id}
                    setOrToggleAudio={setOrToggleAudio}
                />
            ))}
        </div>
    )
};

export default PlaylistTracks;

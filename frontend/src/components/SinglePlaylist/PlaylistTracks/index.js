import emptyPlaylistImgSrc from '../../../img/no-tracks.png';
import { onErrorImgCoverLoader } from '../../../utils';
import TrackCard from '../TrackCard';
import './PlaylistTracks.css';

const PlaylistTracks = ({ playlist, setOrToggleAudio }) => {
    const songIds = Object.keys(playlist.songs);

    // GUARD CLAUSE
    if (!songIds.length) return (
        <div id='empty-playlist' className='flx-col'>
            <img
                src={emptyPlaylistImgSrc}
                onError={onErrorImgCoverLoader}
                alt='empty-playlist'
            />
            <p>
                This playlist has no tracks
            </p>
        </div>
    )

    // Need a guard clause to return an image if playlist has no songs
    return (
        <div id='tracks-container'>
            {songIds.map((songId, index) => (
                <TrackCard
                    key={songId}
                    songId={+songId}
                    index={index}
                    playlist={playlist}
                    setOrToggleAudio={setOrToggleAudio}
                />
            ))}
        </div>
    )
};

export default PlaylistTracks;

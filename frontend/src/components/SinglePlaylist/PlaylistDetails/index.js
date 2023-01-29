import { useSelector } from 'react-redux';
import PlaylistOwnerIcon from '../PlaylistOwnerIcon';
import PlaylistTracks from '../PlaylistTracks';

import './PlaylistDetails.css';

const PlaylistDetails = ({ playlist, setOrToggleAudio }) => {


    return (
        <div id='playlist-details' className='flx-row'>
            <PlaylistOwnerIcon ownerId={playlist.userId}/>

            <PlaylistTracks playlist={playlist} setOrToggleAudio={setOrToggleAudio} />
        </div>
    )
}

export default PlaylistDetails;

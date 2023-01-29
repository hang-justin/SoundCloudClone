

import { useSelector } from 'react-redux';
import { onErrorImgCoverLoader } from '../../../utils';
import './PlaylistOwnerIcon.css';

const PlaylistOwnerIcon = ({ ownerId }) => {
    const profilePics = useSelector(state => state.profilePics);
    const artists = useSelector(state => state.artists);

    // Grab username
    const playlistOwnerUsername = artists[ownerId].username;

    // Grab playlist owner profile pic
    //
    // NOTE: Could be undefined
    const playlistOwnerPicSrc = profilePics[playlistOwnerUsername]

    return (
        <div id='playlist-owner-details'>
            <div id='playlist-owner-pic-container'>
                <img
                    id='playlist-owner-pic'
                    src={playlistOwnerPicSrc}
                    alt='user-icon'
                    onError={onErrorImgCoverLoader}
                />
            </div>

            <div id='playlist-owner-username'>
                {playlistOwnerUsername}
            </div>

        </div>
    )
}

export default PlaylistOwnerIcon;

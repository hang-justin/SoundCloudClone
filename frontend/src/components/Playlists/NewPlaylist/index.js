import cancelBtn from '../../../img/cancel-btn.png';
import { useSelector } from 'react-redux';
import './NewPlaylist.css';
import { onErrorImgCoverLoader } from '../../../utils';

const NewPlaylist = ({ playlistId, setNewPlaylistId, setShowCreatePlaylistModal }) => {
    const playlist = useSelector(state => state.playlists[playlistId]);

    return (
        <div id='new-playlist-display' className='flx-row-align-ctr'>
            <button id='close-playlist-modal-form-btn' onClick={() => setShowCreatePlaylistModal(false)}>
                <img
                    src={cancelBtn}
                    id='close-playlist-modal-img'
                    onError={onErrorImgCoverLoader}
                    alt='close'
                />
            </button>

            <img
                src={playlist.imageUrl}
                className='new-playlist-img'
                onError={onErrorImgCoverLoader}
                alt='new-playlist'
            />
        </div>
    )
};

export default NewPlaylist;

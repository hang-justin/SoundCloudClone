import cancelBtn from '../../../img/cancel-btn.png';
import { onErrorImgCoverLoader } from '../../../utils';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './NewPlaylist.css';

const NewPlaylist = ({ playlistId, setNewPlaylistId, setShowCreatePlaylistModal }) => {
    const history = useHistory();

    const playlist = useSelector(state => state.playlists[playlistId]);

    const createAnotherPlaylist = () => {
        setNewPlaylistId(0);
    }

    const goToNewPlaylist = () => {
        history.push(`/sets/${playlistId}`);
    }

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

            <h3 className='new-playlist-name'>
                {playlist.name}
            </h3>

            <div id='create-playlist-modal-btn-containers' className='flx-col'>
                <button className='create-playlist-modal-btns' onClick={goToNewPlaylist}>
                    Go to playlist
                </button>

                <button id='create-another-playlist-btn' onClick={createAnotherPlaylist}>
                    Create another playlist
                </button>
            </div>
        </div>
    )
};

export default NewPlaylist;

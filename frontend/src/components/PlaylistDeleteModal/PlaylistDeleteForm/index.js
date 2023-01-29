import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deletePlaylistFromArtist } from '../../../store/artists';
import { clearPlaylist } from '../../../store/audioPlayer';
import { deletePlaylist } from '../../../store/playlists';
import './PlaylistDeleteForm.css';

const PlaylistDeleteForm = ({ playlist, setShowPlaylistDeleteModal }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const currentPlaylist = useSelector(state => state.currentPlaylist);

    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeletePlaylist = async () => {
        dispatch(deletePlaylist(playlist))
            .then(() => {
                dispatch(deletePlaylistFromArtist(playlist))
            })
            .then(() => history.push('/you/library'))
            .catch(async err => {
                console.log('err is :', err)
                alert('Uh oh... Something went wrong. Please try again later.')
            })
        };

    return (
        <div id='delete-playlist-modal-form' className='flx-col'>
            <div id='confirmation-text'>
                Are you sure you want to delete this playlist?
            </div>

            {!showConfirmation && (
            <div id='confirm-btn-container' className='flx-row'>
                <button className='first-confirm-btns' onClick={() => setShowConfirmation(true)}>
                    Yes
                </button>

                <button className='first-confirm-btns' onClick={() => setShowPlaylistDeleteModal(false)}>
                    Never mind
                </button>
            </div>
            )}

            {showConfirmation && (
            <div id='second-confirm-btn-container'>
                <button className='second-confirm-btns' onClick={() => setShowConfirmation(false)}>
                    Hm... Having second thoughts!
                </button>

                <button className='second-confirm-btns' onClick={handleDeletePlaylist}>
                    Yes. Forever delete this playlist.
                </button>
            </div>
            )}
        </div>
    )
};

export default PlaylistDeleteForm;

import { useState } from 'react';
import './PlaylistDeleteForm.css';

const PlaylistDeleteForm = ({ playlist, setShowPlaylistDeleteModal }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

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

                <button className='second-confirm-btns'>
                    Yes. Forever delete this playlist.
                </button>
            </div>
            )}
        </div>
    )
};

export default PlaylistDeleteForm;

import { useSelector } from 'react-redux';

import EditIcon from '../../EditIcon';
import DeleteIcon from '../../DeleteIcon'

import './EditPlaylistOptions.css'
import { useState } from 'react';
import PlaylistDeleteModal from '../../PlaylistDeleteModal';

const EditPlaylistOptions = ({ playlist }) => {
    const user = useSelector(state => state.session.user);

    const [showPlaylistDeleteModal, setShowPlaylistDeleteModal] = useState(false);

    // GUARD CLAUSE
    // Return empty div with no edit options if session user doesn't own playlist
    if (user.id !== playlist.userId) return <div id='edit-playlist-options' />

    return (
        <div id='edit-playlist-options'>
            <button
                className='edit-del-playlist-btns'
                onClick={() => alert('working on it')}
            >
                <EditIcon />

                <span className='edit-delete-playlist-btns-text'>
                    Edit
                </span>
            </button>

            <button
                className='edit-del-playlist-btns'
                onClick={() => setShowPlaylistDeleteModal(true)}
            >
                <DeleteIcon />

                <span className='edit-delete-playlist-btns-text'>
                    Delete
                </span>
            </button>

            {
                showPlaylistDeleteModal &&
                <PlaylistDeleteModal
                    playlist={playlist}
                    showPlaylistDeleteModal={showPlaylistDeleteModal}
                    setShowPlaylistDeleteModal={setShowPlaylistDeleteModal}
                />
            }

        </div>
    )
};

export default EditPlaylistOptions;

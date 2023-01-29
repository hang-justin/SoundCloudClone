import { useSelector } from 'react-redux';

import EditIcon from '../../Icons/EditIcon';
import DeleteIcon from '../../Icons/DeleteIcon';
import cancelImgSrc from '../../../img/cancel-btn.png';

import './EditPlaylistOptions.css'
import { useState } from 'react';
import PlaylistDeleteModal from '../../PlaylistDeleteModal';
import PlaylistEditModal from '../../PlaylistEditModal';

const EditPlaylistOptions = ({ playlist, setOrToggleAudio }) => {
    const user = useSelector(state => state.session.user);

    const [showPlaylistEditModal, setShowPlaylistEditModal] = useState(false);
    const [showPlaylistDeleteModal, setShowPlaylistDeleteModal] = useState(false);

    // GUARD CLAUSE
    // Return empty div with no edit options if session user doesn't own playlist
    if (user.id !== playlist.userId) return <div id='edit-playlist-options' />

    return (
        <div id='edit-playlist-options'>

            <button
                className='edit-del-playlist-btns'
                onClick={() => setShowPlaylistEditModal(true)}
            >
                <EditIcon />

                <span className='edit-delete-playlist-btns-text'>
                    Edit
                </span>
            </button>

            {
                showPlaylistEditModal &&
                <PlaylistEditModal
                    playlist={playlist}
                    showPlaylistEditModal={showPlaylistEditModal}
                    setShowPlaylistEditModal={setShowPlaylistEditModal}
                    setOrToggleAudio={setOrToggleAudio}
                />
            }

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

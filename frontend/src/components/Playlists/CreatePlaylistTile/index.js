import { useState } from 'react';
import { Modal } from '../../../context/Modal';
import plusImg from '../../../img/plus.png';
import { onErrorImgCoverLoader } from '../../../utils';
import CreatePlaylistModalForm from '../CreatePlaylistModalForm';
import NewPlaylist from '../NewPlaylist';

import './CreatePlaylistTile.css';

const CreatePlaylistTile = () => {
    const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false);
    const [newPlaylistId, setNewPlaylistId] = useState(0);

    const closeModal = () => {
        setShowCreatePlaylistModal(false);
        setNewPlaylistId(0);
    }

    return (
        <div id='create-playlist-tile' className='playlist-tile flx-row-justify-align-ctr'>
            <div className='circle circle1'></div>
            <div className='circle circle2'></div>
            <div className='circle circle3'></div>

            <button
                id='create-playlist-btn'
                className='flx-row-justify-align-ctr'
                onClick={() => setShowCreatePlaylistModal(true)}
                >
                <img
                    src={plusImg}
                    id='create-playlist-icon'
                    onError={onErrorImgCoverLoader}
                    alt='create-playlist'
                />
            </button>

            {showCreatePlaylistModal &&
            <Modal onClose={() => closeModal()}>
                {!!newPlaylistId
                    ? (
                        <NewPlaylist
                            playlistId={newPlaylistId}
                            setNewPlaylistId={setNewPlaylistId}
                            setShowCreatePlaylistModal={setShowCreatePlaylistModal}
                        />)
                    : (
                        <CreatePlaylistModalForm
                            setShowCreatePlaylistModal={setShowCreatePlaylistModal}
                            setNewPlaylistId={setNewPlaylistId}
                        />)
                }
            </Modal>
            }
        </div>
    )
};

export default CreatePlaylistTile;

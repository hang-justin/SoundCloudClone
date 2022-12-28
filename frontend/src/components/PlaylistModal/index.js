import { useState } from 'react';
import { Modal } from '../../context/Modal';
import PlaylistForm from './PlaylistForm';


const PlaylistModal = ({song, showPlaylistModal, setShowPlaylistModal}) => {
    // const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    // console.log(song.id)
    return (
        <>
            {/* <button id='modal-login' onClick={() => setShowPlaylistModal(true)}>

            </button> */}

            {showPlaylistModal && (
            <Modal onClose={() => setShowPlaylistModal(false)}>
                <PlaylistForm setShowPlaylistModal={setShowPlaylistModal} song={song}/>
            </Modal>
            )}
        </>
    )

}

export default PlaylistModal

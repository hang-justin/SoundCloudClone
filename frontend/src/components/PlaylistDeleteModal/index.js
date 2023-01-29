import { Modal } from '../../context/Modal';
import PlaylistDeleteForm from './PlaylistDeleteForm';
import './PlaylistDeleteModal.css';

const PlaylistDeleteModal = ({ playlist, showPlaylistDeleteModal, setShowPlaylistDeleteModal}) => {

    return (
        <>
            {
                showPlaylistDeleteModal &&
                <Modal onClose={() => setShowPlaylistDeleteModal(false)}>
                    <PlaylistDeleteForm
                        playlist={playlist}
                        setShowPlaylistDeleteModal={setShowPlaylistDeleteModal}
                    />
                </Modal>
            }
        </>
    )
;}

export default PlaylistDeleteModal;

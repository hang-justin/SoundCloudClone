import { Modal } from '../../context/Modal';
import PlaylistForm from './PlaylistForm';


const PlaylistModal = ({song, showPlaylistModal, setShowPlaylistModal}) => {

    return (
        <>
            {showPlaylistModal && (
            <Modal onClose={() => setShowPlaylistModal(false)}>
                <PlaylistForm setShowPlaylistModal={setShowPlaylistModal} song={song}/>
            </Modal>
            )}
        </>
    )

}

export default PlaylistModal

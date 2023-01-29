import { Modal } from "../../context/Modal";
import PlaylistEditForm from "./PlaylistEditForm";

const PlaylistEditModal = ({ playlist, showPlaylistEditModal, setShowPlaylistEditModal, setOrToggleAudio }) => {

    return (
        <>
            {
                showPlaylistEditModal &&
                <Modal onClose ={() => setShowPlaylistEditModal(false)}>
                    <PlaylistEditForm
                        playlist={playlist}
                        setShowPlaylistEditModal={setShowPlaylistEditModal}
                        setOrToggleAudio={setOrToggleAudio}
                    />
                </Modal>

            }
        </>
    )
}

export default PlaylistEditModal;

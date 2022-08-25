import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSongForm from './EditSongForm';

const EditSongFormModal = ({ song }) => {
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = (e) => {
    setShowModal(true);
  }

  return (
    <>
      <button onClick={(e) => handleEditClick(e)}>Edit Song</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSongForm song={song} />
        </Modal>
      )}
    </>
  )
}

export default EditSongFormModal;

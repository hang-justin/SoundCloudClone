import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSongForm from './EditSongForm';

const EditSongFormModal = ({ song }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Song</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSongForm song={song} display={setShowModal} />
        </Modal>
      )}
    </>
  )
}

export default EditSongFormModal;

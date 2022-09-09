import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSongForm from './EditSongForm';

const EditSongFormModal = ({ song }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='alter-track-btns' onClick={() => setShowModal(true)}>
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSongForm song={song} display={setShowModal} />
        </Modal>
      )}
    </>
  )
}

export default EditSongFormModal;

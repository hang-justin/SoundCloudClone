import './CloseModalBtn.css';

const CloseModalBtn = ({ closeModalSetterFunc }) => {

    return (
        <button
            id='close-modal-btn'
            onClick={() => closeModalSetterFunc(false)}
        >
            Cancel
        </button>
    )
};

export default CloseModalBtn;

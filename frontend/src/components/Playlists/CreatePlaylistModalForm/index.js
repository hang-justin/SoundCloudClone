import cancelBtn from '../../../img/cancel-btn.png';
import { onErrorImgCoverLoader } from '../../../utils';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { createPlaylistRequest } from '../../../store/playlists';

import './CreatePlaylistModalForm.css';

const CreatePlaylistModalForm = ({ setShowCreatePlaylistModal, setNewPlaylistId }) => {
    const dispatch = useDispatch();

    const [playlistTitle, setPlaylistTitle] = useState('')
    const [charLimitReached, setCharLimitReached] = useState('');
    const [displayCharCount, setDisplalyCharCount] = useState('hidden-span')
    const [playlistImageUrl, setPlaylistImageUrl] = useState('');
    const [activeButton, setActiveButton] = useState(false);

    useEffect(() => {
        if (playlistTitle.length > 0) setDisplalyCharCount('')
        else setDisplalyCharCount('hidden-span')

        if (playlistTitle.trimStart().length >= 50) setCharLimitReached('red-text')
        else setCharLimitReached('')

    }, [playlistTitle]);

    useEffect(() => {
        if (playlistTitle.trimStart().length <= 0) return setActiveButton(false)
        if (playlistTitle.trimStart().length > 50) return setActiveButton(false)

        setActiveButton(true)
    }, [playlistTitle]);

    const updatePlaylistTitle = e => {
        if (e.target.value.length > 50) return

        setPlaylistTitle(e.target.value)
    }

    const handleCreateNewPlaylist = e => {
        e.preventDefault();

        // Note: need error handlers

        const playlist = {
            name: playlistTitle,
            imageUrl: playlistImageUrl
        };

        dispatch(createPlaylistRequest(playlist))
            .then(playlistInfo => setNewPlaylistId(playlistInfo.id))
    }

    return (
        <form
            id='create-new-playlist-form'
            onSubmit={handleCreateNewPlaylist}
            >

            <button id='close-playlist-modal-form-btn' onClick={() => setShowCreatePlaylistModal(false)}>
                <img
                    src={cancelBtn}
                    id='close-playlist-modal-img'
                    onError={onErrorImgCoverLoader}
                    alt='close'
                />
            </button>

            <label>
                <p
                    className='create-new-playlist-label'>
                    Playlist Title
                    <span className='red-text'>*</span>
                </p>

                <input
                    className='create-new-playlist-input'
                    type='text'
                    value={playlistTitle}
                    onChange={updatePlaylistTitle}
                />

                <span
                    id='create-playlist-char-limit'
                    className={`${displayCharCount} ${charLimitReached}`}
                    >
                    {50 - playlistTitle.trimStart().length}/50
                </span>
            </label>

            <br></br>
            <br></br>

            <button
                id='create-new-playlist'
                className={activeButton ? 'active-create-playlist-btn' : 'disabled-create-playlist-btn'}
                onClick={handleCreateNewPlaylist}
                disabled={!activeButton}
                >
                Create Playlist
            </button>

        </form>
    )
};

export default CreatePlaylistModalForm;

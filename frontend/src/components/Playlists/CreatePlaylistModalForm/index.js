import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createPlaylistRequest } from '../../../store/playlists';

import './CreatePlaylistModalForm.css';

const CreatePlaylistModalForm = ({ setShowCreatePlaylistModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();

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
            .then(playlistInfo => console.log(playlistInfo))
    }

    return (
        <form
            id='create-new-playlist-form'
            onSubmit={handleCreateNewPlaylist}
            >
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

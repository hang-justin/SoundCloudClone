import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPlaylistRequest } from '../../../store/playlists';

import '../../../img/cancel-btn.png';
import './EditBasicInfo.css';
import { onErrorImgCoverLoader } from '../../../utils';

const EditBasicInfo = ({ playlist, setShowPlaylistEditModal }) => {
    const dispatch = useDispatch();

    const allSongs = useSelector(state => state.songs);
    const [playlistName, setPlaylistName] = useState(playlist.name);
    const [titleRedOutline, setTitleRedOutline] = useState('');
    const [playlistNameCharCountReached, setPlaylistNameCharCountReached] = useState('');
    const [activeBtn, setActiveBtn] = useState(false);

    const handlePlaylistName = e => {
        setPlaylistName(e.target.value.trimStart());

        if (!titleRedOutline) setTitleRedOutline('');

        if (e.target.value.trim().length > 50) setPlaylistNameCharCountReached('red-text');
        else if (e.target.value.trim().length === 0) setPlaylistNameCharCountReached('red-text');
        else setPlaylistNameCharCountReached('');
    }

    const checkPlaylistChanges = e => {
        const inputErrors = [];

        // reset error indicators
        setTitleRedOutline('');

        // Playlist name checks
        // blank not allowed
        // >50 chars not allowed
        if (playlistName.trim().length === 0) {
            setPlaylistName('');
            inputErrors.push('Please enter a playlist name.')
            setTitleRedOutline('red-outline')
        }

        if (playlistName.trim().length > 50) {
            setPlaylistName(playlistName.trim());
            setPlaylistNameCharCountReached('red-text')
            inputErrors.push('Please enter a valid playlist name less than 50 characters.')
        }

        if (inputErrors.length > 0) return;

        const playlistInfo = {
            id: playlist.id,
            name: playlistName
        }

        console.log(typeof playlist.id)

        dispatch(editPlaylistRequest(playlistInfo))
            .then(() => setShowPlaylistEditModal(false))

        return;
    }

    return (
        <div id='edit-basic-content' className='flx-row'>

            <img
                id='edit-playlist-cover-img'
                src={playlist.imageUrl}
                onError={onErrorImgCoverLoader}
                alt='playlist-image'
            />

            <div className='flx-col'>
                <label>
                    <p className='edit-playlist-input-header'>
                        Title
                        <span className='red-text'>
                            *
                        </span>
                    </p>

                    <input
                        id='edit-playlist-name'
                        className={`edit-playlist-input ${titleRedOutline}`}
                        type='text'
                        value={playlistName}
                        placeholder='Playlist name'
                        onChange={handlePlaylistName}
                    />

                    <span className={`input-char-count ${playlistNameCharCountReached}`}>
                        {playlistName.length}/50
                    </span>
                </label>

                <button
                    id='save-playlist-changes-basic-info'
                    className='save-playlist-changes-btn'
                    onClick={checkPlaylistChanges}
                    disabled={!activeBtn}
                    >
                    Save changes
                </button>

            </div>

        </div>
    )
};

export default EditBasicInfo;

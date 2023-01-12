import { useEffect, useState } from "react"

import './CreateNewPlaylistForSong.css'
import SongToAddDetailsCard from "./SongToAddDetailsCard"

const CreateNewPlaylistForSong = ({ song }) => {

    const [playlistTitle, setPlaylistTitle] = useState('')
    const [playlistCharTitleLimitDisplay, setPlaylistCharTitleLimitDisplay] = useState('hidden-span')
    const [charLimitReached, setCharLimitReached] = useState('');
    const [activeButton, setActiveButton] = useState(false)

    useEffect(() => {
        if (playlistTitle.length > 0) setPlaylistCharTitleLimitDisplay('')
        else setPlaylistCharTitleLimitDisplay('hidden-span')

        if (playlistTitle.trimStart().length >= 50) setCharLimitReached('red-text')
        else setCharLimitReached('')

    },[playlistTitle])

    useEffect(() => {
        if (playlistTitle.trimStart().length <= 0) return setActiveButton(false)
        if (playlistTitle.trimStart().length > 50) return setActiveButton(false)

        setActiveButton(true)
    }, [playlistTitle])

    const updatePlaylistTitle = e => {
        if (e.target.value.length > 50) return

        setPlaylistTitle(e.target.value)
    }

    const handleNewPlaylist = e => {
        e.preventDefault();

        alert('working on it')
    }

    return (
        <form onSubmit={handleNewPlaylist}>
            <label>
                <p
                    className='create-new-playlist-label'>
                    Playlist Title
                    <span className='red-text'>*</span>
                </p>

                <input
                    id='create-new-playlist'
                    className='create-new-playlist-input'
                    type='text'
                    value={playlistTitle}
                    onChange={updatePlaylistTitle}
                />

                <span
                    id='create-playlist-char-limit'
                    className={`${playlistCharTitleLimitDisplay} ${charLimitReached}`}
                    >
                    {50 - playlistTitle.trimStart().length}/50
                </span>
            </label>

            <br></br>
            <br></br>

            <button
                id='create-new-playlist-for-song'
                className={activeButton ? 'active-create-playlist-btn' : 'disabled-create-playlist-btn'}
                onClick={handleNewPlaylist}
                disabled={!activeButton}
                >
                Create Playlist
            </button>

        </form>
    )
}

export default CreateNewPlaylistForSong

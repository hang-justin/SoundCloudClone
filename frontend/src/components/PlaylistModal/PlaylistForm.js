
import { useState } from 'react';
import AddToExistingPlaylist from './AddToExistingPlaylist';
import CreateNewPlaylistForSong from './CreateNewPlaylistForSong';
import './PlaylistForm.css'
import SongToAddDetailsCard from './SongToAddDetailsCard';

const PlaylistForm = ({ song, setShowPlaylistModal }) => {
    const [activePlaylistOption, setActivePlaylistOption] = useState('add-to-playlist');

    // console.log(song.id)

    const closeBtnImgSrc = 'https://i.imgur.com/1aSKStp.png';

    return (
        <div id='add-song-to-playlist-form' className='flx-col'>
            <button id='close-playlist-modal-btn' onClick={() => setShowPlaylistModal(false)}>
                <img id='close-login-img' src={closeBtnImgSrc} />
            </button>

            <div id='add-to-or-create-playlist-option' className='flx-row'>
                <div
                    className={`playlist-options-header ${activePlaylistOption === 'add-to-playlist' ? 'active-playlist-option' : ''}`}
                    onClick={() => setActivePlaylistOption('add-to-playlist')}
                    >
                    Add to playlist
                </div>
                <div
                    className={`playlist-options-header ${activePlaylistOption === 'create-and-add-to-playlist' ? 'active-playlist-option' : ''}`}
                    onClick={() => setActivePlaylistOption('create-and-add-to-playlist')}
                    >
                    Create a playlist
                </div>

            </div>
            
            <SongToAddDetailsCard song={song} />

            {
                activePlaylistOption === 'add-to-playlist' ?
                <AddToExistingPlaylist songToAddRemove={song} /> :
                <CreateNewPlaylistForSong song={song} />
            }

        </div>
    )
}

export default PlaylistForm

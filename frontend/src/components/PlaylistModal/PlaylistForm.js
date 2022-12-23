
import { useState } from 'react';
import './PlaylistForm.css'

const PlaylistForm = ({ song }) => {
    const [activePlaylistOption, setActivePlaylistOption] = useState('add-to-playlist');

    console.log(song.id)

    const closeBtnImgSrc = 'https://i.imgur.com/1aSKStp.png';

    return (
        <div id='add-song-to-playlist-form' className='flx-col'>
            <button id='close-playlist-modal-btn'>
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

            

        </div>
    )
}

export default PlaylistForm

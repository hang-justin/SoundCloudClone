
import './PlaylistForm.css'

const PlaylistForm = ({ song }) => {
    console.log(song.id)

    const closeBtnImgSrc = 'https://i.imgur.com/1aSKStp.png';

    return (
        <div id='add-song-to-playlist-form' className='flx-col'>
            <button id='close-playlist-modal-btn'>
                <img id='close-login-img' src={closeBtnImgSrc} />
            </button>

            <div id='add-to-or-create-playlist-option' className='flx-row'>
                <div>
                    Add to playlist
                </div>
                <div>
                    Create a playlist
                </div>
            </div>

        </div>
    )
}

export default PlaylistForm

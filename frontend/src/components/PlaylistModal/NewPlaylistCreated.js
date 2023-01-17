import { onErrorImgCoverLoader } from '../../utils'
import './NewPlaylistCreated.css'

const NewPlaylistCreated = (playlist) => {

    return (
        <div className='flx-row-align-ctr'>
            <img id='newly-created-playlist-img' src={playlist.imageUrl} onError={onErrorImgCoverLoader} />
            <div id='newly-created-playlist-details' className='flx-row-space-btw'>
                <span>
                    playlist title goes here {playlist.name}
                </span>
                <button>Go to playlist</button>
            </div>
        </div>
    )
}

export default NewPlaylistCreated

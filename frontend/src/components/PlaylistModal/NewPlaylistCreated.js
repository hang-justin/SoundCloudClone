import { useHistory } from 'react-router-dom'
import { onErrorImgCoverLoader } from '../../utils'
import './NewPlaylistCreated.css'

const NewPlaylistCreated = ({ playlist }) => {
    const history = useHistory();

    return (
        <div className='flx-row-align-ctr'>
            <img
                id='newly-created-playlist-img'
                src={playlist.imageUrl}
                onError={onErrorImgCoverLoader}
                alt='playlist-cover-img'
            />
            <div id='newly-created-playlist-details' className='flx-row-space-btw'>
                <span id='new-playlist-title'>
                    {playlist.name}
                </span>
                <button id='go-to-new-playlist-btn' onClick={() => history.push(`/sets/${playlist.id}`)} >Go to playlist</button>
            </div>
        </div>
    )
}

export default NewPlaylistCreated

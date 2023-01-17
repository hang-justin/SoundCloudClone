import { useHistory } from 'react-router-dom'
import { onErrorImgCoverLoader } from '../../utils'
import './NewPlaylistCreated.css'

const NewPlaylistCreated = ({ playlist }) => {
    const history = useHistory();

    return (
        <div className='flx-row-align-ctr'>
            <img id='newly-created-playlist-img' src={playlist.imageUrl} onError={onErrorImgCoverLoader} />
            <div id='newly-created-playlist-details' className='flx-row-space-btw'>
                <span>
                    {playlist.name}
                </span>
                <button onClick={() => history.push(`/sets/${playlist.id}`)} >Go to playlist</button>
            </div>
        </div>
    )
}

export default NewPlaylistCreated

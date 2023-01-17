
import { NavLink } from 'react-router-dom'
import { onErrorImgCoverLoader } from '../../../utils'
import './PlaylistTile.css'

const PlaylistTile = ({ playlist }) => {
    // Note: error handler for when accessing others' playlists?
    // Not needed for now since all playlists are public

    return (
        <div className='playlist-tile'>
            <NavLink className='playlist-link' to={`/sets/${playlist.id}`}>
                <img
                    className='playlist-img'
                    onError={onErrorImgCoverLoader}
                    src={playlist.imageUrl}
                    alt={`${playlist.name} cover`}
                />
                {playlist.name}
            </NavLink>
        </div>
    )
}

export default PlaylistTile

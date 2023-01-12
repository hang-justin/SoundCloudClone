

import { useSelector } from 'react-redux'
import './SongToAddDetailsCard.css'

const SongToAddDetailsCard = ({ song }) => {
    const artists = useSelector(state => state.artists)
    const artistId = song.userId;

    return (
        <div className='flx-row-align-ctr'>
            <img id='add-playlist-song-img' src={song.imageUrl} />
            <div id='add-playlist-song-details'>
                <p className='small-text gray-text' >{artists[artistId].username}</p>
                <p className='large-text'>{song.title}</p>
            </div>
        </div>
    )
}

export default SongToAddDetailsCard

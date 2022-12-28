import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addSongToPlaylist } from '../../store/playlists'
import './PlaylistCard.css'

const RemoveFromPlaylistBtn = ({ playlist, songToAdd }) => {

    return (
        <button
            className={`add-remove-playlist-song remove-song-from-playlist`}
            onClick={() => console.log('hi')}>
            Added
        </button>
    )
}
const AddToPlaylistBtn = ({playlist, songToAdd }) => {
    const dispatch = useDispatch();

    return (
        <button
            className={`add-remove-playlist-song add-song-to-playlist`}
            onClick={() => dispatch(addSongToPlaylist(songToAdd.id, playlist.id))}>
            Add to playlist
        </button>
    )
}

const PlaylistCard = ({ playlist, bottomBorder, songToAdd }) => {
    const isSongInPlaylist = !!playlist.songs[songToAdd.id]

    return (
        <div className={`add-to-playlist-card flx-row ${bottomBorder ? 'add-playlist-bot-border' : ''}`}>
            <NavLink to={`/sets/${playlist.id}`}>
                <img src={playlist.imageUrl} className='add-to-playlist-img' />
            </NavLink>

            <div className='playlist-info flx-col'>
                <div className='playlist-name'>
                    <NavLink to={`sets/${playlist.id}`}>
                        {playlist.name}
                    </NavLink>
                </div>

                <div className='playlist-track-count'>
                    {Object.keys(playlist.songs).length} tracks
                </div>
            </div>

            {
                isSongInPlaylist ?
                <RemoveFromPlaylistBtn playlist={playlist} songToAdd={songToAdd} /> :
                <AddToPlaylistBtn playlist={playlist} songToAdd={songToAdd} />
            }

        </div>
    )
}

export default PlaylistCard

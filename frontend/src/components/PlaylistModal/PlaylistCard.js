import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addSongToPlaylist, deleteSongFromPlaylist } from '../../store/playlists'
import { onErrorImgCoverLoader } from '../../utils'
import './PlaylistCard.css'

const RemoveFromPlaylistBtn = ({ playlist, songToAddRemove }) => {
    const dispatch = useDispatch();

    return (
        <button
            className={`add-remove-playlist-song remove-song-from-playlist`}
            onClick={() => dispatch(deleteSongFromPlaylist(songToAddRemove.id, playlist.id))}>
            Added
        </button>
    )
}
const AddToPlaylistBtn = ({playlist, songToAddRemove }) => {
    const dispatch = useDispatch();

    return (
        <button
            className={`add-remove-playlist-song add-song-to-playlist`}
            onClick={() => dispatch(addSongToPlaylist(songToAddRemove.id, playlist.id))}>
            Add to playlist
        </button>
    )
}

const PlaylistCard = ({ playlist, bottomBorder, songToAddRemove }) => {
    const isSongInPlaylist = !!playlist.songs[songToAddRemove.id]

    return (
        <div className={`add-to-playlist-card flx-row ${bottomBorder ? 'add-playlist-bot-border' : ''}`}>
            <NavLink to={`/sets/${playlist.id}`}>
                <img src={playlist.imageUrl} onError ={onErrorImgCoverLoader} className='add-to-playlist-img' />
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
                <RemoveFromPlaylistBtn playlist={playlist} songToAddRemove={songToAddRemove} /> :
                <AddToPlaylistBtn playlist={playlist} songToAddRemove={songToAddRemove} />
            }

        </div>
    )
}

export default PlaylistCard

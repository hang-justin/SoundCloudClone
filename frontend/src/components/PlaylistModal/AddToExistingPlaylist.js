import { useSelector } from "react-redux"

import './AddToExistingPlaylist.css'

const PlaylistCard = ({ playlist }) => {

    return (
        <div className='add-to-playlist-card flx-row'>
            <img src={playlist.imageUrl} className='add-to-playlist-img' />

            <div className='playlist-info flx-col'>
                <div className='playlist-name'>
                    {playlist.name}
                </div>

                <div className='playlist-track-count'>
                    
                </div>
            </div>

            {`${playlist.id} ${playlist.name}`}
        </div>
    )
}

const AddToExistingPlaylist = () => {
    const sessionUser = useSelector(state => state.session.user)
    const currentUserId = sessionUser.id

    const userInfo = useSelector(state => state.artists[currentUserId])
    const userPlaylistsIds = Object.keys(userInfo.playlists)

    const allPlaylists = useSelector(state => state.playlists)



    return (
        userPlaylistsIds.map( playlistId => <PlaylistCard key={playlistId} playlist={allPlaylists[playlistId]} />)
    )
}

export default AddToExistingPlaylist

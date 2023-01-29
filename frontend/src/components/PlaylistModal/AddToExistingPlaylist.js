import { useSelector } from "react-redux"

import './AddToExistingPlaylist.css'
import PlaylistCard from "./PlaylistCard"


const AddToExistingPlaylist = ({ songToAddRemove }) => {
    const sessionUser = useSelector(state => state.session.user)
    const currentUserId = sessionUser.id

    const userInfo = useSelector(state => state.artists[currentUserId])
    let userPlaylistsIds
    userInfo.playlists ? userPlaylistsIds = Object.keys(userInfo.playlists) : userPlaylistsIds = []
    // userPlaylistsIds = Object.keys(userInfo.playlists)

    const allPlaylists = useSelector(state => state.playlists)

    return (
        userPlaylistsIds.map( (playlistId, index) => (
                <PlaylistCard
                    key={playlistId}
                    songToAddRemove={songToAddRemove}
                    playlist={allPlaylists[playlistId]}
                    bottomBorder={index !== userPlaylistsIds.length - 1}
                />
        ))
    )
}

export default AddToExistingPlaylist

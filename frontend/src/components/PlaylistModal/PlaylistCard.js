import './PlaylistCard.css'

const RemoveFromPlaylistBtn = ({ playlist, songToAdd }) => {

    return (
        <button className={`add-remove-playlist-song remove-song-from-playlist`} >
            Added
        </button>
    )
}
const AddToPlaylistBtn = ({playlist, songToAdd }) => {

    return (
        <button className={`add-remove-playlist-song add-song-to-playlist`} >
            Add to playlist
        </button>
    )
}

const PlaylistCard = ({ playlist, bottomBorder, songToAdd }) => {
    const isSongInPlaylist = !!playlist.songs[songToAdd.id]

    return (
        <div className={`add-to-playlist-card flx-row ${bottomBorder ? 'add-playlist-bot-border' : ''}`}>
            <img src={playlist.imageUrl} className='add-to-playlist-img' />

            <div className='playlist-info flx-col'>
                <div className='playlist-name'>
                    {playlist.name}
                </div>

                <div className='playlist-track-count'>
                    {Object.keys(playlist.songs).length} tracks
                </div>
            </div>

            {
                isSongInPlaylist ?
                <RemoveFromPlaylistBtn /> :
                <AddToPlaylistBtn />
            }

        </div>
    )
}

export default PlaylistCard

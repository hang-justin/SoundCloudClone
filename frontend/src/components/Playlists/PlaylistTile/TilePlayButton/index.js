import playBtnImg from '../../../../img/play-btn.png';
import pauseBtnImg from '../../../../img/pause-btn.png';
import { onErrorImgCoverLoader } from '../../../../utils';

import { useSelector } from 'react-redux';

const TilePlayButton = ({ playlistId, setOrToggleAudio }) => {
    const allSongs = useSelector(state => state.songs);
    const allPlaylists = useSelector(state => state.playlists);
    const currentTrack = useSelector(state => state.audioPlayer.currentTrack);
    const currentPlaylist = useSelector(state => state.audioPlayer.currentPlaylist);
    const isPlaying = useSelector(state => state.audioPlayer.isPlaying);
    const playlist = allPlaylists[playlistId];
    if (!playlist || !playlist.songs) return <div>...</div>

    const isActivePlaylist = !!currentPlaylist
                                ? playlist.id === currentPlaylist.id
                                : false;

    const playlistTileBtnOverlayClass = isActivePlaylist
                                ?   'active-play-playlist-tile-overlay'
                                : 'play-playlist-tile-overlay';

    let playPauseBtnImgSrc = isActivePlaylist && isPlaying
            ? pauseBtnImg
            : playBtnImg;

    const handlePlayPlaylistBtnClick = (e) => {
        if (!currentPlaylist) {
            const firstTrackIdInPlaylist = Object.keys(playlist.songs)[0]

            // Can't play a playlist if there are no songs in it
            if (!firstTrackIdInPlaylist) return;

            const song = allSongs[firstTrackIdInPlaylist];
            setOrToggleAudio(e, song, playlist);
            return;
        }

        if (currentPlaylist) {
            if (isActivePlaylist) {
                const song = allSongs[currentTrack.id]
                setOrToggleAudio(e, song, playlist);
                return;
            } else {
                // else there is a different currentPlaylist in store
                // and user is attemping to play a different playlist

                const firstTrackIdInPlaylist = Object.keys(playlist.songs)[0]

                // Can't play a playlist if there are no songs in it
                if (!firstTrackIdInPlaylist) return;

                const song = allSongs[firstTrackIdInPlaylist];
                setOrToggleAudio(e, song, playlist);
                return;
            }
        }
    }

    return (
        <button
            className={`${playlistTileBtnOverlayClass}`}
            onClick={handlePlayPlaylistBtnClick}
            >
            <img
                src={playPauseBtnImgSrc}
                className='playlist-tile-img-overlay'
                onError={onErrorImgCoverLoader}
                alt='play-pause-btn'
            />
        </button>
    )
};

export default TilePlayButton;

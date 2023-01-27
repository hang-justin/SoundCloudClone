import playBtnImg from '../../../img/play-btn.png';
import pauseBtnImg from '../../../img/pause-btn.png';
import { onErrorImgCoverLoader } from '../../../utils';

import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './PlaylistTile.css';
import { fetchCurrentSongWithComments } from '../../../store/song';
import { useState } from 'react';
import TilePlayButton from './TilePlayButton';
import BufferingIconOverlay from './BufferingIconOverlay';

const PlaylistTile = ({ playlistId, setOrToggleAudio }) => {
    // Note: error handler for when accessing others' playlists?
    // Not needed for now since all playlists are public
    const dispatch = useDispatch();
    const allSongs = useSelector(state => state.songs);
    const allPlaylists = useSelector(state => state.playlists);
    const currentTrack = useSelector(state => state.audioPlayer.currentTrack);
    const currentPlaylist = useSelector(state => state.audioPlayer.currentPlaylist);
    const isPlaying = useSelector(state => state.audioPlayer.isPlaying);

    const [forceReloadForSong, setForceReloadForSong] = useState(false);

    const playlist = allPlaylists[playlistId];
    if (!playlist) return <div>Loading playlist...</div>

    const isActivePlaylist = !!currentPlaylist
                            ? playlist.id === currentPlaylist.id
                            : false;

    const playlistTileBtnOverlayClass = isActivePlaylist
                                ?   'active-play-playlist-tile-overlay'
                                : 'play-playlist-tile-overlay';

    let playPauseBtnImgSrc = isActivePlaylist && isPlaying
                                ? pauseBtnImg
                                : playBtnImg;


    const playlistSongIds = Object.keys(playlist.songs);
    const isPlaylistEmpty = !playlistSongIds.length;

    return (
        <div className='playlist-tile flx-col'>
            <NavLink className='playlist-link' to={`/sets/${playlist.id}`}>
                <img
                    className='playlist-img'
                    onError={onErrorImgCoverLoader}
                    src={playlist.imageUrl}
                    alt={`${playlist.name} cover`}
                />
                {playlist.name}
            </NavLink>

            {isPlaylistEmpty
                ?   <BufferingIconOverlay />
                :   <TilePlayButton
                        playlistId={playlistId}
                        setOrToggleAudio={setOrToggleAudio}
                    />
            }
        </div>
    )
}

export default PlaylistTile

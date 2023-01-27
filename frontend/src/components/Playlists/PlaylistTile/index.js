import { onErrorImgCoverLoader } from '../../../utils';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import TilePlayButton from './TilePlayButton';
import BufferingIconOverlay from './BufferingIconOverlay';

import './PlaylistTile.css';

const PlaylistTile = ({ playlistId, setOrToggleAudio }) => {
    const allPlaylists = useSelector(state => state.playlists);

    const playlist = allPlaylists[playlistId];
    if (!playlist) return <div>Loading playlist...</div>


    const playlistSongIds = Object.keys(playlist.songs);
    const isPlaylistEmpty = !playlistSongIds.length;

    return (
        <div className='playlist-tile flx-col'>
            <div className='playlist-link-container'>
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
        </div>
    )
}

export default PlaylistTile

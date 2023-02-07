import cancelBtnImg from '../../../img/cancel-btn.png';
import { onErrorImgCoverLoader } from '../../../utils';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CurrentPlaylistTrack from '../CurrentPlaylistTrack';

import './CurrentPlaylistSongs.css';

const CurrentPlaylistSongs = ({ setOrToggleAudio, setShowPlaylistSongs }) => {
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const currentPlaylist = useSelector(state => state.audioPlayer.currentPlaylist);
    const allPlaylists = useSelector(state => state.playlists);

    const navToPlaylistsPage = (e) => {
        e.stopPropagation();
        history.push(`/you/library`)
    }

    if (!currentPlaylist) {
        return (
            <div id='playlist-songs-popup' className='flx-col'>
                <div
                    id='playlist-songs-popup-header'
                    className='flx-row-align-ctr'
                    onClick={() => setShowPlaylistSongs(false)}
                    >

                    {!!user
                        ? 'No playlist selected. Please select a playlist.'
                        : 'Sign in to select a playlist'
                    }

                    {user &&
                        <button id='go-to-playlists' onClick={navToPlaylistsPage}>
                            View playlists
                        </button>
                    }

                    <img
                        src={cancelBtnImg}
                        id='close-playlist-songs-popup'
                    />
                </div>
            </div>
        )
    }

    const currentPlaylistId = currentPlaylist.id;
    const playlist = allPlaylists[currentPlaylistId]

    const navToPlaylist = () => {
        history.push(`/sets/${playlist.id}`)
    }

    return (
        <div id='playlist-songs-popup' className='flx-col'>
            <div
                id='playlist-songs-popup-header'
                className='flx-row-align-ctr'
                onClick={() => setShowPlaylistSongs(false)}
                >
                Next up

                <img
                    src={cancelBtnImg}
                    id='close-playlist-songs-popup'
                    onError={onErrorImgCoverLoader}
                    alt='close'
                />
            </div>

            <div id='current-playlist-popup' className='flx-row-align-ctr'>
                <img
                    src={playlist.imageUrl}
                    id='current-playlist-playing-img'
                    onError={onErrorImgCoverLoader}
                    alt='current-playlist-cover-img'
                    onClick={navToPlaylist}
                />

                <span onClick={navToPlaylist}>
                    {playlist.name}
                </span>
            </div>

            {Object.keys(playlist.songs).map((songId) =>
                <CurrentPlaylistTrack
                    key={songId}
                    playlist={playlist}
                    songId={songId}
                    setOrToggleAudio={setOrToggleAudio}
                />
            )}
        </div>
    )
};

export default CurrentPlaylistSongs;

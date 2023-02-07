import playBtnImg from '../../../img/play-btn.png';
import pauseBtnImg from '../../../img/pause-btn.png';
import { onErrorImgCoverLoader } from '../../../utils';

import { useSelector } from 'react-redux';

const BannerPlayButton = ({ playlistId, setOrToggleAudio }) => {
    const allSongs = useSelector(state => state.songs);
    const allArtists = useSelector(state => state.artists);
    const allPlaylists = useSelector(state => state.playlists);

    const currentTrack = useSelector(state => state.audioPlayer.currentTrack);
    const currentPlaylist = useSelector(state => state.audioPlayer.currentPlaylist);
    const isPlaying = useSelector(state => state.audioPlayer.isPlaying);

    const playlist = allPlaylists[playlistId];

    const isCurrentPlaylistPlaying = currentPlaylist
                                        ? playlist.id === currentPlaylist.id
                                        : false;

    let playPauseBtnImg = playBtnImg;
    if (isCurrentPlaylistPlaying) {
        // If current playlist is being played
        // Change logo depending on isPlaying
            isPlaying
            ? playPauseBtnImg=pauseBtnImg
            : playPauseBtnImg=playBtnImg;
    }

    const handlePlayBtn = e => {
        const playlistSongIds = Object.keys(playlist.songs);

        // can't play a playlist if it has 0 songs
        if (playlistSongIds.length === 0) return;

        if (!currentTrack || !currentPlaylist) {
            const firstTrackId = playlistSongIds[0];
            const song = allSongs[firstTrackId];
            setOrToggleAudio(e, song, playlist);
            return;
        }

        if (isCurrentPlaylistPlaying) {
            const song = allSongs[currentTrack.id];
            setOrToggleAudio(e, song, playlist);
            return;
        } else {
            const firstTrackId = playlistSongIds[0];
            const song = allSongs[firstTrackId];
            setOrToggleAudio(e, song, playlist);
            return;
        }
    }

    return (
        <button id='song-banner-toggle-play' onClick={handlePlayBtn}>
            <img
                src={playPauseBtnImg}
                id='song-component-toggle-play'
                onError={onErrorImgCoverLoader}
                alt='toggle-play button'
                />
        </button>
    )
};

export default BannerPlayButton;

import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { onErrorImgCoverLoader } from "../../../utils";

const CurrentTrackDisplay = ({ currentTrack }) => {
    const allArtists = useSelector(state => state.artists);
    const currentSong = useSelector(state => state.songs[currentTrack?.id]);

    if (!currentTrack || !currentSong) return (
        <div className='current-track-info flx-row'>
            <span id='footer-no-audio'>No audio selected. Please select a song.</span>
        </div>
    );

    let artist = allArtists[currentSong.userId];
    return (
        <div className='current-track-info flx-row'>
            <NavLink to={`/${artist.id}/songs/${currentSong.id}`}>
                <img
                    id='footer-track-img'
                    src={currentSong.imageUrl}
                    onError={onErrorImgCoverLoader}
                    alt='song-cover-img'
                />
            </NavLink>

            <div className='song-details flx-col'>
                <NavLink to={`/${artist.id}/songs/${currentSong.id}`}>
                    <span id='footer-artist-name' className='footer-song-details'>
                        {artist.username}
                    </span>
                </NavLink>

                <NavLink to={`/${artist.id}/songs/${currentSong.id}`}>
                    <span id='footer-song-title' className='footer song-details'>
                        {currentSong.title}
                    </span>
                </NavLink>
            </div>
        </div>
    )
};

export default CurrentTrackDisplay;

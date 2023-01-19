import playBtnImg from '../../img/play-btn.png';
import pauseBtnImg from '../../img/pause-btn.png';
import waveformImg from '../../img/waveform.png';

import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { fetchCurrentSongWithComments } from '../../store/song';
import { onErrorImgCoverLoader } from '../../utils';
import { useState } from 'react';

const SongBanner = ({ setOrToggleAudio, song }) => {
    const dispatch = useDispatch();
    // song is either passed in or set from useParams
    const { songId } = useParams();
    const allSongs = useSelector(state => state.songs)
    const allArtists = useSelector(state => state.artists)
    const currentTrack = useSelector(state => state.audioPlayer.currentTrack)
    const isPlaying = useSelector(state => state.audioPlayer.isPlaying)

    const [songNotFound, setSongNotFound] = useState(false);

    // song = songId ? allSongs[songId] : song;
    if (!song) song = allSongs[1]

    let playPauseBtnImg = playBtnImg;

    // Guard clause if song isn't in store, fetch in DB
    // if song doesn't exist in DB, redirect to 404
    if (Object.keys(allSongs).length > 0 && !song) {
        dispatch(fetchCurrentSongWithComments(songId))
        .catch(async errRes => {
            const errMessage = await errRes.json();

            // NOTE
            // perhaps we can pass the errMessage into the redirect
            // by setting songNotFound default to empty string
            // then put errMessage in songNotFound with errMessage string
        })
        .then(() => setSongNotFound(true))
    }

    if (currentTrack) {
        if (currentTrack.id === song.id) {
            isPlaying
            ? playPauseBtnImg=pauseBtnImg
            : playPauseBtnImg=playBtnImg;
        }
    }

    if (songNotFound) return <Redirect to='/404' />

    const artist = allArtists[song.userId]
    return (
        <div className='song-banner'>

            <div className='song-banner__left'>
                <div className='song-banner__left__top'>

                    <button id='song-banner-toggle-play' onClick={(e) => setOrToggleAudio(e, song)}>
                        <img
                            id='song-component-toggle-play'
                            src={playPauseBtnImg}
                            alt='toggle-play button'
                            onError={onErrorImgCoverLoader}
                            />
                    </button>


                    <div className='song-banner__top__song-info'>
                        <div id='song-title'>
                            <span id='song-info__song-title'>
                                {song.title}
                            </span>
                        </div>

                        <div id='song-artist'>
                            <span id='song-info__song-artist'>
                                {artist.username}
                            </span>
                        </div>
                    </div>

                </div>

                <div className='song-banner__left__bottom'>
                    <div className='song-waveform'>
                        <img
                            className='song-waveform-img'
                            src={waveformImg}
                            alt='waveform'
                            onError={onErrorImgCoverLoader}
                        />
                    </div>
                </div>

            </div>

            <div className='song-banner__right'>
                <div className='song-image-container'>
                    <img
                        className='banner-song-image'
                        src={song.imageUrl}
                        alt={`${song.title}'s Cover`}
                        onError={onErrorImgCoverLoader}
                    />
                </div>
            </div>

    </div>
    )
};

export default SongBanner;

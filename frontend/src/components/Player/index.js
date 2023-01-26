import { onErrorImgCoverLoader } from '../../utils';

import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { isPlaying, setActiveTrack, stopPlayer } from '../../store/audioPlayer';
import songsReducer from '../../store/song';

import './Player.css'

const Player = ({ setAudioPlayerRef }) => {
  const dispatch = useDispatch();
  const player = useRef();

  const currentTrack = useSelector(state => state.audioPlayer.currentTrack);
  const currentPlaylist = useSelector(state => state.audioPlayer.currentPlaylist);
  const isCurrentlyPlaying = useSelector(state => state.audioPlayer.isPlaying);

  const artists = useSelector(state => state.artists);
  const allSongs = useSelector(state => state.songs);
  const allPlaylists = useSelector(state => state.playlists);
  const currentSong = useSelector(state => state.songs[currentTrack?.id]);

  const [playerVisibility, setPlayerVisibility] = useState('hiddenPlayer');
  const [trackIndex, setTrackIndex] = useState(0);

  useEffect(() => {
    setAudioPlayerRef(player);
  }, [player])

  useEffect(() => {
    // Displays the audio player once a track is played
    if (playerVisibility !== '') setPlayerVisibility('');

    // if the current track was removed from the playlist

    // manages playlist
    if (currentTrack && !!currentPlaylist) {
      const playlist = allPlaylists[currentPlaylist.id];
      const playlistSongs = Object.keys(playlist.songs);

      const indexOfCurrentTrack = playlistSongs.indexOf(currentTrack.id.toString());

      // what if the currentTrack was removed from the playlist?
      // if trackIndex is >=  length of new playlist.songs
      if (indexOfCurrentTrack === -1) {
        dispatch(setActiveTrack(currentTrack))
        return;
      }

      setTrackIndex(+indexOfCurrentTrack);
    }

    // Resets track index if a standalone song is played
    if (currentTrack && !currentPlaylist && trackIndex !== 0) {
      setTrackIndex(0);
    }

  }, [currentTrack, currentPlaylist, allPlaylists])

  const displayCurrentTrack = (currentTrack) => {
    if (!currentTrack || !currentSong) return (
      <div className='current-track-info flx-row'>
        <span id='footer-no-audio'>No audio selected. Please select a song.</span>
      </div>
    );

    let artist = artists[currentSong.userId];
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
              <span id='footer-artist-name' className='footer-song-details'>{artist.username}</span>
            </NavLink>
            <NavLink to={`/${artist.id}/songs/${currentSong.id}`}>
              <span id='footer-song-title' className='footer song-details'>{currentSong.title}</span>
            </NavLink>
        </div>
      </div>
    )
  }

  const handleClickPrevious = (e) => {
    if (!currentPlaylist) {
      player.current.audio.current.currentTime = 0;
      return;
    } else {
      // if there's a playlist, run these conditionals

      // Restart audio if it's been playing for more than 2s
      if (player.current.audio.current.currentTime >= 2) {
        player.current.audio.current.currentTime = 0;
        return;
      } else {
        // If the audio has played for less than 2s then:
        //    1)  If it is the first song in the playlist
        //          a.  Reset audio to 0s
        //          b.  Pause the player if it is playing
        //    2)  Otherwise, play track before the currentTrack
        if (trackIndex === 0) {
          player.current.audio.current.currentTime = 0;
          if (isCurrentlyPlaying) player.current.togglePlay(e);
          return;
        } else {
          const playlist = allPlaylists[currentPlaylist.id];
          const playlistSongs = Object.keys(playlist.songs);

          const prevSongId = playlistSongs[trackIndex - 1];
          dispatch(setActiveTrack(allSongs[prevSongId], playlist))
        }
      }
    }
  }

  const handleClickNext = () => {
    // only works if there is a playlist being played
    if (!currentPlaylist) {
      alert('No playlist is in queue. Try playing a playlist.');
      dispatch(stopPlayer());
      return;
    }

    if (currentPlaylist) {
      const playlist = allPlaylists[currentPlaylist.id];
      const playlistSongs = Object.keys(playlist.songs);

      if (trackIndex >= playlistSongs.length - 1) {
        dispatch(stopPlayer());
        return;
      }

      const nextSongId = playlistSongs[trackIndex + 1]
      dispatch(setActiveTrack(allSongs[nextSongId], playlist));
    }
  }

  const handleEnd = () => {
    if (!currentPlaylist) return;

    const playlist = allPlaylists[currentPlaylist.id];
    const playlistSongs = Object.keys(playlist.songs);

    if (trackIndex >= playlistSongs.length - 1) return;

    const nextSongId = playlistSongs[trackIndex + 1]
    dispatch(setActiveTrack(allSongs[nextSongId], playlist))
  }


  if (currentTrack && currentSong === undefined) {
    player.current.audio.current.src = '';
  }

  return (
      <div className={`footer-audio-container ${playerVisibility}`}>
        <div className='react-audio-player-container'>

          <AudioPlayer
            layout='horizontal-reverse'
            src={currentTrack ? currentTrack.url : ''}
            ref={player}
            autoPlayAfterSrcChange
            onPlay={() => dispatch(isPlaying(true))}
            onPause={() => dispatch(isPlaying(false))}
            showSkipControls={true}
            showFilledVolume={true}
            onClickPrevious={handleClickPrevious}
            onClickNext={handleClickNext}
            onEnded={handleEnd}
          />

        </div>

        <div className='audio-footer-current-track flx-row'>
          {displayCurrentTrack(currentTrack)}
        </div>
      </div>

  )
}

export default Player;

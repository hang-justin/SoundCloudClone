import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { addSongToPlaylist, getOnePlaylistWithSongs } from "../../store/playlists";
import { onErrorImgCoverLoader } from "../../utils";
import Social from "../Social";
import PlaylistSongBanner from "../PlaylistSongBanner";
import EditPlaylistOptions from "./EditPlaylistOptions";
import PlaylistDetails from "./PlaylistDetails";

import './SinglePlaylist.css'

const SinglePlaylist = ({ setOrToggleAudio }) => {
  const dispatch = useDispatch();

  const { userId, playlistId } = useParams();

  const playlists = useSelector(state => state.playlists);
  const allSongs = useSelector(state => state.songs);
  const user = useSelector(state => state.session.user);
  const [failedPlaylistFetch, setFailedPlaylistFetch] = useState(false);

  const currentPlaylist = playlists[playlistId]

  useEffect(() => {
    dispatch(getOnePlaylistWithSongs(playlistId))
    .catch(async e => {
      let data = await e.json()
      console.log(data);
      setFailedPlaylistFetch(true)
    })
  }, [playlistId])

  if (failedPlaylistFetch && !currentPlaylist) {
    return <Redirect to='/404' />
  }

  // Implement another guard clause where no playlists are found?
  if (!currentPlaylist) return <div>Loading playlist...</div>

  if (!currentPlaylist.songs) return <div>Loading...</div>
  const songIds = Object.keys(currentPlaylist.songs)
  // console.log('songIds are ', songIds)

  // will want to hit /api/:playlistId
  // will return said playlist with included songs


  const needToImplement = () => {
    alert('need to implement')
  }

  const testAddSong = () => {
    dispatch(addSongToPlaylist(1, 8))
    // playlistId, songId
  }


  return (
    <div id='playlist-container'>

      <PlaylistSongBanner setOrToggleAudio={setOrToggleAudio} playlist={currentPlaylist} />

      <div id='playlist-content' className='flx-row'>

        <div id='playlist-info-container'>
          <EditPlaylistOptions playlist={currentPlaylist} setOrToggleAudio={setOrToggleAudio} />

          <PlaylistDetails setOrToggleAudio={setOrToggleAudio} playlist={currentPlaylist} />
        </div>

        <div id='social-ad-container'>
          <Social />
        </div>

      </div>

    </div>

  );
};

export default SinglePlaylist;

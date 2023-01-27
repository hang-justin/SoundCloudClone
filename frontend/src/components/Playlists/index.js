import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, Route, Switch, useHistory, useParams } from 'react-router-dom';
import { getCurrentUserPlaylists } from "../../store/playlists";
import { onErrorImgCoverLoader } from "../../utils";


import './Playlists.css'
import PlaylistTile from "./PlaylistTile";

const Playlists = ({ setOrToggleAudio }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const artists = useSelector(state => state.artists)
  const playlists = useSelector(state => state.playlists)
  const [errors, setErrors] = useState([]);

  if (!user) {
    return <Redirect to='/' />
  }

  if (!playlists) {
    dispatch(getCurrentUserPlaylists())
    return <div>Loading playlists...</div>
  }

  if (!artists[user.id]) {
    return <div>Loading artist...</div>
  }

  if (!artists[user.id].playlists) {
    return <div>Loading user's playlists...</div>
  }
  console.log("user's playlists are: ", artists[user.id].playlists)
  console.log('all playlists are :', playlists)
  const userPlaylistIds = Object.keys(artists[user.id].playlists)

  return (
    <div id='playlist-component'>
      <p>Playlists Component</p>

      {/* <button onClick={getCurrentUserPlaylists}>Get playlists</button> */}
      <button>Create a playlist</button>
      <button>Select Playlist</button>

      <p>{`Hear your own playlists and the playlists you’ve liked:`}</p>

      <div id='user-playlist-container' className='flx-row'>
        {userPlaylistIds.map((playlistId) =>
          <PlaylistTile
            key={playlistId}
            playlistId={playlistId}
            setOrToggleAudio={setOrToggleAudio}
          />
        )}
      </div>

    </div>

  );
};

export default Playlists;

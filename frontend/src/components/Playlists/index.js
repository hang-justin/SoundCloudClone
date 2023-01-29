import { useDispatch, useSelector } from "react-redux";
import { Redirect} from 'react-router-dom';
import { getCurrentUserPlaylists } from "../../store/playlists";
import CreatePlaylistTile from "./CreatePlaylistTile";

import './Playlists.css'
import PlaylistTile from "./PlaylistTile";

const Playlists = ({ setOrToggleAudio }) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)
  const artists = useSelector(state => state.artists)
  const playlists = useSelector(state => state.playlists)

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

  const userPlaylistIds = Object.keys(artists[user.id].playlists)

  return (
    <div id='playlist-component'>

      <h2 id='playlists-component-header'>
        Hear your own playlists:
      </h2>

      <div id='user-playlist-container' className='flx-row'>
        <CreatePlaylistTile />

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

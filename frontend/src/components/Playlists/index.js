import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect} from 'react-router-dom';
import { getCurrentUserPlaylists } from "../../store/playlists";
import CreatePlaylistTile from "./CreatePlaylistTile";

import './Playlists.css'
import PlaylistsLoadingPage from "./PlaylistsLoadingPage";
import PlaylistTile from "./PlaylistTile";

const Playlists = ({ setOrToggleAudio }) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const artists = useSelector(state => state.artists);
  const userPlaylists = useSelector(state => state.playlists);

  const [attemptedPlaylistFetch, setAttemptedPlaylistFetch] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (attemptedPlaylistFetch) return;
    if (userPlaylists) return;

    dispatch(getCurrentUserPlaylists(user.id))
      .then(() => setAttemptedPlaylistFetch(true));

  }, [dispatch])

  if (!user) {
    return <Redirect to='/' />
  }

  if (!userPlaylists && !attemptedPlaylistFetch) return <PlaylistsLoadingPage />

  if (!artists[user.id] && !attemptedPlaylistFetch) return <PlaylistsLoadingPage />

  let userPlaylistIds = Object.keys(userPlaylists)

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

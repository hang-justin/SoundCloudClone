import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as playlistsActions from '../../store/playlists';

import './Playlists.css'

const Playlists = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const userPlaylists = useSelector(state => state.playlists.currentUser)

  const [errors, setErrors] = useState([]);

  // need to dispatch thunk to retrieve associated playlists
  // /api/playlists/current => retrieves all of sessionUser's playlists

  // Commented out below. Rendered playlists in App.js instead of below
  //
  // const getCurrentUserPlaylists = () => {
  //   let playlists = dispatch(playlistsActions.getCurrentUserPlaylists())
  //     .catch(async (res) => {
  //       console.log('error caught in components/playlists/index > getCurrentUserPlaylists')
  //       console.log(res)
  //       // const data = await res.json();
  //       // if no playlists => returns { message: 'No playlists found' }
  //     })
  //     .then(async res => res)
  //   // .then(res => res.data)

  // }

  console.log('userPlaylists is ', userPlaylists)
  let playlistDiv = [];
  for (let playlistId in userPlaylists) {
    let playlist = userPlaylists[playlistId]
    console.log(playlist)
    playlistDiv.push(
      <div className='playlist-container' id={`playlistDiv${playlistId}`}>
        <div>
          <img className='playlist-img' src={playlist.imageUrl} alt={`Playlist ${playlistId} Img`} />
        </div>
        {playlist.name}
      </div>
    )
  }

  return (
    <div>Playlists Component
      <p>Render user playlists here</p>

      {/* <button onClick={getCurrentUserPlaylists}>Get playlists</button> */}
      <button>Create a playlist</button>
      <button>Select Playlist</button>

<p>{`${user.username}'s wack playlists`}</p>
      <div className='all-playlist-container'>
        {playlistDiv}
      </div>

    </div>
  );
};

export default Playlists;

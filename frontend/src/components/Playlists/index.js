import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Switch, useParams } from 'react-router-dom';

import * as playlistsActions from '../../store/playlists';

import './Playlists.css'

export const SinglePlaylist = () => {
  const dispatch = useDispatch();
  const currentPlaylist = useSelector(state => state.playlists.currentPlaylist)
  const { userId, playlistId } = useParams();

  // will want to hit /api/:playlistId
  // will return said playlist with included songs

  useEffect(() => {
    dispatch(playlistsActions.getOnePlaylistWithSongs(playlistId))
  }, [playlistId])

  console.log(currentPlaylist)
  const needToImplement = () => {
    alert('need to implement')
  }

  return (
    <div>
      <div>
        <img className='playlist-img' src={currentPlaylist.imageUrl} alt={`${currentPlaylist.name} Img`} />
      </div>
      <button onClick={needToImplement}>Edit</button>

      {/* Note: only render below if playlist owner matches session user */}
      <button onClick={needToImplement}>Delete</button>
    </div>
  );
};

const Playlists = () => {
  // const dispatch = useDispatch();
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

  let playlistDiv = [];
  for (let playlistId in userPlaylists) {
    let playlist = userPlaylists[playlistId];

    // To render current user's playlists
    playlistDiv.push(
      <div className='playlist-container' id={`playlistDiv${playlist.id}`}>
        <NavLink className='playlist-link' to={`/${playlist.userId}/${playlist.id}`}>
          <div>
            <img className='playlist-img' src={playlist.imageUrl} alt={`${playlist.name} Img`} />
          </div>
          {playlist.name}
        </NavLink>
      </div>
    )
  }

  return (
    <div>
      <p>Playlists Component</p>

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

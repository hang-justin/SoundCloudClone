import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Switch, useParams } from 'react-router-dom';
import { getCurrentUserPlaylists } from "../../store/playlists";
import { onErrorImgCoverLoader } from "../../utils";


import './Playlists.css'
import PlaylistTile from "./PlaylistTile";

const Playlists = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const artists = useSelector(state => state.artists)
  const playlists = useSelector(state => state.playlists)
  const [errors, setErrors] = useState([]);

  if (!playlists) {
    dispatch(getCurrentUserPlaylists())
    return <div>Loading...</div>
  }

  if (!artists[user.id]) {
    return <div>Loading artist...</div>
  }

  const userPlaylistIds = Object.keys(artists[user.id].playlists)

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

  let userPlaylists = [];
  for (let playlistId in userPlaylistIds) {
    let playlist = playlists[playlistId];
    // console.log('playlist in the for loop is ', )

    // To render current user's playlists
    // userPlaylists.push(
    //   <div key={`playlist-id${playlist.id}`} className='playlist-container' id={`userPlaylists-${playlist.id}`}>
    //     <NavLink className='playlist-link' to={`/sets/${playlist.id}`}>
    //       <div>
    //         <img className='playlist-img' onError={onErrorImgCoverLoader} src={playlist.imageUrl} alt={`${playlist.name} Img`} />
    //       </div>
    //       {playlist.name}
    //     </NavLink>
    //   </div>
    // )
  }

  return (
    <div id='playlist-component'>
      <p>Playlists Component</p>

      {/* <button onClick={getCurrentUserPlaylists}>Get playlists</button> */}
      <button>Create a playlist</button>
      <button>Select Playlist</button>

      <p>{`Hear your own playlists and the playlists you’ve liked:`}</p>
      
      <div id='user-playlist-container' className='flx-row'>
        {/* {userPlaylists} */}
        {userPlaylistIds.map((playlistId) => <PlaylistTile key={playlistId}playlist={playlists[playlistId]} />)}
      </div>

    </div>

  );
};

export default Playlists;

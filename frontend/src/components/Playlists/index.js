import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Playlists = () => {
  const user = useSelector(state => state.session.user)

  // need to dispatch thunk to retrieve associated playlists
  //

  return (
    <div>Playlists Component
      <p>Render user playlists here</p>
      <button>Create a playlist</button>
      <button>Select Playlist</button>
    </div>
  );
};

export default Playlists;

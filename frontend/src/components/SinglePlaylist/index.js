import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addSongToPlaylist, getOnePlaylistWithSongs } from "../../store/playlists";
import PlaylistSongCard from "../PlaylistSongCard";



const SinglePlaylist = () => {
  const dispatch = useDispatch();
  const playlists = useSelector(state => state.playlists)
  const songs = useSelector(state => state.songs)
  const { userId, playlistId } = useParams();
  const currentPlaylist = playlists[playlistId]

  useEffect(() => {
    dispatch(getOnePlaylistWithSongs(playlistId))
  }, [playlistId])

  // Implement another guard clause where no playlists are found?
  if (!currentPlaylist) return <div>Loading...</div>

  if (!currentPlaylist.Songs) return <div>Loading...</div>
  const songIds = Object.keys(currentPlaylist.Songs)
  console.log('songIds are ', songIds)

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
    <div>
      <div>
        <img className='playlist-img' src={currentPlaylist.imageUrl} alt={`${currentPlaylist.name} Img`} />
      </div>
      <button onClick={needToImplement}>Edit</button>

      {/* Note: only render below if playlist owner matches session user */}
      <button onClick={needToImplement}>Delete</button>

      <button onClick={testAddSong}>Add song 1 to playlist</button>

      {
        songIds.map(songId => (<PlaylistSongCard key={`playlist${playlistId}-song${songId}`} songId={songId} />))
      }
    </div>
  );
};

export default SinglePlaylist;

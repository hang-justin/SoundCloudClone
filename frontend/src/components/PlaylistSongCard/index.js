import { useSelector } from "react-redux"


const PlaylistSongCard = ({ songId }) => {
  const songs = useSelector(state => state.songs)
  const song = songs[songId]
  console.log('PlaylistSongCard component rendering')
  

  // Put in a guard clause
  // if (!song) { run dispatch to retrieve song/songs}

  return (
    <div>
      <p>{song.title}</p>
      <p>{song.description}</p>
    </div>
  )

}

export default PlaylistSongCard

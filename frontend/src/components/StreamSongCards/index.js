import SongCard from "./SongCard";

import './StreamSongCards.css'

const StreamSongCards = ({songs, setOrToggleAudio}) => {
    return (
        songs.map((song) => <SongCard setOrToggleAudio={setOrToggleAudio} song={song} />)
    )
}

export default StreamSongCards;

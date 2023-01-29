import { useSelector } from "react-redux";
import SongCard from "./SongCard";

import './StreamSongCards.css'

const StreamSongCards = ({setOrToggleAudio}) => {
    const allSongs = useSelector(state => state.songs);
    const songIds = Object.keys(allSongs);

    return (
        <div className='song-cards-container'>
            {songIds.map((songId) =>
                <SongCard
                    key={songId}
                    setOrToggleAudio={setOrToggleAudio}
                    songId={songId}
                />
            )}
        </div>
    )
}

export default StreamSongCards;

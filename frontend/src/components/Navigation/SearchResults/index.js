import { useSelector } from 'react-redux';
import SearchResultCard from '../SearchResultCard';
import './SearchResults.css';

const SearchResults = ({ searchInput, setSearchInput }) => {
    const allSongs = useSelector(state => state.songs);

    const songIdSearchResults = [];

    if (searchInput === '') return;

    for (const songId in allSongs) {
        const song = allSongs[songId];
        if (song.title.toLowerCase().includes(searchInput.toLowerCase())) songIdSearchResults.push(songId);
    }

    // Search through artists and songs to search for names/titles
    //      that includes the searchInput props

    return (
        <div id='search-results' className='flx-col'>
            {
                songIdSearchResults.map(songId =>
                        <SearchResultCard key={songId} songId={songId} setSearchInput={setSearchInput}/>
                    )
            }

            {
                songIdSearchResults.length === 0 &&
                <div id='no-matches-found' className='flx-row-justify-align-ctr'>
                    No matches found
                </div>
            }
        </div>
    )
};

export default SearchResults;

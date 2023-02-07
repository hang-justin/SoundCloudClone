import { useState } from 'react';
import SearchButton from '../SearchButton';
import SearchResults from '../SearchResults';
import './SearchBar.css';

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('');

    return (
        <div id='search-bar' className='flx-row-align-ctr'>
            <input
                id='search-input'
                onChange={e => setSearchInput(e.target.value)}
                placeholder='Search'
                value={searchInput}
            />

            <SearchResults searchInput={searchInput} setSearchInput={setSearchInput}/>
            <SearchButton />
        </div>
    )
};

export default SearchBar;

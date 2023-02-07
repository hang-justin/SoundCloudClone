import { useState } from 'react';
import SearchButton from '../SearchButton';
import SearchResults from '../SearchResults';
import './SearchBar.css';

const SearchBar = () => {
    const [userSearchInput, setUserSearchInput] = useState('');

    return (
        <div id='search-bar' className='flx-row-align-ctr'>
            <input
                id='search-input'
                onChange={e => setUserSearchInput(e.target.value)}
                placeholder='Search'
                value={userSearchInput}
            />

            <SearchButton />
            <SearchResults searchInput={userSearchInput}/>
        </div>
    )
};

export default SearchBar;

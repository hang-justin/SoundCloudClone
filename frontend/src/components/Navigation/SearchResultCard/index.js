import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { onErrorImgCoverLoader } from '../../../utils';
import './SearchResultCard.css';

const SearchResultCard = ({ songId, setSearchInput }) => {
    const history = useHistory();
    const song = useSelector(state => state.songs[songId]);

    const navToSongPage = (e) => {
        history.push(`/${song.userId}/songs/${song.id}`);
        setSearchInput('');
    }

    return (
        <div className='search-result-card flx-row-align-ctr' onClick={navToSongPage}>
            <img
                src={song.imageUrl}
                className='search-result-card-img'
                onError={onErrorImgCoverLoader}
                alt='song-cover'
            />

            <span className='search-result-card__song-title'>
                {song.title}
            </span>
        </div>
    )
};

export default SearchResultCard;

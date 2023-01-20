import { useSelector } from 'react-redux';

import EditIcon from '../../EditIcon';
import DeleteIcon from '../../DeleteIcon'

import './EditPlaylistOptions.css'

const EditPlaylistOptions = ({ playlist }) => {
    const user = useSelector(state => state.session.user);

    // GUARD CLAUSE
    // Return empty div with no edit options if session user doesn't own playlist
    if (user.id !== playlist.userId) return <div id='edit-playlist-options' />

    return (
        <div id='edit-playlist-options'>
            <button className='edit-del-playlist-btns'>
                <EditIcon />
                <span className='edit-delete-playlist-btns-text'>
                    Edit
                </span>
            </button>

            <button className='edit-del-playlist-btns'>
                <DeleteIcon />
                <span className='edit-delete-playlist-btns-text'>
                    Delete
                </span>
            </button>

        </div>
    )
};

export default EditPlaylistOptions;

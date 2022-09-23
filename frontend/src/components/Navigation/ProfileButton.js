import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

const ProfileButton = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    if (!user) return;
    setShowMenu(true);
  };

  // useEffect hook for closing the menu
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logOut = async e => {
    e.preventDefault();
    dispatch(sessionActions.logOut())
      .then(() => history.push('/'));
  }

  return (
    <>
      <button id='user-profile-btn' onClick={() => openMenu()}>
        <div id='profile-button-user-icon'>
          <i className="fa-solid fa-user-ninja"></i>
        </div>
        <div id='profile-button-username'>
          {`${user.firstName} ${user.lastName}`}
        </div>
      </button>

      {
        showMenu && (
          <ul className='profile-dropdown'>
            {/* <li>{user.username}</li>
            <li>{user.email}</li> */}
            <div className='dropdown-selection' onClick={logOut}>
              <button id='dropdown-signout'>Sign Out</button>
            </div>
          </ul>
        )
      }
    </>
  );
};

export default ProfileButton;

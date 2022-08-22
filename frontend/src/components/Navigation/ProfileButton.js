import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

const ProfileButton = () => {
  const user = useSelector(state => state.session.user)
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

  const logOut = e => {
    e.preventDefault();
    dispatch(sessionActions.logOut());
  }

  return (
    <>
      <button onClick={() => openMenu()}>
        <i class="fa-solid fa-user-ninja"></i>
      </button>

      {
        showMenu && (
          <ul className='profile-dropdown'>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={(e) => logOut(e)}>Log Out</button>
            </li>
          </ul>
        )
      }
    </>
  );
};

export default ProfileButton;

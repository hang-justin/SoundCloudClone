import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";

import './Navigation.css';

const Navigation = () => {
  let user = useSelector(state => state.session.user)

  let navlinks = [
    <LoginFormModal />,
    <NavLink className='header__navlink' to='/signup'>Create Account</NavLink>
  ];

  return (
    <header className='nav-header'>
      <div className='nav-container-outer nav-containers'>

        <div className='nav-container-left nav-containers'>

          <div className='left-navlink-container-icon'>
            <NavLink className='header__navlink container-left-navlink' to='/'>
              <div className='navlink-div nav-container-left nav-icon' key='nav-home'>Icon</div>
            </NavLink>
          </div>

          <div className='left-navlink-container-text'>
            <NavLink className='header__navlink container-left-navlink' to='/'>
              <div className='navlink-div nav-container-left nav-text' key='nav-home'>Home</div>
            </NavLink>
          </div>

          <div className='left-navlink-container-text'>
            <NavLink className='header__navlink container-left-navlink' to='/stream'>
              <div className='navlink-div nav-container-left nav-text' key='nav-stream'>Stream</div>
            </NavLink>
          </div>

          <div className='left-navlink-container-text'>
            <NavLink className='header__navlink container-left-navlink' to='/you/library'>
              <div className='navlink-div nav-container-left nav-text' key='nav-library'>Library</div>
            </NavLink>
          </div>

        </div>

        <div className='nav-container-middle nav-containers'>
          <div className='search-container'>Search is only for premium users.</div>
        </div>

        <div className='nav-container-right nav-containers'>
          <NavLink className='header__navlink' to='/upload'><div className='navlink-div' key='nav-upload'>Upload</div></NavLink>
          {user && <ProfileButton />}
          {!user && navlinks}
        </div>

      </div>
    </header>
  );
}

export default Navigation;

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignUpFormPage";

import './Navigation.css';

const Navigation = () => {
  let user = useSelector(state => state.session.user)

  let navlinks = [
    <LoginFormModal />,
    <SignUpFormModal />
  ];

  return (
    <header className='nav-header'>
      <div className='nav-container-outer'>

        <div className='nav-container-left nav-containers'>

          <div className='left-navlink-container-icon'>
            <NavLink className='header__navlink container-left-navlink' to='/'>
              <div className='navlink-div nav-container-left nav-icon' key='nav-home'>
                <img className='nav-icon' src='https://i.imgur.com/4KoOMTr.png' alt='SonusNimbus Nav Icon' />
              </div>
            </NavLink>
          </div>

          <div className='left-navlink-container-text'>
            <NavLink className='header__navlink container-left-navlink' to='/'>
              <div className='navlink-div nav-container-left__nav-text' key='nav-home'>Home</div>
            </NavLink>
          </div>

          <div className='left-navlink-container-text'>
            <NavLink className='header__navlink container-left-navlink' to='/stream'>
              <div className='navlink-div nav-container-left__nav-text' key='nav-stream'>Stream</div>
            </NavLink>
          </div>

          <div className='left-navlink-container-text'>
            {/* <NavLink className='header__navlink container-left-navlink' to='/you/library'>
              <div className='navlink-div nav-container-left__nav-text' key='nav-library'>Library</div>
            </NavLink> */}
          </div>

        </div>

        <div className='nav-container-middle nav-containers'>
          <div className='search-container'></div>
        </div>

        <div className='nav-container-right nav-containers'>
          <div className='right-nav-links'>
            <NavLink className='header__navlink' to='/upload'><div className='navlink-div' key='nav-upload'>Upload</div></NavLink>
          </div>
          <div id='user-icon' className='right-nav-links'>
            <ProfileButton user={user}/>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Navigation;

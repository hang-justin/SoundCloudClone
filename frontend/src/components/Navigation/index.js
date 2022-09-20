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

  const onLinkStyle = {backgroundColor: 'black'}

  return (
    <header className='nav-header'>
      <div className='nav-container-outer'>

        <div className='nav-container-left nav-containers flx-row'>

            <NavLink id='nav-left-1' activeStyle={onLinkStyle} className='header__navlink nav-container-left__navlink' to='/'>
                <img className='nav-icon' src='https://i.imgur.com/ll6sl5v.png' alt='SonusNimbus Nav Icon' />
            </NavLink>

            <NavLink id='nav-left-2' activeStyle={onLinkStyle} className='header__navlink nav-container-left__navlink' style={{display:'none'}} to='/discover'>
              Discover
            </NavLink>

            <NavLink id='nav-left-3' activeStyle={onLinkStyle} className='header__navlink nav-container-left__navlink' to='/stream'>
              Stream
            </NavLink>

            <NavLink id='nav-left-4' activeStyle={onLinkStyle} className='header__navlink nav-container-left__navlink' style={{display:'none'}} to='/you/library'>
              Library
            </NavLink>

        </div>

        <div className='nav-container-middle nav-containers flx-row'>
          <div className='search-container'></div>
        </div>

        <div className='nav-container-right nav-containers flx-row'>

          <NavLink id='nav-right-1' activeStyle={onLinkStyle} className='header__navlink nav-container-right-items flx-row' to='/upload'>
              Upload
          </NavLink>

          <div id='nav-right-2' className='nav-container-right-items flx-row'>
            <ProfileButton user={user}/>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Navigation;

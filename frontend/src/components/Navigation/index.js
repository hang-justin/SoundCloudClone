import logoImg from '../../img/logo.png';
import { onErrorImgCoverLoader } from '../../utils';

import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignUpFormPage";

import './Navigation.css';
import SearchBar from './SearchBar';

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
                <img
                  src={logoImg}
                  className='nav-icon'
                  onError={onErrorImgCoverLoader}
                  alt='SonusNimbus Nav Icon'
                />
            </NavLink>

            <NavLink id='nav-left-2' activeStyle={onLinkStyle} className='header__navlink nav-container-left__navlink' style={{display:'none'}} to='/discover'>
              Discover
            </NavLink>

            <NavLink id='nav-left-3' activeStyle={onLinkStyle} className='header__navlink nav-container-left__navlink' to='/stream'>
              Stream
            </NavLink>

            <NavLink id='nav-left-4' activeStyle={onLinkStyle} className='header__navlink nav-container-left__navlink' to='/you/library'>
              Library
            </NavLink>

        </div>

        <div className='nav-container-middle nav-containers flx-row'>
          <SearchBar />
        </div>

        <div className='nav-container-right nav-containers flx-row'>

        {user &&
          <NavLink id='nav-right-1' activeStyle={onLinkStyle} className='header__navlink nav-container-right-items flx-row' to='/upload'>
              Upload
          </NavLink>
        }

        {user &&
          <div id='nav-right-2' className='nav-container-right-items flx-row'>
            <ProfileButton user={user}/>
          </div>
        }

        {!user &&
            <div className='navbar__guest-btns flx-row'>
              {navlinks}
            </div>
        }

        </div>

      </div>
    </header>
  );
}

export default Navigation;

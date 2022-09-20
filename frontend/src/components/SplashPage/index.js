

import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormPage';
import Carousel from './Carousel';
import SplashSongCards from './SplashSongCards';

import './SplashPage.css';

const SplashPage = ({ setOrToggleAudio }) => {
  const history = useHistory();

  return (
    <div id='splash'>

      <div className='banner-top-offset'></div>

      <div id='splash-banner' className='splash-container'>
        <Carousel />

        <div className='splash-navbar'>
          <div className='navbar-logo'>
            <img className='splash-nav-logo' src='https://i.imgur.com/KUkoKgS.png' alt='SonusNimbus Splash Icon' />

          </div>

          <div className='account-btns'>
            <div className='account-btn-wrappers' id='splash-login-btn'>
              <LoginFormModal />
            </div>

            <div className='account-btn-wrappers' id='splash-signup-btn'>
              <SignUpFormModal />
            </div>
          </div>
        </div>

      </div>

      <div className='splash-middle flx-row'>
        <h2>Hear what’s trending for free in the SonusNimbus community</h2>
      </div>

      <SplashSongCards setOrToggleAudio={setOrToggleAudio} />

    </div>
  )
}

export default SplashPage;

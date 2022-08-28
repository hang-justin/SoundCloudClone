

import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormPage';

import './SplashPage.css';

const SplashPage = () => {
  const history = useHistory();

  return (
    <div id='splash'>

      <div id='splash-banner'>
        <div className='splash-navbar'>
          <div className='navbar-logo'>LOGO</div>

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

    </div>
  )
}

export default SplashPage;

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../store/session';

import './LoginForm.css'

const LoginForm = ({ setShowModal }) => {
  const dispatch = useDispatch();

  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([]);
  const closeBtnImgSrc = 'https://i.imgur.com/1aSKStp.png';

  const setDemoCredentials = (e) => {
    e.preventDefault();
    setUsernameOrEmail('Gorillaz');
    setPassword('password');
  }

  const handleLogIn = (e) => {
    e.preventDefault();
    setErrors([]);

    const loginInfo = {
      credential: usernameOrEmail,
      password
    }

    // Question: Need to verify what data & data.errors are
    // is it an array?
    return dispatch(logIn(loginInfo))
      .catch(async (res) => {
        const data = await res.json();
        console.log('data from invalid login: ', data)

        if (data && data.message) {
          setErrors([data.message])
        }
      });

  }

  return (
    <div className='login-form-wrapper flx-col'>
      <button onClick={() => setShowModal(false)}id='close-login-btn'><img id='close-login-img' src={closeBtnImgSrc} /></button>
      <h3 className='login-header'>Welcome back!</h3>
      <form id='login-form' className='form login-form flx-col' onSubmit={(e) => handleLogIn(e)}>

        {!!errors.length && <ul className='signin-errors'>
          {errors.map((error, idx) => <li className='signin-err-li' key={idx}>{error}</li>)}
        </ul>}

        <div className='input-fields-container flx-col'>
          <label className='login-input flx-col'>
            Username or Email
            <input
              className='signin-input'
              name='credential'
              type='text'
              placeholder='Username or Email'
              value={usernameOrEmail}
              onChange={e => setUsernameOrEmail(e.target.value)}
              required
            />
          </label>

          <label className='login-input'>
            Password
            <input
              className='signin-input'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
        </div>

        <button id='modal-submit-credentials' type='submit'>Sign In</button>
        <button id='demo-user' onClick={setDemoCredentials}>Demo user</button>
      </form>
    </div>
  );
}

export default LoginForm;

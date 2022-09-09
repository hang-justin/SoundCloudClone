import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../store/session';

import './LoginForm.css'

const LoginForm = () => {
  const dispatch = useDispatch();

  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([]);

  const setDemoCredentials = (e) => {
    e.preventDefault();
    setUsernameOrEmail('demo');
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
    <div className='login-form-div-wrapper'>

      <form id='login-form' onSubmit={(e) => handleLogIn(e)}>

        {!!errors.length && <ul className='signin-errors'>
          {errors.map((error, idx) => <li className='signin-err-li' key={idx}>{error}</li>)}
        </ul>}

        <label className='login-input'>
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

        <button id='modal-submit-credentials' type='submit'>Sign In</button>
        <button id='demo-user' onClick={setDemoCredentials}>Demo user</button>
      </form>
    </div>
  );
}

export default LoginForm;

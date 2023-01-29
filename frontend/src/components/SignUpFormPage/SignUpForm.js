import cancelBtnImg from '../../img/cancel-btn.png';
import { onErrorImgCoverLoader } from '../../utils';

import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

import './SignUpForm.css';

const SignUpForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.session.user)
  if (user) history.push('/');


  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors(['Passwords must match']);
      return;
    }

    setErrors([]);

    const signUpInfo = {
      email,
      username,
      password,
      firstName,
      lastName
    };

    dispatch(sessionActions.signUp(signUpInfo))
      .then((user) => {
        // append firstName and lastName here so no need to run another dispatch for user info
        user.firstName = firstName;
        user.lastName = lastName;
        return user;
      })
      .then((user) => dispatch(sessionActions.setUserSession(user)))
      .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors) setErrors(Object.values(data.errors));
      });
  };

  // need info = { email, username, password, firstName, lastName }
  return (
    <div id='signup-form-div-wrapper' className='flx-col'>
      <button
        onClick={() => setShowModal(false)}
        id='close-login-btn'
      >
        <img
          id='close-login-img'
          src={cancelBtnImg}
          onError={onErrorImgCoverLoader}
          alt='close'
        />
      </button>

      <h2 className='signup-header'>Create your SonusNimbus account</h2>
      <form id='signup-form' onSubmit={handleSignUp}>


        {!!errors.length && <ul className='signup-errors'>
          {errors.map((error, idx) => <li className='signup-err-li' key={idx}>{error}</li>)}
        </ul>}

        <div className='input-fields-container flx-col'>
          <label className='signup-label flx-col'>
            <div>Email</div>
            <input
              className='signupform-input'
              id='signup-email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className='signup-label flx-col'>
            <div>Username</div>
            <input
              className='signupform-input'
              id='signup-username'
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label className='signup-label flx-col'>
            <div>Password</div>
            <input
              className='signupform-input'
              id='signup-password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label className='signup-label flx-col'>
            <div>Confirm Password</div>
            <input
              className='signupform-input'
              id='signup-confirm_password'
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          <label className='signup-label flx-col'>
            <div>First Name</div>
            <input
              className='signupform-input'
              id='signup-first_name'
              type='text'
              placeholder='First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>

          <label className='signup-label flx-col'>
            <div>Last Name</div>
            <input
              className='signupform-input'
              id='signup-last_name'
              type='text'
              placeholder='Last Name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
        </div>

        <button id='create-account-btn' type='submit'>Create Account</button>

      </form>
    </div>
  );
}

export default SignUpForm;

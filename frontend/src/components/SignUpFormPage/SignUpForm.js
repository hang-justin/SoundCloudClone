import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session'

import './SignUpForm.css';

const SignUpForm = () => {
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

    if (password === confirmPassword) {
      setErrors([]);

      const signUpInfo = {
        email,
        username,
        password,
        firstName,
        lastName
      };

      return dispatch(sessionActions.signUp(signUpInfo))
        .catch(async (res) => {
          const data = await res.json();
          console.log('data from error catcher', data)
          if (data && data.errors) setErrors(Object.values(data.errors));
        });
    };

    return setErrors(['Passwords must match'])
  };

  // need info = { email, username, password, firstName, lastName }
  return (
    <div id='signup-form-div-wrapper'>
      <form id='signup-form' onSubmit={handleSignUp}>

        {errors.map((error, idx) => <div className='signup-err-div' key={idx}>{error}</div>)}

        <label className='signup-label'>
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

        <label className='signup-label'>
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

        <label className='signup-label'>
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

        <label className='signup-label'>
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

        <label className='signup-label'>
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

        <label className='signup-label'>
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

        <button id='create-account-btn' type='submit'>Create Account</button>

      </form>
    </div>
  );
}

export default SignUpForm;

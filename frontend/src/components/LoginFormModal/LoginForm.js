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

  // Testing purposes: Ease for testing log in and log outs
  useEffect(() => {
    setUsernameOrEmail('demo');
    setPassword('password');
  }, [dispatch])

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

    <form onSubmit={(e) => handleLogIn(e)}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>

      <label> Username or Email:
        <input
          name='credential'
          type='text'
          placeholder='Username or Email'
          value={usernameOrEmail}
          onChange={e => setUsernameOrEmail(e.target.value)}
          required
        />
      </label>

      <label>Password :
        <input
          name='password'
          type='text'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>

      <button type='submit'>GET IN THE CHOPPA</button>
    </form>
  );
}

export default LoginForm;

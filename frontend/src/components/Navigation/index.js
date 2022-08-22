import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";

import './Navigation.css';

const Navigation = () => {
  let user = useSelector(state => state.session.user)

  let navlinks = [
    <li key='logInPage'><NavLink to='/login'>Log In</NavLink></li>,
    <li key='signUpPage'><NavLink to='/signup'>Sign Up</NavLink></li>
  ];

  return (
    <ul className='Navigation'>
      <li key='home'><NavLink to='/'>Home</NavLink></li>
      {user && <ProfileButton />}
      {!user && navlinks}
    </ul>
  );
}

export default Navigation;

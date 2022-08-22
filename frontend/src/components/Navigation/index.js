import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";

import './Navigation.css';

const Navigation = () => {
  let user = useSelector(state => state.session.user)

  let navlinks = [
    <LoginFormModal />,
    <NavLink to='/signup'>Sign Up</NavLink>
  ];

  return (
    <ul className='Navigation'>
      <li key='nav'><NavLink to='/'>Home</NavLink>
        {user && <ProfileButton />}
        {!user && navlinks}
      </li>
    </ul>
  );
}

export default Navigation;

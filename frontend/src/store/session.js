import { removeListenHistory } from "./audioPlayer";
import { csrfFetch } from "./csrf";

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

// user is an obj with
// id, email, username
export const setUserSession = (user) => {
  return {
    type: SET_USER,
    user
  };
};

// loginInfo obj passed into thunk below expects
// { credential, password }
export const logIn = (loginInfo) => async dispatch => {
  let response = await csrfFetch('/api/session',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginInfo)
    });

  if (response.ok) {
    // user is an obj containing
    // id, firstName, lastName, email, username, token
    let user = await response.json();
    let userInfo = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    }
    dispatch(setUserSession(userInfo));
  };
  // Question: Should this function be returning a response here? Is it going to be needed?
};

export const logOut = () => async dispatch => {
  let response = await csrfFetch('/api/session', {
    method: 'DELETE'
  })

  dispatch(removeUser());
  dispatch(removeListenHistory());
}


export const restoreSession = () => async dispatch => {
  // fetch returns user obj or an empty obj
  // Refactor: set timeout in case server is down
  let response = await csrfFetch('/api/session')
    .catch((response) => response)
  if (!response.ok) return null;

  let user = await response.json();

  // retrieve keys and check length to check if obj is empty
  // set user to null for valid state.user structure set up
  // in dispatch(setUserSession(user))
  if (Object.keys(user).length === 0) user = null;
  if (user === null) dispatch(setUserSession(user))

  let userInfo = {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName
  }

  dispatch(setUserSession(userInfo))

  // Refactor: See if return value is used anywhere
  // if not, return null
  return user;
}

export const signUp = (signUpInfo) => async dispatch => {
  // signUpInfo = { firstName, lastName, username, email, password }
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signUpInfo)
  })



  // data = { id, firstName, lastName, username, email, token }
  let data = await response.json();

  // destructure to retrieve needed info to pass into actionCreator
  let { id, email, username } = data;
  let user = { id, email, username }
  // await dispatch(setUserSession(user))

  // Refactor: See if return value is used anywhere
  // if not, return null
  return user;
}

export const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {

    case SET_USER:
      newState.user = action.user;
      return newState;

    case REMOVE_USER:
      newState.user = null;
      return newState;

    default: return state;
  };
};

export default sessionReducer;

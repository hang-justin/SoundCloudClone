import { csrfFetch } from "./csrf";

const GET_CURRENT_SESSION_PLAYLISTS = 'playlists/GET_CURRENT_USER_PLAYLIST';

const setCurrentUserPlaylists = (payload) => {
  let playlists = {};
  payload.forEach( singlePlaylist => playlists[singlePlaylist.id] = singlePlaylist)
  return {
    type: GET_CURRENT_SESSION_PLAYLISTS,
    playlists
  }
}

export const getCurrentUserPlaylists = () => async dispatch => {
  // returns 404 if user doesn't have any playlists
  // TEST: test for response where use doesn't have any playlists
  let response = await csrfFetch('/api/playlists/current')
    .catch(async (res) => {
      const data = await res.json();

      return data.message;
    })
  console.log(response)

  if (response === 'No playlists found.') return response;

  // data is an ojbect
  // data.Playlists is an array
  let data = await response.json();
  console.log('data is ', data)
  console.log('data.Playlists is ', data.Playlists)
  dispatch(setCurrentUserPlaylists(data.Playlists));

  return data;
}

const initialState = { currentUser: null };

const playlistsReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case GET_CURRENT_SESSION_PLAYLISTS:
      newState.currentUser = action.playlists;
      return newState;

    default: return state;
  }
}

export default playlistsReducer;

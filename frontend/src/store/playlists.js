import { csrfFetch } from "./csrf";

const GET_CURRENT_SESSION_PLAYLISTS = 'playlists/GET_CURRENT_USER_PLAYLIST';
const GET_SINGLE_PLAYLIST_WITH_SONGS = 'playlists/GET_SINGLE_PLAYLIST_WITH_SONGS';

const setCurrentUserPlaylists = (payload) => {
  let playlists = {};
  payload.forEach(singlePlaylist => playlists[singlePlaylist.id] = singlePlaylist)
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

  if (response === 'No playlists found.') return response;

  // data is an ojbect
  // data.Playlists is an array
  let data = await response.json();

  dispatch(setCurrentUserPlaylists(data.Playlists));

  return data;
}

const setCurrentPlaylistBeingViewed = (playlist) => {
  return {
    type: GET_SINGLE_PLAYLIST_WITH_SONGS,
    playlist
  }
}

export const getOnePlaylistWithSongs = (playlistId) => async dispatch => {
  let response = await csrfFetch(`/api/playlists/${playlistId}`)
  // .then(res => res.json())

  let playlist;
  if (response.ok) {
    playlist = await response.json();
  }

  dispatch(setCurrentPlaylistBeingViewed(playlist))
}

const initialState = { currentUser: null };

const playlistsReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case GET_CURRENT_SESSION_PLAYLISTS:
      newState.currentUser = action.playlists;
      return newState;

    case GET_SINGLE_PLAYLIST_WITH_SONGS:
      newState.currentPlaylist = action.playlist;
      return newState;

    default: return state;
  }
}

export default playlistsReducer;

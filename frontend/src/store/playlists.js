import { loadArtistPlaylist } from "./artists";
import { csrfFetch } from "./csrf";

const LOAD_USER_PLAYLISTS = 'playlists/LOAD_USER_PLAYLIST';
const LOAD_SINGLE_PLAYLIST_WITH_SONGS = 'playlists/LOAD_SINGLE_PLAYLIST_WITH_SONGS';

export const addSongToPlaylist = (playlistId, songId) => async dispatch => {
  console.log('hi')

  let response = await csrfFetch(`/api/playlists/${playlistId}/songs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ songId })
  })

  if (response.ok) {
    let data = await response.json();
    console.log(data);
  }

}

const loadCurrentUserPlaylists = (payload) => {
  let playlists = {};
  console.log('playlists are : ', payload)
  payload.forEach(singlePlaylist => playlists[singlePlaylist.id] = singlePlaylist)
  return {
    type: LOAD_USER_PLAYLISTS,
    playlists
  }
}

export const getCurrentUserPlaylists = () => async dispatch => {
  // returns 404 if user doesn't have any playlists
  // TEST: test for response where use doesn't have any playlists

  // Question: How should I be handling this?
  let response = await csrfFetch('/api/playlists/current')
    .catch(async (res) => {
      const data = await res.json();

      return data.message;
    })

  if (response === 'No playlists found.') {
    dispatch(loadCurrentUserPlaylists([]));
    return;
  }

  // data is an ojbect
  // data.Playlists is an array
  console.log('data before json is is ', response)
  let data = await response.json();
  console.log('data returned after json is ', data.Playlists)


  // Attach playlist ids to the artist slice of state
  await dispatch(loadArtistPlaylist(data.Playlists));
  console.log('whoa whoa whoa')
  // Populate the playlist slice of state
  await dispatch(loadCurrentUserPlaylists(data.Playlists));

  return data;
}

const loadPlaylistWithSongs = (playlist) => {
  return {
    type: LOAD_SINGLE_PLAYLIST_WITH_SONGS,
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

  await dispatch(loadPlaylistWithSongs(playlist))
}

const initialState = { currentUser: null };

const playlistsReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case LOAD_USER_PLAYLISTS:
      console.log('action.playlists is ', action.playlists)
      for (let songId in action.playlists) {
        newState[songId] = action.playlists[songId]
      }

      // action.playlists.forEach(playlist => {
      //   newState[playlist.id] = playlist
      // })
      return newState;

    case LOAD_SINGLE_PLAYLIST_WITH_SONGS:
      const songs = {}
      action.playlist.Songs.forEach(song => {
        songs[song.id] = song.id
      })
      action.playlist.Songs = songs
      newState[action.playlist.id] = action.playlist;
      return newState;

    default: return state;
  }
}

export default playlistsReducer;

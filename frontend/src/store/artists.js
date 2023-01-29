import { csrfFetch } from './csrf';

const GET_ARTIST_DETAILS = 'users/GET_ARTIST_DETAILS';
const LOAD_ARTIST_PLAYLISTS = 'artists/LOAD_ARTIST_PLAYLISTS';
const LOAD_ARTIST_NO_PLAYLISTS = 'artists/LOAD_ARTIST_NO_PLAYLISTS';
const LOAD_NEW_PLAYLIST = 'artists/LOAD_NEW_PLAYLIST';
const DELETE_PLAYLIST_FROM_ARTIST = 'artists/DELETE_PLAYLIST_FROM_ARTIST';
const CLEAR_ARTIST_PLAYLISTS = 'artists/CLEAR_ARTIST_PLAYLISTS';

const initialState = {};

export const loadNoPlaylists = (userId) => {
  return {
    type: LOAD_ARTIST_NO_PLAYLISTS,
    userId
  }
}

export const clearUserPlaylists = (userId) => {
  return {
    type: CLEAR_ARTIST_PLAYLISTS,
    userId
  }
}

export const loadNewPlaylist = (playlistInfo) => {
  return {
    type: LOAD_NEW_PLAYLIST,
    playlistInfo
  }
}

const loadArtist = (artist) => {
  return {
    type: GET_ARTIST_DETAILS,
    artist
  }
}

export const loadArtistPlaylist = (playlists) => {
  return {
    type: LOAD_ARTIST_PLAYLISTS,
    playlists
  }
}

export const getTheseArtists = (artistIds) => async dispatch => {
  // Note: handle errors
  // this could take in an array or a int

  if (typeof artistIds === 'number') artistIds = [artistIds];
  let response;

  let count = 0;
  while (count < artistIds.length) {

    await csrfFetch(`/api/users/${artistIds[count]}`)
      .then(res => res.json())
      .then(artist => dispatch(loadArtist(artist)));

    ++count;
  }
  return;
};

export const deletePlaylistFromArtist = (playlist) => {
  return {
    type: DELETE_PLAYLIST_FROM_ARTIST,
    playlist
  }
}

const artistsReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case GET_ARTIST_DETAILS:
      if (!state[action.artist.id]) state[action.artist.id] = {};
      newState[action.artist.id] = { ...state[action.artist.id], ...action.artist};
      return newState;

    case LOAD_ARTIST_PLAYLISTS:
      action.playlists.forEach(playlist => {
        if (!newState[playlist.userId]) newState[playlist.userId] = {}
        if (!newState[playlist.userId].playlists) newState[playlist.userId].playlists = {}
        newState[playlist.userId].playlists[playlist.id] = playlist.id
      })

      return newState;

    case LOAD_ARTIST_NO_PLAYLISTS:
      newState[action.userId].playlists = {};
      return newState;

    case LOAD_NEW_PLAYLIST:
      if (!newState[action.playlistInfo.userId].playlists) newState[action.playlistInfo.userId].playlists = {};

      newState[action.playlistInfo.userId].playlists[action.playlistInfo.id] = action.playlistInfo.id;
      return newState;

    case DELETE_PLAYLIST_FROM_ARTIST:
      delete newState[action.playlist.userId].playlists[action.playlist.id];
      return newState;

    case CLEAR_ARTIST_PLAYLISTS:
      if (newState[action.userId].playlists) delete newState[action.userId].playlists;
      return newState;

    default: return state;
  }
};

export default artistsReducer;

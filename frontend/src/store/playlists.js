import { loadArtistPlaylist } from "./artists";
import { csrfFetch } from "./csrf";

const LOAD_USER_PLAYLISTS = 'playlists/LOAD_USER_PLAYLIST';
const LOAD_SINGLE_PLAYLIST_WITH_SONGS = 'playlists/LOAD_SINGLE_PLAYLIST_WITH_SONGS';
const ADD_SONG_TO_PLAYLIST = 'playlists/ADD_SONG_TO_PLAYLIST'
const REMOVE_SONG_FROM_PLAYLIST = 'playlists/REMOVE_SONG_FROM_PLAYLIST'

const addSongToPlaylistStore = (playlistSong) => {
  // playlistSong = { playlistId, songId, updatedAt, createdAt }

  return {
    type: ADD_SONG_TO_PLAYLIST,
    songId: playlistSong.songId,
    playlistId: playlistSong.playlistId
  }

}

export const addSongToPlaylist = (songId, playlistId) => async dispatch => {

  let response = await csrfFetch(`/api/playlists/${playlistId}/songs/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ songId })
  })

  if (response.ok) {
    let playlistSong = await response.json();
    // console.log('successful response from adding playlist... need to update store next');
    // console.log(playlistSong)
    dispatch(addSongToPlaylistStore(playlistSong))
  }

}

const removeSongFromPlaylistStore = (songId, playlistId) => {

  return {
    type: REMOVE_SONG_FROM_PLAYLIST,
    songId,
    playlistId
  }
}

export const deleteSongFromPlaylist = (songId, playlistId) => async dispatch => {

  let response = await csrfFetch(`/api/playlists/${playlistId}/songs/delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ songId })
  })

  if (response.ok) {
    let data = await response.json();
    // console.log('data from remove song from playlist: ', data)
    dispatch(removeSongFromPlaylistStore(songId, playlistId))
  }
}

const loadCurrentUserPlaylists = (payload) => {
  let playlists = {};
  // console.log('playlists are : ', payload)
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
  // console.log('data before json is is ', response)
  let data = await response.json();
  // console.log('data returned after json is ', data.Playlists)


  // Attach playlist ids to the artist slice of state
  await dispatch(loadArtistPlaylist(data.Playlists));
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

      // Rewrite playlist.Songs to only include the id rather than the entire song object
      for (let playlistId in action.playlists) {
        action.playlists[playlistId].songs = {};

        action.playlists[playlistId].Songs.forEach( song => {
          action.playlists[playlistId].songs[song.id] = song.id
        })

        delete action.playlists[playlistId].Songs;
        newState[playlistId] = action.playlists[playlistId]
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
      action.playlist.songs = songs
      delete action.playlist.Songs
      // action.playlist.Songs = songs
      newState[action.playlist.id] = action.playlist;
      return newState;

    case ADD_SONG_TO_PLAYLIST:
      newState[action.playlistId].songs[action.songId] = action.songId;
      return newState;

    case REMOVE_SONG_FROM_PLAYLIST:
      delete newState[action.playlistId].songs[action.songId];
      return newState;

    default: return state;
  }
}

export default playlistsReducer;

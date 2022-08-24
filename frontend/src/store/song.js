import { csrfFetch } from "./csrf";

import { getTheseArtists } from "./artists";

const CREATE_SONG = 'songs/CREATE_SONG';
const GET_ALL_SONGS = 'songs/GET_ALL_SONGS';

const createSong = (song) => {
  return {
    type: CREATE_SONG,
    song
  }
}

export const uploadSong = (song) => async dispatch => {

  // If no input is passed into the form, set to null
  // Otherwise, will fail FK constraints in DB
  if (!song.description) song.description = null;
  if (!song.imageUrl) song.imageUrl = null;
  if (!song.albumId) song.albumId = null;

  let response = await csrfFetch('/api/songs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(song)
  });

  if (response.ok) {
    let song = await response.json();
    // song = song obj

    dispatch(createSong(song))

    return song;
  }

}

const getAllSongs = (songs) => {
  return {
    type: GET_ALL_SONGS,
    songs
  }
}

export const fetchAllSongs = () => async dispatch => {
  // Note: implement error handlers in fetch
  let response = await csrfFetch('/api/songs')

  // Note, will we have to handle errors for below?
  //  - Thinking no, because of conditional
  let data;
  if (response.ok) {
    data = await response.json();
    // data = { Songs : songArr, page, size }
    let songs = {};
    let uniqueArtists = {};
    data.Songs.map((songOjb) => {
      uniqueArtists[songOjb.userId] = songOjb.userId;
      return songs[songOjb.id] = songOjb
    })

    let artistIds = Object.values(uniqueArtists);
    dispatch(getTheseArtists(artistIds))
      .then(() => dispatch(getAllSongs(songs)))
  }

}

const initialState = {};

const songsReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case CREATE_SONG:
      newState[action.song.id] = action.song;
      return newState;

    case GET_ALL_SONGS:
      newState = { ...newState, ...action.songs };
      return newState;

    default: return state;
  }

};

export default songsReducer;

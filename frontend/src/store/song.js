import { csrfFetch } from "./csrf";

const CREATE_SONG = 'songs/CREATE_SONG';

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

const initialState = {};

const songsReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case CREATE_SONG:
      newState[action.song.id] = action.song;
      return newState;

    default: return state;
  }

};

export default songsReducer;

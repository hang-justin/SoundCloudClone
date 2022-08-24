import { csrfFetch } from '../csrf';


const GET_ARTIST_DETAILS = 'users/GET_ARTIST_DETAILS';

const initialState = {};

const loadArtist = (artist) => {
  return {
    type: GET_ARTIST_DETAILS,
    artist
  }
}

export const getTheseArtists = (artistIds) => async dispatch => {
  // Note: handle errors

  if (typeof artistIds === 'number') artistIds = [artistIds];
  let response;

  let count = 0;
  while (count < artistIds.length) {

    response = await csrfFetch(`/api/users/${artistIds[count]}`)
      .then(res => res.json())
      .then(artist => dispatch(loadArtist(artist)));

    ++count;
  }
  return;
};

const artistsReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case GET_ARTIST_DETAILS:
      newState[action.artist.id] = action.artist;
      return newState;

    default: return state;
  }
};

export default artistsReducer;

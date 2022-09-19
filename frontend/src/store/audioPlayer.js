const SET_CURRENT_TRACK = 'audioPlayer/SET_CURRENT_TRACK';

export const setActiveTrack = (track) => {
  return {
    type: SET_CURRENT_TRACK,
    currentTrack: track
  };
};

const initialState = {};

const audioPlayerReducer = (state = initialState, action) => {
  let newState = {};

  switch(action.type) {
    case SET_CURRENT_TRACK:
      newState = {...state};
      newState.currentTrack = action.currentTrack;
      return newState;

      default: return state;
  }
}

export default audioPlayerReducer;

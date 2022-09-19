const SET_CURRENT_TRACK = 'audioPlayer/SET_CURRENT_TRACK';
const IS_PLAYING = 'audioPlayer/IS_PLAYING';

export const setActiveTrack = (track) => {
  return {
    type: SET_CURRENT_TRACK,
    currentTrack: track
  };
};

export const isPlaying = (isPlaying) => {
  return {
    type: IS_PLAYING,
    isPlaying
  }
}

const initialState = {};

const audioPlayerReducer = (state = initialState, action) => {
  let newState = {};

  switch(action.type) {
    case SET_CURRENT_TRACK:
      newState = {...state};
      newState.currentTrack = action.currentTrack;
      return newState;

    case IS_PLAYING:
      newState = {...state};
      newState.isPlaying = action.isPlaying;
      return newState;

    default: return state;
  }
}

export default audioPlayerReducer;

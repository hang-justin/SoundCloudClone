const SET_CURRENT_TRACK = 'audioPlayer/SET_CURRENT_TRACK';
const STOP_PLAYER = 'audioplayer/STOP_PLAYER';
const IS_PLAYING = 'audioPlayer/IS_PLAYING';
const REMOVE_LISTEN_HISTORY = 'audioPlayer/REMOVE_LISTEN_HISTORY';
const CLEAR_PLAYLIST = 'audioPlayer/CLEAR_PLAYLIST';

export const clearPlaylist = (playlistId) => {
  return {
    type: CLEAR_PLAYLIST,
    playlistId
  }
}

export const setActiveTrack = (track, playlist) => {
  return {
    type: SET_CURRENT_TRACK,
    currentTrack: track,
    currentPlaylist: playlist
  };
};

export const stopPlayer = () => {
  return {
    type: STOP_PLAYER
  }
}

export const isPlaying = (isPlaying) => {
  return {
    type: IS_PLAYING,
    isPlaying
  }
}

export const removeListenHistory = () => {
  return {
    type: REMOVE_LISTEN_HISTORY
  }
}

const initialState = {};

const audioPlayerReducer = (state = initialState, action) => {
  let newState = {};

  switch(action.type) {
    case SET_CURRENT_TRACK:
      newState = {...state};
      newState.currentTrack = action.currentTrack;

      if (!newState.history) newState.history = [action.currentTrack.id];
      else {
        const lastSongIdPlayed = newState.history[newState.history.length - 1];
        if (lastSongIdPlayed !== action.currentTrack.id) {
          newState.history = [...newState.history];
          newState.history.push(action.currentTrack.id);
        }
      }

      if (!!action.currentPlaylist) {
        newState.currentPlaylist = { id: action.currentPlaylist.id}
      } else {
        newState.currentPlaylist = null;
      }

      return newState;

    case CLEAR_PLAYLIST:
      if (newState.currentPlaylist && newState.currentPlaylist.id === action.playlistId) {
        newState.currentPlaylist = null;
      }

      return newState;

    case STOP_PLAYER:
      newState = { ... state };
      newState.currentTrack = null;
      newState.currentPlaylist = null;
      return newState;

    case IS_PLAYING:
      newState = {...state};
      newState.isPlaying = action.isPlaying;
      return newState;

    case REMOVE_LISTEN_HISTORY:
      newState = {};
      return newState;

    default: return state;
  }
}

export default audioPlayerReducer;

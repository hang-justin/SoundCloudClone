import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import playlistsReducer from './playlists';
import sessionReducer from './session';
import songsReducer from './song';
import artistsReducer from './artists';
import audioPlayerReducer from './audioPlayer';
import profilePicsReducer from './profilePics';

const rootReducer = combineReducers({
  session: sessionReducer,
  playlists: playlistsReducer,
  songs: songsReducer,
  artists: artistsReducer,
  audioPlayer: audioPlayerReducer,
  profilePics: profilePicsReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

import { csrfFetch } from "./csrf";

import { getTheseArtists } from "./artists";

const CREATE_SONG = 'songs/CREATE_SONG';
const GET_ALL_SONGS = 'songs/GET_ALL_SONGS';
const EDIT_SONG = 'songs/EDIT_SONG';
const DELETE_SONG = 'songs/DELETE SONG';
const LOAD_CURRENT_SONG = 'songs/LOAD_CURRENT_SONG';
const ADD_SONG_COMMENT = 'songs/ADD_SONG_COMMENT';
const DELETE_COMMENT_FROM_SONG = 'songs/DELETE_COMMENT_FROM_SONG';
const LOAD_ALL_COMMENTS_FOR_SONG = 'songs/LOAD_ALL_COMMENTS_FOR_SONG'

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
  if (!song.imageUrl) song.imageUrl = 'https://i.imgur.com/SGy16jl.jpg';
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

const loadCurrentSong = (song) => {
  return {
    type: LOAD_CURRENT_SONG,
    song
  }
}

const loadAllSongComments = (comments, songId) => {
  // comments should be an array of comment objs
  return {
    type: LOAD_ALL_COMMENTS_FOR_SONG,
    comments,
    songId
  }
}

export const getSongComments = (songId) => async dispatch => {
  let commentResponse = await csrfFetch(`/api/songs/${songId}/comments`);

  if (commentResponse.ok) {
    // json response below should return an array of commentObjs
    await commentResponse.json()
      .then(res => dispatch(loadAllSongComments(res, songId)))
  }
}

// We can save this code by renaming it to fetchCurrentSongWithComments
// For a (currently) unknown case where we access a song page
// and the song doesn't or has yet to exist in the redux store
export const fetchCurrentSongWithComments = (songId) => async dispatch => {

  let songResponse = await csrfFetch(`/api/songs/${songId}`)
    // .catch( async res => {
    //   const errMessage = await res.json();
    //   return errMessage;
    //   console.log('errMessage is :', errMessage)
    // })

    // The above is commented out so that an error can just be thrown and
    // handled in the Song component which just redirects to /404

  let commentResponse = await csrfFetch(`/api/songs/${songId}/comments`);

  if (songResponse.ok && commentResponse.ok) {
    let song;

    const getUniqueCommenters = (arrayOfCommentObjs) => {
      let uniqueCommenters = [];
      arrayOfCommentObjs.forEach(commentObj => {
        if (uniqueCommenters.includes(commentObj.userId)) return;

        uniqueCommenters.push(commentObj.userId);
      });

      return uniqueCommenters;
    }

    // Old comments directly below. See comment block below this one for updates
    // Retrieves current song view and song's details
    // Then retrieves each commenters/artists details
    // Specifically to retrieve their username for display
    // Then writes the username into the artist slice of state for username retrieval

    // Below was to get the commenters username by sending a fetch request to
    // api/users/:artistId
    // BUT it should now be handled in the Comments comp rendered in the Song comp
    // Comments comp sends a dispatch to retrieve artist for their username
    // So we shouldn't need the below to be so complex and should just
    // return the song
    //    So second to then chain can be removed

    await songResponse.json()
      .then(res => song = res)
      .then(() => commentResponse.json())
      .then(comments => song.comments = comments)
      // .then((arrayOfCommentObjs) => dispatch(getTheseArtists(getUniqueCommenters(arrayOfCommentObjs))))
      .then(() => dispatch(loadCurrentSong(song)));
  }

  // Note: Be mindful of chaining multiple fetches after another
  // What if we get the song successfully but comments fail for some reason?
  //  Would want to display song still, but how would we handle comments error?

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

const loadSongEdits = (song) => {
  return {
    type: EDIT_SONG,
    song
  }
}

export const editSongRequest = (song) => async dispatch => {
  // Note: Need to handle errors here

  if (!song.imageUrl) song.imageUrl = 'https://i.imgur.com/SGy16jl.jpg';

  let response = await csrfFetch(`/api/songs/${song.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(song)
  })

  if (response.ok) {
    let newSong = await response.json();
    dispatch(loadSongEdits(newSong));
  }

}

const deleteSong = (songId) => {
  return {
    type: DELETE_SONG,
    songId
  };
};

export const deleteTrack = (songId) => async dispatch => {
  let response = await csrfFetch(`/api/songs/${songId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    dispatch(deleteSong(songId));
  }
}

const loadSongComment = comment => {
  return {
    type: ADD_SONG_COMMENT,
    comment
  }
}

export const addCommentToSongReq = (songId, comment) => async dispatch => {
  let response = await csrfFetch(`/api/songs/${songId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ body: comment })
  })

  // Note: handle errors

  if (response.ok) {
    await response.json()
      .then(res => dispatch(loadSongComment(res)));
  }
}

const deleteComment = (comment, commentIndex) => {
  return {
    type: DELETE_COMMENT_FROM_SONG,
    comment,
    commentIndex
  }
}

export const deleteCommentFromSongReq = (comment, commentIndex) => async dispatch => {
  let response = await csrfFetch(`/api/comments/${comment.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    dispatch(deleteComment(comment, commentIndex))
  }
}

const initialState = {};

const songsReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case CREATE_SONG:
      newState[action.song.id] = action.song;
      return newState;

    case ADD_SONG_COMMENT:
      newState[action.comment.songId].comments.push(action.comment)
      return newState;

    case LOAD_CURRENT_SONG:
      newState[action.song.id] = action.song;
      return newState;

    case GET_ALL_SONGS:
      newState = { ...newState, ...action.songs };
      return newState;

    case EDIT_SONG:
      newState[action.song.id] = action.song;
      return newState;

    case DELETE_SONG:
      delete newState[action.songId];
      return newState;

    case DELETE_COMMENT_FROM_SONG:
      newState[action.comment.songId].comments.splice(action.commentIndex, 1);
      return newState;

      case LOAD_ALL_COMMENTS_FOR_SONG:
        newState[action.songId].comments = action.comments;
        return newState;

    default: return state;
  }

};

export default songsReducer;

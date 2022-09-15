import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

import { fetchCurrentSongWithComments, getSongComments } from "../../store/song";

import AddComment from "../AddComment";
import Comment from "../Comment";

import './Song.css';

// Note, we can hit /:userId/songs/current where :songId === current
//    and it will return a song obj with sessionUser's songs regardless of the userId wildcard
// HOWEVER:
// Hitting this endpoint will trigger the dispatch fetchCurrentSongsWithComments and throw
//    an error due to it trying to retrieve comments that belong to songId === 'current'

const Song = ({ toggleBtn, track, setTrack }) => {
  const { songId } = useParams();

  const dispatch = useDispatch();

  let songs = useSelector(state => state.songs);
  let artists = useSelector(state => state.artists)
  let user = useSelector(state => state.session.user)
  const [hasLoaded, setHasLoaded] = useState(false);
  const [songNotFound, setSongNotFound] = useState(false);

  if (songNotFound) {
    return (
      <Redirect to='/404' />
    )
  }

  // Guard clauses/loading divs for when navigating directly to
  //    songs/songId page
  // The fetchAllSongs in App.js's useEffect needs to run to populate
  //    redux store with initial songs and artists
  // Edge case: Trying to access a song page directly that isn't
  //    included in the fetchAllSongs, due to it being limited to 20 results
  // So need to put a conditional where songs exist AND songs[songId]
  //    doesn't exist, then needs to run a dispatch for that individual song

  let song = songs[songId];

  // Below guard clause is for when navigating to /artistId/songs/songId
  // and the songId isn't part of the initial fetchAllSongs in App.js so
  // a fetch request for an individual song must be made
  //    The Object.keys(songs).length indicates that the store has
  //    at least been loaded with some data and songId isn't
  //    in the store... Likely indicating that fetch must be made
  //
  // Also serves as an error handler for when navigating to the page
  // with an invalid songId and resulst in Song component rerender
  // with guard clause activating and redirecting to /404
  //
  // The err thrown comes from the fetch request

  // HELP: HOW TO GRACEFULLY HANDLE THE ERROR MESSAGE RETURNED FROM
  // TRYING TO ACCESS A SONG THAT DOESN'T EXIST

  if (Object.keys(songs).length > 0 && !song) {
    dispatch(fetchCurrentSongWithComments(songId))
      .catch(async errRes => {
        const errMessage = await errRes.json();
        console.log('errRes is :', errRes)
        console.log('errMessage json() is :', errMessage);
        // NOTE
        // perhaps we can pass the errMessage into the redirect
        // by setting songNotFound default to empty string
        // then put errMessage in songNotFound with errMessage string
      })
      .then(() => setSongNotFound(true))
  }

  if (!song) return <div>Loading...</div>
  if (!song.userId) return <div>Loading...</div>

  let artist = artists[song.userId];
  if (!artist) return <div>Loading...</div>

  if (isNaN(Number(songId))) {
    // Error seems to be caught above....
    // Keep this here for now IN CASE
    return (
      <Redirect to='/404' />
      )
    }

  // if song doesnt exist, need to dispatch fetchCurrentSongWithComments
  // if song.comments doesn't exist, dispatch getComments and attach
  //    comments onto song... => song to song.comments
  // shouldn't run into a scenario where song.id !== songId(params)
  //
  // Below code was for when attaching current song view to songs.current
  // instead of just attaching comments onto song obj
  //
  // if (!song || song.id !== Number(songId)) {

  //   if (hasLoaded) return <div>Uh oh... something went wrong.</div>

  //   dispatch(fetchCurrentSong(songId))
  //     .then(() => setHasLoaded(true));
  //   return <div>Loading...</div>
  // }

  if (!song.comments) {
    dispatch(getSongComments(songId))
    return <div>Loading...</div>
  }

  // array of objs
  let comments = [...song.comments];
  let commentsList = [];

  while (comments.length) {
    let commentInd = comments.length - 1;
    let comment = comments.pop();

    commentsList.push(
      <Comment key={comment.id} commentInd={commentInd} user={user} comment={comment} />
    )
  }

  const playTrack = () => {
    if (track === song) toggleBtn.click();
    else setTrack(song);
  }

  return (
    <div className='song-comp-container'>

      <div className='song-banner'>         {/* START OF SONG-BANNER  */}

        <div className='song-banner__left'>
          <div className='song-banner__left__top'>

            {/* <div className="play-button-container"> */}
              <button id='song-banner-toggle-play' onClick={playTrack}>
                <img id='song-component-toggle-play' src='https://cdn-icons-png.flaticon.com/512/73/73940.png' alt='toggle-play button' />
              </button>
            {/* </div> */}

            <div className='song-banner__top__song-info'>
              <div id='song-title'><span id='song-info__song-title'>{song.title}</span></div>
              <div id='song-artist'><span id='song-info__song-artist'>{artist.username}</span></div>
            </div>

          </div>

          <div className='song-banner__left__bottom'>
            <div className='song-waveform'>
              <img className='song-waveform-img' src='https://i.imgur.com/kcs5uEk.png' alt='waveform' />
            </div>
          </div>

        </div>

        <div className='song-banner__right'>
          <div className='song-image-container'>
            <img className='banner-song-image' src={song.imageUrl} alt={`${song.title}'s Cover`} />
          </div>
        </div>

      </div>                                {/* END OF SONG-BANNER  */}

      <div className='mainContainer'>

        <div className='left-mainContainer'>

          <div className='userInteraction'>
            <div className='commentForm-wrapper'>
              <div className='commenterProfilePic'></div>

              <div className='commentForm'>
                <AddComment songId={song.id} user={user} />
              </div>

            </div>

            {/* <div className='userInteraction__buttons'>
              <button>Like</button>
              <button>Add to playlist</button>
            </div> */}
          </div>

          <div className='discourse'>

            <div className='discourse__left artistDetails'>
              <div id='song-component-artist-pic'></div>
              <div>{artist.username}</div>
            </div>


            <div className='discourse__right'>

              <div className='discourse__songInfo'>
                {song.description && <div className='songDescription'>{song.description}</div>}
              </div>

              <div className='discourse__comments'>
                {commentsList}
              </div>

            </div>

          </div>

        </div>

        <div className='right-mainContainer'>

        </div>

      </div>                              {/* END OF MAIN-CONTAINER */}


    </div>
  );
};

export default Song;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchCurrentSong } from "../../store/song";

import AddComment from "../AddComment";
import Comment from "../Comment";

import './Song.css';

const Song = ({ toggleBtn, track, setTrack }) => {
  const { songId } = useParams();

  const dispatch = useDispatch();

  let song = useSelector(state => state.songs.current);
  let user = useSelector(state => state.session.user)
  const [hasLoaded, setHasLoaded] = useState(false);

  if (isNaN(Number(songId))) return <div>404</div>

  if (!song || song.id !== Number(songId)) {

    if (hasLoaded) return <div>Uh oh... something went wrong.</div>

    dispatch(fetchCurrentSong(songId))
      .then(() => setHasLoaded(true));
    return <div>Loading...</div>
  }

  // array of objs
  let comments = [...song.comments];
  let commentsList = [];

  while (comments.length) {
    let commentInd = comments.length - 1;
    let comment = comments.pop();

    commentsList.push(
      <Comment commentInd={commentInd} user={user} comment={comment} />
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

            <div className="play-button-container">
              <button id='song-banner-toggle-play' onClick={playTrack}>
                <img id='song-component-toggle-play' src='https://cdn-icons-png.flaticon.com/512/73/73940.png' alt='toggle-play button' />
              </button>
            </div>

            <div className='song-banner__top__song-info'>
              <div id='song-title'><span id='song-info__song-title'>{song.title}</span></div>
              <div id='song-artist'><span id='song-info__song-artist'>{song.Artist.username}</span></div>
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
              <div>{song.Artist.username}</div>
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

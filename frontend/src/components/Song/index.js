import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import './Song.css';

const Song = () => {
  const { userId, songId } = useParams();
  let song = useSelector(state => state.songs[songId]);
  let artists = useSelector(state => state.artists)

  // Note: complete this here
  // if (!song) run a dispatch here

  return (
    <div>
      <h2>Song Component</h2>

      <div className='song-banner'>         {/* START OF SONG-BANNER  */}

        <div className='song-banner__left'>
          <div className='song-banner__left__top'>

            <div className="play-button-container"><p>Play button</p></div>
            {/*comment: p tags were making it center */}

            <div className='song-banner__top__song-info'>
              <p id='song-title'>{song.title}</p>
              <p id='song-aritst'>{artists[song.userId].username}</p>
            </div>

          </div>

          <div className='song-banner__left__bottom'>
            <div className='song-waveform'>Waveform goes here</div>
          </div>

        </div>

        <div className='song-banner__right'>
          <div className='song-image-container'>
            <img className='banner-song-image' src={song.imageUrl} alt={`${song.title}'s Image`} />
          </div>
        </div>

      </div>                                {/* END OF SONG-BANNER  */}

      <div className='userInteraction'>
        <div className='commentForm-wrapper'>
          <div className='commenterProfilePic'>Profile Image - square 40x40 </div>
          <div className='commentForm'>comment field</div>
        </div>

        <div className='userInteraction__buttons'>
          <button>Like</button>
          <button>Add to playlist</button>
        </div>
      </div>

      <div className='discourse'>

        <div className='discourse__sessionUserDetails'>
          <div>sessionUser profile picture - 120x120 square div - circle picture</div>
          <div>sessionUser name</div>
        </div>

        <div className='discourse__comments'>
          <span># of comments</span>
          <p>List comments here</p>
        </div>

      </div>

    </div>
  );
};

export default Song;

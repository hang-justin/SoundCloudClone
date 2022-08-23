import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import './Song.css';

const Song = () => {
  const { userId, songId } = useParams();
  let song = useSelector(state => state.songs[songId]);

  // if (!song) run a dispatch here

  return (
    <div>
      <h2>Song Component</h2>

      <div className='song-banner'>
        <div>Play button</div>
        <div className='song-info'>
          <p>Song Title</p>
          <p>Artist</p>
        </div>
        <div>song image</div>
      </div>

      <div className='userInteraction'>
        <div className='commentForm-wrapper'>
          <div>Profile Image - square 40x40 </div>
          <div>comment field</div>
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

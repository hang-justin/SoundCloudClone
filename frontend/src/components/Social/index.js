import profilePic from '../../img/headshot.jpg';
import githubLogo from '../../img/github.png';
import linkedinLogo from '../../img/linkedin.png';
import { onErrorImgCoverLoader } from '../../utils';

import './Social.css';

const Social = () => {
  const githubLink = 'https://github.com/hang-justin';
  const linkedinProfile = 'https://www.linkedin.com/in/hang-justin/';

  return (
    <div className='social-container flx-col'>
      <p id='feat-artist'>Check out this featured artist</p>

      <span id="social-name">Justin Hang</span>

      <img
        id='social-profile-pic'
        src={profilePic}
        onError={onErrorImgCoverLoader}
      />

      <a target='_blank' className='social-link' href={githubLink}>
        <img
          id='github-logo'
          className='social-logos' src={githubLogo}
          onError={onErrorImgCoverLoader}
        />
      </a>

      <a target='_blank' className='social-link' href={linkedinProfile}>
        <img
          id='linkedin-logo'
          className='social-logos'
          src={linkedinLogo}
          onError={onErrorImgCoverLoader}
        />
      </a>

    </div>
  )
}

export default Social;

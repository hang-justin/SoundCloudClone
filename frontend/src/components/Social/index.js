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
        src={profilePic}
        id='social-profile-pic'
        onError={onErrorImgCoverLoader}
        alt='profile-pic'
      />

      <a target='_blank' className='social-link' href={githubLink}>
        <img
          src={githubLogo}
          id='github-logo'
          className='social-logos'
          onError={onErrorImgCoverLoader}
          alt='github'
        />
      </a>

      <a target='_blank' className='social-link' href={linkedinProfile}>
        <img
          src={linkedinLogo}
          id='linkedin-logo'
          className='social-logos'
          onError={onErrorImgCoverLoader}
          alt='linkedin'
        />
      </a>

    </div>
  )
}

export default Social;

import './Social.css';

const Social = () => {

  const profilePic = 'https://i.imgur.com/fKwsbvp.jpg';
  const githubLogo = 'https://i.imgur.com/PX2nNdy.png';
  const githubLink = 'https://github.com/juanpunchman';

  const linkedinLogo = 'https://i.imgur.com/3kpXllz.png';
  const linkedinProfile = 'https://www.linkedin.com/in/hangjustin/';

  return (
    <div className='social-container flx-col'>
      <p id='feat-artist'>Check out this featured artist</p>
      <span id="social-name">Justin Hang</span>
      <img id='social-profile-pic' src={profilePic} />

      {/* <div className='social-links flx-row'> */}

      <a className='social-link' href={githubLink}>
        <img id='github-logo' className='social-logos' src={githubLogo} />
      </a>

      <a className='social-link' href={linkedinProfile}>
        <img id='linkedin-logo' className='social-logos' src={linkedinLogo} />
      </a>
      {/* </div> */}

    </div>
  )
}

export default Social;

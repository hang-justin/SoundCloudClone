import bufferingImg from '../../../img/buffering-dots.gif';
import { onErrorImgCoverLoader } from '../../../utils';

import './SplashLoadingTile.css';

const SplashLoadingTile = () => {

    return (
        <div className="splash-song-card loading-tile">
            <div className='loading-gif-container flx-row-justify-align-ctr'>
                <div className='circle circle1'></div>
                <div className='circle circle2'></div>
                <div className='circle circle3'></div>
                <img
                    src={bufferingImg}
                    className='splash-loading-gif'
                    onError={onErrorImgCoverLoader}
                    alt='loading-song'
                />
            </div>
        </div>
    )
};

export default SplashLoadingTile;

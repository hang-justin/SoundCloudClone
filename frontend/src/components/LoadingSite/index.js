import bufferingImg from '../../img/buffering-dots.gif';
import { onErrorImgCoverLoader } from '../../utils';

import './LoadingSite.css';

const LoadingSite = () => {

    return (
        <div id='loading-site'>
            <div id='circle-container' className='flx-row-justify-align-ctr'>
                <div className='site-circle site-circle1'></div>
                <div className='site-circle site-circle2'></div>
                <div className='site-circle site-circle3'></div>

                <img
                    src={bufferingImg}
                    id='site-loading-dots'
                    onError={onErrorImgCoverLoader}
                    alt='loading'
                />

            </div>
        </div>
    )
};

export default LoadingSite;

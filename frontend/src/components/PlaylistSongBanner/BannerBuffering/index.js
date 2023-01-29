import bufferingGif from '../../../img/buffering-dots.gif';
import { onErrorImgCoverLoader } from '../../../utils';

import './BannerBuffering.css';
const BannerBuffering = () => {

    return (
        <div id='banner-buffering-logo'>
            <img
                src={bufferingGif}
                id='dots-buffering-gif'
                onError={onErrorImgCoverLoader}
                alt='empty-playlist'
            />
        </div>
    )
};


export default BannerBuffering;

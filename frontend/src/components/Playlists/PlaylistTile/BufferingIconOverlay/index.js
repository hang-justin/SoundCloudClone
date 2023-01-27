import bufferingGif from '../../../../img/buffering-dots.gif';
import { onErrorImgCoverLoader } from '../../../../utils';

import './BufferingIconOverlay.css';

const BufferingIconOverlay = () => {

    return (
        <div className='playlist-tile-buffering-overlay'>
            <img
                src={bufferingGif}
                className='buffering-gif-overlay'
                onError={onErrorImgCoverLoader}
                alt='no-songs'
            />
        </div>
    )
};

export default BufferingIconOverlay;

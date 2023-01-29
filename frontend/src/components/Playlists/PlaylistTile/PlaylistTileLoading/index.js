import bufferingImg from '../../../../img/buffering-dots.gif';
import { onErrorImgCoverLoader } from '../../../../utils';

import './PlaylistTileLoading.css';

const PlaylistTileLoading = () => {

    return (
        <div className='playlist-loading-tile playlist-loading-container flx-row-justify-align-ctr'>
            <div className='circle circle1'></div>
            <div className='circle circle2'></div>
            <div className='circle circle3'></div>

            <img
                src={bufferingImg}
                className='playlist-loading-gif'
                onError={onErrorImgCoverLoader}
                alt='loading-playlist'
            />
        </div>
    )
};

export default PlaylistTileLoading;

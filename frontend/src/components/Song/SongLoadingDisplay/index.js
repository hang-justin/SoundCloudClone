import './SongLoadingDisplay.css';

const SongLoadingDisplay = () => {

    return (
        <div id='song-comp-loading-display' className='flx-row-justify-align-ctr'>
            <div id='song-circle-container'>
                <div className='song-circle circle1'></div>
                <div className='song-circle circle2'></div>
                <div className='song-circle circle3'></div>
            </div>
        </div>
    )
};

export default SongLoadingDisplay;

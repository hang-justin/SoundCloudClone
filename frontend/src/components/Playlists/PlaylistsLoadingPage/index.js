import './PlaylistsLoadingPage.css';

const PlaylistsLoadingPage = () => {

    return (
        <div id='playlists-loading-page'>
            <div id='playlists-loading-circle-container' className='flx-row-justify-align-ctr'>
                <div className='playlist-circle circle1'></div>
                <div className='playlist-circle circle2'></div>
                <div className='playlist-circle circle3'></div>
            </div>
        </div>
    )
};

export default PlaylistsLoadingPage;

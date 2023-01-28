import './LoadingSite.css';

const LoadingSite = () => {

    return (
        <div id='loading-site'>
            <div id='circle-container' className='flx-row-justify-align-ctr'>
                <div className='site-circle circle1'></div>
                <div className='site-circle circle2'></div>
                <div className='site-circle circle3'></div>
            </div>
        </div>
    )
};

export default LoadingSite;

import defaultImgCover from '../img/default-cover.jpg'

// export const setOrToggleAudio = (e, song) => {
//   if (!currentTrack) return dispatch(setActiveTrack(song));
//   if (song.id === currentTrack.id) return audioPlayerRef.current.togglePlay(e);

//   dispatch(setActiveTrack(song));
// }

export const onErrorImgCoverLoader = (e) => {
    e.target.className = e.target.className + ' ' + 'default-err-img-cover';
    e.target.src = defaultImgCover;
}

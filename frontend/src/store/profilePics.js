
const initialState = {
  'Gorillaz': 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/profile-pic/GORILLAZ.jpg',
  'WEARETHEGOOD': 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/profile-pic/WEARETHEGOOD.jpg',
  'J. Cole': 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/profile-pic/JCOLE.jpg',
  'Logic': 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/profile-pic/LOGIC.jpg',
  'Lupe Fiasco': 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/profile-pic/LUPE.jpg',
  'Musiq Soulchild': 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/profile-pic/MUSIQ.jpg',
  'NIKI': 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/profile-pic/NIKI.jpg',
  'Nujabes': 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/profile-pic/NUJABES.jpg',
  'OutKast': 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/profile-pic/OUTKAST.jpg',
  'Ratatat': 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/profile-pic/RATATAT.jpg',
  'The Green': 'https://i1.sndcdn.com/artworks-hje6io9Cj8itRKtE-aJWHJg-t500x500.jpg',
  'Cordae': 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/profile-pic/CORDAE.jpg',
  'Surfaces': 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/profile-pic/SURFACES.jpg'
};

const profilePicsReducer = (state = initialState, action) => {
  let newState = {};

  switch (action.type) {

    default: return state;
  };
};

export default profilePicsReducer;

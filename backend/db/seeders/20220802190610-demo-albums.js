'use strict';

const demoAlbums = [
  {
    userId: 1,
    title: `BIG MOOD ATTITUDE`,
    description: `With positive poise and swagger, Funky grooves and Electronica vibes, WEARETHEGOOD delivers a tour de force of energetic Hip Hop tracks.`,
    imageUrl: 'https://i1.sndcdn.com/artworks-AYOPHdHEFMqv-0-t500x500.jpg',
  },
  {
    userId: 2,
    title: `Born Sinner`,
    description: `Released on June 18, 2013, by ByStorm Entertainment, Columbia Records, Dreamville Records and Roc Nation. The album serves as the follow-up to his debut album, Cole World: The Sideline Story.`,
    imageUrl: 'https://i1.sndcdn.com/artworks-000049987664-vmb7yk-t500x500.jpg',
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  await queryInterface.bulkInsert('Albums', demoAlbums)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const { Op } = Sequelize;
    await queryInterface.bulkDelete('Albums', {
      userId: { [Op.gte]: [0] }
    })
  }
};

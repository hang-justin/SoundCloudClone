'use strict';

const demoAlbums = [
  {
    userId: 1,
    title: `Mac's mixtape`,
    description: `Not a real album. Came from mixtape`,
    imageUrl: 'https://i1.sndcdn.com/avatars-000497275857-ce36i1-t500x500.jpg',
  },
  {
    userId: 2,
    title: `Shang-Chi`,
    description: `Marvel's Shang-Chi`,
    imageUrl: 'https://i1.sndcdn.com/artworks-jNgJzmHroki6-0-t500x500.jpg',
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

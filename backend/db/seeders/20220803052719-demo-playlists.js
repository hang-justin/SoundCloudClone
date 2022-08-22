'use strict';

const demoPlaylists = [
  {
    userId: 1,
    name: 'Number 1 playlist',
    imageUrl: 'mind yo own biz'
  },
  {
    userId: 2,
    name: 'Number 2 playlist',
    imageUrl: `You're a little nosy, huh`
  },
  {
    userId: 3,
    name: 'Number 3 playlist',
    imageUrl: `Nosy little bee`
  },
  {
    userId: 1,
    name: 'Number 4 playlist',
    imageUrl: `Really`
  },
  {
    userId: 2,
    name: 'Number 5 playlist',
    imageUrl: `Whatever, IDC anymore. I'm not creative enough.`
  },
]

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Playlists', demoPlaylists);
  },

  async down(queryInterface, Sequelize) {
    const { Op } = Sequelize;
    await queryInterface.bulkDelete('Playlists', {
      userId: { [Op.gte]: [0] }
    })
  }
};

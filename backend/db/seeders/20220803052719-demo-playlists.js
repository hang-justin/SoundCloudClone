'use strict';

const demoPlaylists = [
  {
    userId: 1,
    name: 'Number 1 playlist',
    imageUrl: 'https://i.imgur.com/vM4dsRJ.jpeg'
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
    imageUrl: `https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/7010633a-fbb6-4a19-869a-91a8611c03f4/d8cyp4f-b6888ff4-9fc7-4b10-91c6-607ddea741cf.png`
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

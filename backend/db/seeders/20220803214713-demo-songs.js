'use strict';

const { sequelize } = require("../models");

const demoSongs = [
  {
    userId: 1,
    albumId: 1,
    title: 'Best Day Ever',
    description: 'Mixtape',
    url: 'https://soundcloud.com/mac-miller-nj/mac-miller-best-day-ever',
    imageUrl: 'https://i1.sndcdn.com/avatars-000497275857-ce36i1-t500x500.jpg',
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Every Summertime',
    description: 'It was in Shang-Chi!',
    url: 'https://soundcloud.com/nikizefanya/every-summertime',
    imageUrl: 'https://i1.sndcdn.com/artworks-jNgJzmHroki6-0-t500x500.jpg',
  },
  {
    userId: 1,
    albumId: 1,
    title: 'The Show Goes On',
    description: 'Lupeeeeeeeeeeeeeeeeee Fiasco',
    url: 'https://soundcloud.com/lupefiasco/the-show-goes-on-1',
    imageUrl: 'https://i1.sndcdn.com/artworks-jw7wAlzg8j2w-0-t500x500.jpg',
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Til The End',
    description: 'Logic',
    url: 'https://soundcloud.com/logic_official/till-the-end-1',
    imageUrl: 'https://i1.sndcdn.com/artworks-xA3pZ7GsbgUU-0-t500x500.jpg',
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
   await queryInterface.bulkInsert('Songs', demoSongs)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    const { Op } = Sequelize;
    await queryInterface.bulkDelete('Songs', {
      userId : { [Op.gte]: [0]}
    })
  }
};

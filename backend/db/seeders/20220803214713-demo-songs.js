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
  },
  {
    userId: 1,
    albumId: 1,
    title: 'Kangaroo Jack',
    description: 'Kangaroo Jack',
    url: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
    imageUrl: 'https://www.sbs.com.au/movies/sites/sbs.com.au.film/files/styles/full/public/kangaroo.jpeg',
  },
  {
    userId: 1,
    albumId: 1,
    title: 'Kangaroo Jack',
    description: 'Kangaroo Jack',
    url: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
    imageUrl: 'https://www.sbs.com.au/movies/sites/sbs.com.au.film/files/styles/full/public/kangaroo.jpeg',
  },
  {
    userId: 1,
    albumId: 1,
    title: 'Kangaroo Jack',
    description: 'Kangaroo Jack',
    url: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
    imageUrl: 'https://www.sbs.com.au/movies/sites/sbs.com.au.film/files/styles/full/public/kangaroo.jpeg',
  },
  {
    userId: 1,
    albumId: 1,
    title: 'Kangaroo Jack',
    description: 'Kangaroo Jack',
    url: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
    imageUrl: 'https://www.sbs.com.au/movies/sites/sbs.com.au.film/files/styles/full/public/kangaroo.jpeg',
  },
  {
    userId: 1,
    albumId: 1,
    title: 'Kangaroo Jack',
    description: 'Kangaroo Jack',
    url: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
    imageUrl: 'https://www.sbs.com.au/movies/sites/sbs.com.au.film/files/styles/full/public/kangaroo.jpeg',
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Marshallow Man',
    description: 'Ravin time',
    url: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
    imageUrl: 'https://play-lh.googleusercontent.com/Ico9ZTzAGfLKeOJ6XoncgMZmLBvZGQ3Rz8ok2Jgvp0KG5tXKEUS65TUTP_ouxXhDhw=w240-h480-rw',
  },
]

module.exports = {
  async up(queryInterface, Sequelize) {
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

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    const { Op } = Sequelize;
    await queryInterface.bulkDelete('Songs', {
      userId: { [Op.gte]: [0] }
    })
  }
};

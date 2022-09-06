'use strict';

const { sequelize } = require("../models");

const demoSongs = [
  {
    userId: 1,
    albumId: 1,
    title: 'Sevish',
    description: 'Mixtape',
    url: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
    imageUrl: 'https://i1.sndcdn.com/avatars-000497275857-ce36i1-t500x500.jpg',
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Epoq',
    description: 'Lepid something',
    url: 'http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg',
    imageUrl: 'https://i1.sndcdn.com/artworks-jNgJzmHroki6-0-t500x500.jpg',
  },
  {
    userId: 1,
    albumId: 1,
    title: 'Kangaroo',
    description: 'Jumping time',
    url: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-jw7wAlzg8j2w-0-t500x500.jpg',
  },
  {
    userId: 1,
    albumId: 1,
    title: 'Sevish',
    description: 'Mixtape',
    url: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
    imageUrl: 'https://i1.sndcdn.com/avatars-000497275857-ce36i1-t500x500.jpg',
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Epoq',
    description: 'Lepid something',
    url: 'http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg',
    imageUrl: 'https://i1.sndcdn.com/artworks-jNgJzmHroki6-0-t500x500.jpg',
  },
  {
    userId: 1,
    albumId: 1,
    title: 'Kangaroo',
    description: 'Jumping time',
    url: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-jw7wAlzg8j2w-0-t500x500.jpg',
  },
  {
    userId: 1,
    albumId: 1,
    title: 'Sevish',
    description: 'Mixtape',
    url: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
    imageUrl: 'https://i1.sndcdn.com/avatars-000497275857-ce36i1-t500x500.jpg',
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Epoq',
    description: 'Lepid something',
    url: 'http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg',
    imageUrl: 'https://i1.sndcdn.com/artworks-jNgJzmHroki6-0-t500x500.jpg',
  },
  {
    userId: 1,
    albumId: 1,
    title: 'Kangaroo',
    description: 'Jumping time',
    url: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-jw7wAlzg8j2w-0-t500x500.jpg',
  }
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

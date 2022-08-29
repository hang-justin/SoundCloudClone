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
    userId: 2,
    albumId: 2,
    title: 'Galaxy Invaders',
    description: 'GET EM',
    url: 'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-xA3pZ7GsbgUU-0-t500x500.jpg',
  },
  {
    userId: 1,
    albumId: 1,
    title: 'Paza',
    description: 'Pizzaz',
    url: 'http://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3',
    imageUrl: 'https://ih1.redbubble.net/image.253244121.8872/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg',
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

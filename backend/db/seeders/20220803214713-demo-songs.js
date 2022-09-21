'use strict';

const { sequelize } = require("../models");

const demoSongs = [
  {
    userId: 1,
    albumId: 1,
    title: 'Mood',
    description: 'Mood by WEARETHEGOOD',
    url: 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/song-seeder-1.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-AYOPHdHEFMqv-0-t500x500.jpg',
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Crooked Smile',
    description: 'Crooked Smile by J. Cole',
    url: 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/song-seeder-2.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-000049987664-vmb7yk-t500x500.jpg',
  },
  {
    userId: 1,
    albumId: 1,
    title: 'Til The End',
    description: 'Til the End by Logic',
    url: 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/song-seeder-3.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-000094618778-09tq16-t500x500.jpg',
  },
  {
    userId: 1,
    albumId: 1,
    title: 'Hip Hop Saved My Life',
    description: 'Hip Hop Saved My Life by Lupe Fiasco',
    url: 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/song-seeder-4.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-000103683348-cm8suj-t500x500.jpg',
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Just Friends',
    description: 'Just Friends by Musiq Soulchild',
    url: 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/song-seeder-5.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-000077049920-piz3xy-t500x500.jpg',
  },
  {
    userId: 1,
    albumId: 1,
    title: 'Every Summertime',
    description: 'Every Summertime by NIKI',
    url: 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/song-seeder-6.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-jNgJzmHroki6-0-t500x500.jpg',
  },
  {
    userId: 1,
    albumId: 1,
    title: 'Reflection Eternal',
    description: 'Reflection Eternal by Nujabes',
    url: 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/song-seeder-7.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-000047597547-0xs6y1-t500x500.jpg',
  },
  {
    userId: 2,
    albumId: 2,
    title: 'Ms. Jackson',
    description: 'Ms. Jackson by Outkast',
    url: 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/song-seeder-8.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-eMtnnHhGbVQ4ywfp-bzl2VA-t500x500.jpg',
  },
  {
    userId: 1,
    albumId: 1,
    title: 'Loud Pipes',
    description: 'Loud Pipes by Ratatat',
    url: 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/song-seeder-9.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-Un4P8MfMEbK2-0-t500x500.png',
  },
  {
    userId: 3,
    albumId: null,
    title: 'Alive',
    description: 'Alive by The Green',
    url: 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/song-seeder-10.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-hje6io9Cj8itRKtE-aJWHJg-t500x500.jpg',
  },
  {
    userId: 3,
    albumId: null,
    title: 'RNP (feat. Anderson Paak)',
    description: 'RNP (feat. Anderson Paak) by Cordae',
    url: 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/song-seeder-11.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-Lb9mf6IK68Ld-0-t500x500.jpg',
  },
  {
    userId: 3,
    albumId: null,
    title: 'The View',
    description: 'The View by Surfaces',
    url: 'https://demo-song-seeders.s3.us-west-1.amazonaws.com/song-seeder-12.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-000467819838-6ezbhm-t500x500.jpg',
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

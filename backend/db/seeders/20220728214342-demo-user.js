'use strict';

const bcrypt = require('bcryptjs');

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

    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Quenten',
        lastName: 'Wes',
        email: 'user1@user.io',
        username: 'WEARETHEGOOD',
        hashedPassword: bcrypt.hashSync('password') },
      {
        firstName: 'Jermaine',
        lastName: 'Cole',
        email: 'user2@user.io',
        username: 'J. Cole',
        hashedPassword: bcrypt.hashSync('password') },
      {
        firstName: 'Robert ',
        lastName: 'Hall',
        email: 'user3@user.io',
        username: 'Logic',
        hashedPassword: bcrypt.hashSync('password') },
      {
        firstName: 'Lupe',
        lastName: 'Fiasco',
        email: 'user4@user.io',
        username: 'Lupe Fiasco',
        hashedPassword: bcrypt.hashSync('password') },
      {
        firstName: 'Taalib ',
        lastName: 'Johnson',
        email: 'user5@user.io',
        username: 'Musiq Soulchild',
        hashedPassword: bcrypt.hashSync('password') },
      {
        firstName: 'Nicole',
        lastName: 'Zefanya',
        email: 'user6@user.io',
        username: 'NIKI',
        hashedPassword: bcrypt.hashSync('password') },
      {
        firstName: 'Jun',
        lastName: 'Yamada',
        email: 'user7@user.io',
        username: 'Nujabes',
        hashedPassword: bcrypt.hashSync('password') },
      {
        firstName: 'Out',
        lastName: 'Kast',
        email: 'user8@user.io',
        username: 'Outkast',
        hashedPassword: bcrypt.hashSync('password') },
      {
        firstName: 'Cherry',
        lastName: 'Ratatat',
        email: 'user9@user.io',
        username: 'Ratatat',
        hashedPassword: bcrypt.hashSync('password') },
      {
        firstName: 'The',
        lastName: 'Green',
        email: 'user10@user.io',
        username: 'The Green',
        hashedPassword: bcrypt.hashSync('password') },
      {
        firstName: 'Cordae',
        lastName: 'Dunston',
        email: 'user11@user.io',
        username: 'Cordae',
        hashedPassword: bcrypt.hashSync('password') },
      {
        firstName: 'Forrest',
        lastName: 'Colin',
        email: 'user12@user.io',
        username: 'Surfaces',
        hashedPassword: bcrypt.hashSync('password') },
      {
        firstName: 'Haram',
        lastName: 'Bae',
        email: 'user13@user.io',
        username: 'Gorillaz',
        hashedPassword: bcrypt.hashSync('password') },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */


    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      // username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};

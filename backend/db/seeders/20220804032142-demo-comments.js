'use strict';

const demoComments = [
  {
    userId: 1,
    songId: 1,
    body: 'text here'
  },
  {
    userId: 2,
    songId: 1,
    body: 'comment'
  },
  {
    userId: 3,
    songId: 1,
    body: 'another comment'
  },
  {
    userId: 1,
    songId: 1,
    body: 'text here again'
  },{
    userId: 1,
    songId: 2,
    body: 'first comment'
  },
  {
    userId: 2,
    songId: 2,
    body: '2nd'
  },
  {
    userId: 3,
    songId: 2,
    body: '123'
  },
  {
    userId: 1,
    songId: 2,
    body: '4'
  },{
    userId: 1,
    songId: 3,
    body: 'hola'
  },
  {
    userId: 2,
    songId: 3,
    body: 'hello'
  },
  {
    userId: 3,
    songId: 3,
    body: 'sayonara'
  },
  {
    userId: 1,
    songId: 3,
    body: 'adios'
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', demoComments)
  },

  async down (queryInterface, Sequelize) {
    const { Op } = { Sequelize };
    await queryInterface.bulkDelete('Comments', {
      id: { [Op.gte ]: [0]}
    })
  }
};

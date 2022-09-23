'use strict';

const demoComments = [
  {
    userId: 1,
    songId: 1,
    body: 'Check out this beat'
  },
  {
    userId: 2,
    songId: 1,
    body: 'Not bad - J.cole'
  },
  {
    userId: 3,
    songId: 1,
    body: 'You know we can see your name right above your comment right, J. Cole?'
  },
  {
    userId: 2,
    songId: 1,
    body: '-.- And what? - J.Cole'
  },
  {
    userId: 4,
    songId: 1,
    body: 'first comment'
  },
  {
    userId: 5,
    songId: 1,
    body: '2nd'
  },
  {
    userId: 3,
    songId: 2,
    body: 'Nice - Logic'
  },
  {
    userId: 2,
    songId: 2,
    body: 'Real funny -J. Cole'
  },{
    userId: 1,
    songId: 3,
    body: 'hola'
  },
  {
    userId: 3,
    songId: 3,
    body: 'adios'
  },
  {
    userId: 4,
    songId: 3,
    body: 'sayonara'
  },
  {
    userId: 5,
    songId: 5,
    body: 'Anybody wanna be friends?'
  },
  {
    userId: 5,
    songId: 5,
    body: ':('
  },
  {
    userId: 6,
    songId: 6,
    body: `Heyyyyyyyyyyyyyyyyyyyy everybody. Don't forget to like! xoxo`
  },
  {
    userId: 8,
    songId: 6,
    body: 'wasnt this in shang-chi??'
  },
  {
    userId: 6,
    songId: 6,
    body: 'Yeah! It was! ^^'
  },
  {
    userId: 10,
    songId: 6,
    body: 'that movie was dope'
  },
  {
    userId: 2,
    songId: 6,
    body: 'Wicked - J.Cole'
  },
  {
    userId: 6,
    songId: 6,
    body: 'Thanks! :)'
  },
  {
    userId: 1,
    songId: 7,
    body: 'RIP'
  },
  {
    userId: 2,
    songId: 7,
    body: 'RIP - J. Cole'
  },
  {
    userId: 3,
    songId: 7,
    body: 'RIP'
  },
  {
    userId: 4,
    songId: 7,
    body: 'RIP'
  },
  {
    userId: 5,
    songId: 7,
    body: 'RIP'
  },
  {
    userId: 6,
    songId: 7,
    body: 'RIP'
  },
  {
    userId: 8,
    songId: 7,
    body: 'RIP'
  },
  {
    userId: 9,
    songId: 7,
    body: 'RIP'
  },
  {
    userId: 10,
    songId: 7,
    body: 'RIP'
  },
  {
    userId: 11,
    songId: 7,
    body: 'RIP'
  },
  {
    userId: 12,
    songId: 7,
    body: 'RIP'
  },
  {
    userId: 13,
    songId: 7,
    body: 'RIP'
  },
  {
    userId: 8,
    songId: 8,
    body: 'Sorry Ms Jackson!'
  },
  {
    userId: 12,
    songId: 8,
    body: 'I AM FOR REAL'
  },
  {
    userId: 10,
    songId: 8,
    body: 'NEVER MEANT TO MAKE YOUR DAUGHTER CRY'
  },
  {
    userId: 13,
    songId: 8,
    body: 'I APOLOGIZE A TRILLION TIMES'
  },
  {
    userId: 2,
    songId: 8,
    body: '-J. Cole'
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

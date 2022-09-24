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
    body: 'Dooooooope'
  },
  {
    userId: 3,
    songId: 1,
    body: 'certified banger'
  },
  {
    userId: 2,
    songId: 1,
    body: `Let's collab`
  },
  {
    userId: 4,
    songId: 1,
    body: 'let me get in on that collab too'
  },
  {
    userId: 5,
    songId: 1,
    body: 'third on that collab'
  },
  {
    userId: 3,
    songId: 2,
    body: 'niceeee'
  },
  {
    userId: 2,
    songId: 2,
    body: 'thanks'
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
    body: 'Wicked'
  },
  {
    userId: 6,
    songId: 6,
    body: 'Thanks! :)'
  },
  {
    userId: 1,
    songId: 7,
    body: 'love this song'
  },
  {
    userId: 2,
    songId: 7,
    body: 'GOAT'
  },
  {
    userId: 3,
    songId: 7,
    body: 'wow'
  },
  {
    userId: 4,
    songId: 7,
    body: 'ur a rainbow'
  },
  {
    userId: 5,
    songId: 7,
    body: `you're a river`
  },
  {
    userId: 6,
    songId: 7,
    body: 'your a flower'
  },
  {
    userId: 8,
    songId: 7,
    body: '<3'
  },
  {
    userId: 9,
    songId: 7,
    body: 'G.O.A.T'
  },
  {
    userId: 10,
    songId: 7,
    body: 'so peaceful'
  },
  {
    userId: 11,
    songId: 7,
    body: 'love this beat and your beats on samurai champloo'
  },
  {
    userId: 12,
    songId: 7,
    body: 'favorite'
  },
  {
    userId: 13,
    songId: 7,
    body: 'on repeat'
  },
  {
    userId: 8,
    songId: 8,
    body: 'I APOLOGIZE A TRILLION TIMES'
  },
  {
    userId: 12,
    songId: 8,
    body: 'NEVER MEANT TO MAKE YOUR DAUGHTER CRY'
  },
  {
    userId: 10,
    songId: 8,
    body: 'I AM FOR REAL'
  },
  {
    userId: 13,
    songId: 8,
    body: 'Sorry Ms Jackson!'
  },
  {
    userId: 2,
    songId: 8,
    body: `v - haha we need some lyrics on this app!`
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

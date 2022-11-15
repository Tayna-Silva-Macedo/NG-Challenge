'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
    {
      username: 'username1',
      password: 'senhasecreta1',
      accountId: 1,
    },
    {
      username: 'username2',
      password: 'senhasecreta2',
      accountId: 2,
    },
    {
      username: 'username3',
      password: 'senhasecreta3',
      accountId: 3,
    },
    {
      username: 'username4',
      password: 'senhasecreta4',
      accountId: 4,
    },
    {
      username: 'username5',
      password: 'senhasecreta5',
      accountId: 5,
    },
  ], { });
  },
  
  async down (queryInterface) { queryInterface.bulkDelete('users', null, {}) }
};

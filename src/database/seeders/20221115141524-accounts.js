'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'accounts',
      [
        {
          balance: 1050.45,
        },
        {
          balance: 4078.5,
        },
        {
          balance: 5264.2,
        },
        {
          balance: 1000.0,
        },
        {
          balance: 100.89,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    queryInterface.bulkDelete('accounts', null, {});
  },
};

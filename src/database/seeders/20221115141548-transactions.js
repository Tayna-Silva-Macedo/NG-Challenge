'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transactions', [
    {
      debitedAccountId: 1,
      creditedAccountId: 2,
      value: 500.00,
      createdAt: new Date(),
    },
    {
      debitedAccountId: 3,
      creditedAccountId: 4,
      value: 20.00,
      createdAt: new Date(),
    },
    {
      debitedAccountId: 5,
      creditedAccountId: 2,
      value: 100.00,
      createdAt: new Date(),
    },
  ], { });
  },
  
  async down (queryInterface) { queryInterface.bulkDelete('transactions', null, {}) }
};

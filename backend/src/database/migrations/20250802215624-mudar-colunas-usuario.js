'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'instagram', { type: Sequelize.STRING, defaultValue: null, allowNull: true });
    await queryInterface.addColumn('users', 'phone', { type: Sequelize.STRING, defaultValue: '', allowNull: false });
    await queryInterface.removeColumn('users', 'username');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'username', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.removeColumn('users', 'instagram');
    await queryInterface.removeColumn('users', 'phone');
  }
};

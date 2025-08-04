'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'greeting', { type: Sequelize.TEXT, defaultValue: null, allowNull: true });
    await queryInterface.addColumn('users', 'show_email', { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false });
    await queryInterface.addColumn('users', 'show_phone', { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false });
    await queryInterface.addColumn('users', 'show_insta', { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('posts', 'photo_2', { type: Sequelize.STRING, defaultValue: null, allowNull: true });
    await queryInterface.addColumn('posts', 'photo_3', { type: Sequelize.STRING, defaultValue: null, allowNull: true });
  },

  async down (queryInterface, Sequelize) {

  }
};

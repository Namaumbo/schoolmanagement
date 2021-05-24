'use strict';

const {DataTypes } = require('sequelize')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('perfomances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type:DataTypes.INTEGER
      },
      performanceTrend: {
        type:DataTypes.JSON
      },
      results: {
        type:DataTypes.JSON
      },
      createdAt: {
        allowNull: false,
        type:DataTypes.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type:DataTypes.DATEONLY
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('perfomances');
  }
};
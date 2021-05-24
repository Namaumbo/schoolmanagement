'use strict';

const {DataTypes} = require('sequelize');
const student = require('../models/students');
const subjects = require('../models/subjects');

module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('student_and_subjects', {
        createdAt: {
          allowNull: false,
          type: DataTypes.DATEONLY
        }, updatedAt: {
          allowNull: false,
          type: DataTypes.DATEONLY
        }
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('student_and_subjects');
  }
};
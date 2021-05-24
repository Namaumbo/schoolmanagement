'use strict';
const Sequelize = require('sequelize');
const {
  DataTypes
} = require('sequelize');
const connection = require("../dbConnection");

const subject = connection.define('subjects', {
    subjectId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    subjectName: {
      type: DataTypes.STRING,

    },
    category: {
      type: DataTypes.STRING,
    },
    creditHours: {
      type: DataTypes.STRING,

    },
    teachersOnDuty: {
      type: DataTypes.ARRAY(DataTypes.STRING),

    },
  },

  {
    timestamps: true
  }
);
module.exports = subject
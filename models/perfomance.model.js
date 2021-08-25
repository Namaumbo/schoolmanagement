'use strict';
// const Sequelize = require('sequelize');
const {
  DataTypes
} = require('sequelize');
const connection = require("../dbConnection");

const performance = connection.define('perfomance', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    perfomanceTrend: {
      type: DataTypes.JSON,
      allowNull: false

    },
    results: {
      type: DataTypes.JSON,
      allowNull: false
    },

  },

  {
    timestamps: true
  });
module.exports = performance
'use strict';
const {DataTypes} = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subjects', {
      subjectId: {
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true ,
        autoIncrement:true 
      },
      subjectCode:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      subjectName:{
       type:DataTypes.STRING,
       allowNull:false
      },
     
      category: {
        type: DataTypes.STRING,
        allowNull:false
      },
      creditHours:{
            type:DataTypes.INTEGER,
            allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('subjects');
  }
};
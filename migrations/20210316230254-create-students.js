'use strict';
const {DataTypes} = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', {
      
        id:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement:true,
  
       },
      firstName:{
        type:DataTypes.STRING,
        allowNull:false
      },
      lastName:{
        type:DataTypes.STRING,
        allowNull:false
       },
       sex:{
         type:DataTypes.STRING,
         allowNull:false
       },
       perfomanceTrend:{
         type:DataTypes.JSON,
         allowNull:false
       },
       dateOfBirth:{
        type:DataTypes.DATE,
        allowNull : false
       },
       studentResults:{
        type:DataTypes.JSON,
       allowNull : false
       },
       address:{
         type:DataTypes.STRING,
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
    await queryInterface.dropTable('students');
  }
};
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
     
       dateOfBirth:{
        type:DataTypes.DATE,
        allowNull : false
       },
       isRegisteredStudent:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
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
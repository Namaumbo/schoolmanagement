'use strict';

const {DataTypes} = require('sequelize');
// const student = require('../models/students');
// const subjects = require('../models/subjects');

module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('student_and_subjects', {
       id:{
         allowNull:false,
         primaryKey:true,
         unique:true,
         type: DataTypes.INTEGER,
       },
       
        createdAt: {
          allowNull: false,
          type: DataTypes.DATEONLY
        },
        studentId :{
         allowNull : true,
         type:DataTypes.INTEGER,
         references:{
           model:'students',
           key:'id'
         }
        },

        subjectId:{
          allowNull : true,
          type:DataTypes.INTEGER,
          references:{
            model:'subjects',
            key:'subjectId'
          }
        },
        
        
         updatedAt: {
          allowNull: false,
          type: DataTypes.DATEONLY
        }
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('student_and_subjects');
  }
};
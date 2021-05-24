'use strict';
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const connection = require("../dbConnection");

const student = connection.define('student', {
id:{
  type: DataTypes.INTEGER,
  primaryKey:true,
  autoIncrement:true
},
  firstName: {
    type: DataTypes.STRING,

  },
  lastName: {
    type: DataTypes.STRING,
  },
  sex:{
    type: DataTypes.STRING,
 
  },
 
  address:{
     type:DataTypes.STRING,
  },
  dateOfBirth:{
      type:DataTypes.DATE, 
  },
  isRegisteredStudent:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  }
},

{
  timestamps:true
});
module.exports = student


'use strict';
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const connection = require("../dbConnection");
const hash = require('sequelize')

const staff = connection.define('staff', {
id:{
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement:true,
  allowNull:false
},
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
  },
  gender:{
    type: DataTypes.STRING,
    allowNull: false
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    validate:{
      min:4,
      max:90,
      isEmail:true
    }
  },
  phoneNumber:{
     type:DataTypes.STRING,
     allowNull:false,
     validate:{
        min:8
     } 
  },
  dateOfBirth:{
      type:DataTypes.DATE,
      allowNull:false
  },
  password:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
          min:4
      }
      
  }

},

{
  timestamps:true
});
module.exports = staff


'use strict';
const {Model} = require('sequelize');
const {DataTypes} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class staffs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  staffs.init(
    {
    staffName:{
      type: DataTypes.STRING
    },
    gender:{
      type:DataTypes.STRING
    },
    email:{
      type:DataTypes.STRING
    },
    phoneNumber:{
      type:DataTypes.STRING
    },
    dateOfBirth:{
      type:DataTypes.DATE,
      allowNull:true
    },
  },
  {
    sequelize,
    tableName:'staffs',
    modelName: 'staffs',
  });
  return staffs;
};
"use strict";
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const connection = require("../dbConnection");
const subjects = require("../models/subjects");
const performance = require("../models/perfomance");

const student = connection.define(
  "student",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    sex: {
      type: DataTypes.STRING,
    },

    registrationNumber:{
      type: DataTypes.STRING,
      unique: true,
      allowNull:false
     },
    address: {
      type: DataTypes.STRING,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    isRegisteredStudent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },

  {
    timestamps: true,
  }
);

student.belongsToMany(subjects, { through: "student_to_subject",foreignKey:'student_id' });

subjects.belongsToMany(student, { through: "student_to_subject" , foreignKey:'subject_id'})



student.belongsToMany(performance,{through: "student_performances",foreignKey:"student_id"})

performance.belongsToMany(student, {through: "student_performances",foreignKey:"perfomance_id"})

module.exports = student;

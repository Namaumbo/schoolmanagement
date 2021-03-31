const {Sequelize} = require("sequelize")
require('dotenv').config()

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER_NAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
  });

  //connection.sync({force:true})

  module.exports = connection
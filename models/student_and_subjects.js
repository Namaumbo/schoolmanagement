
const student = require('./students')
const subject = require('./subjects')

const databaseConnection = require("../dbConnection");
const studentSubject = databaseConnection.define('student_and_subject', {

})

// student.hasMany(subject)
// subject.belongsToMany(student)

databaseConnection.authenticate()
databaseConnection.sync({
  force:true
})
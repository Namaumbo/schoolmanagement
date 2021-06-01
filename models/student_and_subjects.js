
const student = require('./students')
const subject = require('./subjects')
// const 

const databaseConnection = require("../dbConnection");
 const studentSubject = databaseConnection.define('student_and_subject', {

})


//relationships m:n
student.belongsToMany(subject,{through:'student_and_subjects' })
subject.belongsToMany(student,{through:'student_and_subjects'})

databaseConnection.authenticate()
databaseConnection.sync({
  force:true
})
exports.modules = studentSubject
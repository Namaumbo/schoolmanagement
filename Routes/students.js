const express = require('express');


const student = require('../controllers/studentController')

const router= express.Router();
        // student router
        
        router.get('/',student.getAllStudents);
        // // adding a studetn
        router.post('/add-student',student.addStudent)
        // editing a student
        router.put('/edit-student/:id',student.updateAStudent)
        // // deleting a student
        router.delete('/delete-student/:id',student.deleteAStudent)
        // // studnet info
        router.get('/get-student-info/:id',student.getAStudent)
module.exports = router
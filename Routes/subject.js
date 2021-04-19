const express = require('express');


const subject = require('../controllers/subjectController')

const router= express.Router();
        // subject router
        router.get('/',subject.getAllSubject);
        // adding a subject
        router.post('/add-subject',subject.addSubject)
        // // editing a student
        router.put('/edit-subject/:id',subject.updateASubject)
        // deleting a student
        router.delete('/delete-subject/:id',subject.deleteASubject)
        // getting subject info
        router.get('/get-subject-info/:id',subject.getASubject)
module.exports = router
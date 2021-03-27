const express = require('express');
const router= express.Router();
        // student router
        router.get('/',(req, res) => {
        res.send('hello from students')
        });

        // adding a student
        router.post('/add-student',(req,res)=>{
            res.send('student added successfully')
        })

        // editing a student
        router.put('/edit-student/:id',(req,res)=>{
  
            const studentId = req.params.id

            if(!studentId){
               res.json({
                   "message":"sorry we have no such student",
                   "status":"401"
               },401)
            }

            res.send('student edited successfully')
        })
        // deleting a student
        router.delete('/delete-student',(req,res)=>{
            res.send('student deleted successfully')
        })
        // student info
        router.get('/get-student-info/:id',(req,res)=>{
            const studentId = req.params.id
            if(!studentId){
                res.json({
                    "message":"we have no such student",
                    "status":"401"
                },401)
            }

            res.send("student's information")
        })
module.exports = router
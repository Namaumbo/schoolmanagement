'use strict'

const {
    response
} = require("express");
const {
    Op, where
} = require("sequelize");

// getting all students
exports.getAllStudents = async (req, res) => {

    const allStudents = require('../models/students.js').findAll({
        attributes: [
            "firstName",
            "lastName",
            "sex",
            "dateOfBirth",
            "address"
        ]

    });
    if((await allStudents).length==0){
        res.status(409).json({
            "message":"Opps there is no student currently",
        })
        return false;
    }

    allStudents.then(response => {
        if (response) {
            res.status(200).json({
                "message": "the list of students",
                "details": response
            })

        } else {
            res.status(400).json({
                "message": "no students"
            })
        }
    }).catch(err => {
        res.status(500).json({
            "message": err.message
        })
    })

}

// *******************************
//getting a single student
// *********************************
exports.getAStudent = (req, res, next) => {
    const id = req.params.id;

    const aStudent = require('../models/students.js').findByPk(id)
    aStudent.then(response => {
        if (!response) {
            res.status(401).json({
                "message": "There is no such student",
                "detail": {}
            })
        }
        if (id === null) {
            res.status(401).json({
                "message": "There is no such user with such name",
                "detail": {}
            })
        }
        res.status(200).json({
            "message": "student available",
            "details": response
        })

    }).catch(
          
    )

}
// *************************
// adding a student
// ***********************

exports.addStudent = async (req, res) => {

    //object holding the request body
    const {
        firstName,
        lastName,
        sex,
        dateOfBirth,
        address,
        isRegisteredStudent
    } = req.body


    //checking existsense and saving

    const existenceStudent = await require('../models/students').findOne({
        where: {
            firstName,
            lastName
        }
    })
    if (existenceStudent) {
        res.status(409).json({
            "message": "student already in the database",
            "student": existenceStudent
        })
    } else {
        await require("../models/students").create(req.body)
            
            .then(response => {
                res.status(201).json({
                    "message": "student added successfully",
                    "details": response,
                })
            })
            .catch(error => {
                console.log(error)
                return res.status(500).json({
                    "message": error.message
                })
            })
    }
}
//updating a student

exports.updateAStudent = (req, res, next) => {
    const id = req.params.id;
    const student = require("../models/students.js").update(req.body, {
        where: {
            id
        }
    })
    student.then(response => {
            if (response == 1) {
                res.status(200).json({
                    "message": "student updated successfully",
                })
            } else {
                res.status(400).json({
                    "message": "no such student"
                })
            }
        })

        .catch(error => {
            console.error(error)
            res.status(500).json({
                "message": "Opps there was an error",
            })
        })
}


//deleting a student 

exports.deleteAStudent = (req, res, next) => {
    const id = req.params.id

    const deleteStudent = require('../models/students.js').destroy({
        where: {
            id
        }
    })

    deleteStudent.then(response => {

        if (response == 1) {
            res.status(201).json({
                "message": `student with ${id} was deleted succefully`
            })
        } else {
            res.status(400).json({
                "message": `no such student with ${id}`
            })
        }
    }).catch(error => {
        console.error(error)
        res.status(500).json({
            "message": "Ops where is an error"
        })
    })

}

// **********************************
//adding subjects to students
// **********************************

exports.subjects_to_students = async (req,res)=>{

    const id = req.params.id

   const student =  require("../models/students").findOne({
       where: {id}
   })
//    const subject = require("../models/subjects").findOne({
//         where: {id}
//         })
   if((await student).length==0){
       res.status(409).json({
           "message": "You have no students \n please add a student first"
       })
   }
   else if(student == null){
        res.status(401).json({
            "message": "check the name and try again"
        })

   }
   else{
       // if student exists
       if(res.status === 200 && student){
         if((await subject).length == 0){
             res.status(409).json({
                 "message": "you have no subject \n please add a subject first"
             })
         }
         else if(subject==null){
             res.status(401).json({
                 "message":"check the subject name and try again"
             })
         }
         else{
            //  if student and subject exist
            
       try {

    } catch (error) {
        res.status(500).json(error)
    }
         }

       }

   }
}
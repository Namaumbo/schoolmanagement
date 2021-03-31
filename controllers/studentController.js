'use strict'

const { response } = require("express")

// getting all students
exports.getAllStudents = async (req, res, next) => {

const allStudents = require('../models/students.js').findAll();

allStudents.then(response=>{
    if(response){
        res.status(200).json({
            "message":"the list of students",
            "details": response
        })
        
    }
    else{
        res.status(400).json({
            "message":"no students"
        })
    }
}).catch(err=>{
    res.status(500).json({
        "message":err.message
    })
})

}

//getting a single student
exports.getAStudent = (req,res,next)=>{
    const id = req.params.id;

    const aStudent= require('../models/students.js').findByPk(id)
  aStudent.then(response => {
    if(!response){
        res.status(401).json({
            "message":"There is no such student",
            "detail":{}
        })
    }
    if(!id){
        res.status(401).json({
            "message":"There is no such user with such name",
            "detail":{}
        })
    }
        res.status(200).json({
            "message":"student available",
            "details": response
        })

  })
  

}

// adding a student
exports.addStudent = async (req, res, next) => {

//object holding the request body
    const {
        firstName,
        lastName, 
        sex, 
        perfomanceTrend,
        dateOfBirth, 
        address,
        studentResults
         } = req.body

    try {

        //check for existence
    
        const student= await  require("../models/students").create({ 
            firstName,
            lastName,
            sex, 
            perfomanceTrend,
            dateOfBirth, 
            address,
            studentResults
        })
            res.status(201).json({
            "message":"student added successfully",
            "details":student
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({"message":error.message})
}
}
//updating a student

exports.updateAStudent =  (req,res,next)=>{
    const id = req.params.id;
    const student = require("../models/students.js").update(req.body,{ where:{id}})
        student.then(response => {
            if(response == 1){
            res.status(200).json({
                "message":"student updated successfully",
            }) } 
            else{
                res.status(400).json({
                    "message":"no such student"
                })
            }
        })
    
    .catch (error  => {
        console.error(error)
        res.status(500).json({
            "message":"Opps there was an error",
        })
    })
}


//deleting a student 

exports.deleteAStudent = (req,res,next)=>{
    const id = req.params.id

    const deleteStudent = require('../models/students.js').destroy({where:{id}})

    deleteStudent.then(response =>{
        
        if(response == 1){
       res.status(201).json({
           "message":`student with ${id} was deleted succefully`
       })
    }  else{
        res.status(400).json({
            "message":`no such student with ${id}`
        })
    }
    }).catch(error =>{
        console.error(error)
        res.status(401).json({
            "message":"Ops where is an error"
        })
    })
   
}
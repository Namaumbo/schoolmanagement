'use strict'

const { response } = require("express")

//creating a staff
exports.addStaff = async (req, res, next) => {

    //object holding the request body
    const {
        firstName,
        lastName, 
        gender, 
        email,
        dateOfBirth, 
        phoneNumber,
        password } = req.body

    try {

        //check for existence
    

        const staff = await  require("../models/staffs.js").create({ 
            firstName,
            lastName,
            gender,
            email,
            dateOfBirth, 
            phoneNumber,
            password 
        })
            res.status(201).json({
            "message":"staff added successfully",
            "details":staff
        })
    }
    catch (error) {
        return res.status(500).json({"message":error.message})
    }
}

// getting all the staffs
exports.getAllStaffs = (req,res,next)=>{
    const allStaffs = require('../models/staffs').findAll()
    allStaffs.then(response => {
        res.send({
           "message":"all staffs available",
           "details" : response
        })
    })
}

//getting a single staff
exports.getAstaff = (req,res,next)=>{
    const id = req.params.id;

    const aStaff = require('../models/staffs').findByPk(id)
  aStaff.then(response => {
    if(!response){
        res.status(401).json({
            "message":"There is no such user",
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
            "message":"we have that staff",
            "details": response
        })

  })
  

}

//updating a staff
exports.updateAStaff =  (req,res,next)=>{
    const id = req.params.id;
    const staff = require("../models/staffs.js").update(req.body,{ where:{id}})
        staff.then(response => {
            if(response == 1){
            res.status(200).json({
                "message":"staff updated successfully",
            }) } 
            else{
                res.status(400).json({
                    "message":"no such user"
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

exports.deleteAStaff = (req,res,next)=>{
    const id = req.params.id
    const deleteStaff = require('../models/staffs').destroy({where:{id}})
    deleteStaff.then(response =>{
        console.log(response)
        if(response == 1){
       res.status(201).json({
           "message":`user with ${id} was deleted succefully`
       })
    }  else{
        res.status(400).json({
            "message":`no such user with ${id}`
        })
    }
    }).catch(error =>{
        console.error(error)
        res.status(401).json({
            "message":"Ops where is an error"
        })
    })
   
}


// const { response } = require("express")
const Staff = require("../models/staffs")

//creating a staff
exports.addStaff = async (req, res, next) => {

    //object holding the request body
    const { staffName, gender, email, dateOfBirth, phoneNumber } = req.body

    try {
        // staff.staffName = req.body.staffName
        // staff.gender=req.body.gender
        // staff.email=req.body.email
        // staff.dateOfBirth=req.body.dateOfBirth
        // staff.phoneNumber=req.body.phoneNumber
        const staff = await Staff.create({ staffName, gender, email, dateOfBirth, phoneNumber })

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ "message": "there is an error" })
    }






}

// getting all the staffs
exports.getAllStaffs = (req,res,next)=>{
    res.send("all staffs gotten succefually")
}

//getting a single staff
exports.getAstaff = (req,res,next)=>{
    res.send("a staff detail gotten")
}

//updating a staff
exports.updateAStaff =(req,res,next)=>{
    res.send("a staff updated succefully")
}

exports.deleteAStaff = (req,res,next)=>{
    res.send('a staff deleted')
}
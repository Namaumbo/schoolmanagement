"use strict";
const { response } = require("express");
const { boolean } = require("joi");
const { Op, where, json } = require("sequelize");

const Stundent = require("../models/students.model");
const Subject = require("../models/subjects.model");

// getting all students
exports.getAllStudents = async (req, res) => {
  const allStudents = Stundent.findAll({
    attributes: ["firstName", "lastName", "sex", "dateOfBirth", "address"],
  });
  if ((await allStudents).length == 0) {
    res.status(409).json({
      message: "Opps there is no student currently",
    });
    return false;
  }

  allStudents
    .then((response) => {
      if (response) {
        res.status(200).json({
          message: "the list of students",
          details: response,
        });
      } else {
        res.status(400).json({
          message: "no students",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

// *******************************
//getting a single student
// *********************************
exports.getAStudent = (req, res, next) => {
  const id = req.params.id;

  const aStudent = Stundent.findOne({
     where:{id} ,
    attributes: ["id","firstName","lastName","isRegisteredStudent"],
    include:{
      model: Subject,
      attributes: ["subjectId","subjectName","subjectCode",]
    },
  });
  aStudent
    .then((response) => {
      if (!response) {
        res.status(401).json({
          message: "There is no such student",
        });
      }
      if (aStudent === null) {
        res.status(401).json({
          message: "There is no such user with such name",
        });
      }

      let subArray = []
    response.subjects.forEach(subject =>{
      const sub = {
        subId : subject.subjectId,
        subjectName:subject.subjectName,
        subjectCode:subject.subjectCode,
      }
      subArray.push(sub)
    })

    const studentDto ={
      id:response.id,
      firstName : response.firstName,
      lastName : response.lastName,
      isRegisteredStudent : response.isRegisteredStudent,
      subjects : subArray
    }
  
      res.status(200).json({
        message: "student available",
        details: studentDto,
      });
    })
    .catch();
};
// *************************
// adding a student
// ***********************

exports.addStudent = async (req, res) => {
  //object holding the request body
  const {
    firstName,
    lastName,
  } = req.body;

  //checking existsense and saving

  const existenceStudent = await Stundent.findOne({
    where: {
      firstName,
      lastName,
    },
  });
  if (existenceStudent) {
    res.status(409).json({
      message: "student already in the database",
      student: existenceStudent,
    });
  } else {
    await require("../models/students")
      .create(req.body)

      .then((response) => {
        res.status(201).json({
          message: "student added successfully",
          details: response,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          message: error.message,
        });
      });
  }
};
//updating a student

exports.updateAStudent = (req, res, next) => {
  const id = req.params.id;
  const student = Stundent.update(req.body, {
    where: {
      id,
    },
  });
  student
    .then((response) => {
      if (response == 1) {
        res.status(200).json({
          message: "student updated successfully",
        });
      } else {
        res.status(404).json({
          message: "no such student",
        });
      }
    })

    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Opps there was an error",
      });
    });
};

//deleting a student

exports.deleteAStudent = (req, res, next) => {
  const id = req.params.id;

  const deleteStudent = Stundent.destroy({
    where: {
      id,
    },
  });

  deleteStudent
    .then((response) => {
      if (response == 1) {
        res.status(201).json({
          message: `student with ${id} was deleted succefully`,
        });
      } else {
        res.status(400).json({
          message: `no such student with ${id}`,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Ops where is an error",
      });
    });
};




exports.add_subject_to_student = async (req, res) => {
  const id = req.params.id;
  
  const aStudent = await Stundent.findByPk(id);

  if (aStudent) {
      const foundSubject = await Subject.findOne({
        where: { subjectCode:req.body.subjectCode },
      });
      if (foundSubject) {
        const registeredStudent = Object.assign(aStudent,{isRegisteredStudent:true})
        await registeredStudent.addSubject(foundSubject);
        res.send("successfully save a student");
      } else {
      res.send("there was an error").status(500)
      }
};
};

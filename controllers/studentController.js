"use strict";
const { response } = require("express");
const { Op, where, json } = require("sequelize");

const Stundent = require("../models/students");
const Subject = require("../models/subjects");

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
    attributes: ["id","firstName","lastName"],
    include:{
      model: Subject,
    },
  });
  aStudent
    .then((response) => {
      if (!response) {
        res.status(401).json({
          message: "There is no such student",
          detail: {},
        });
      }
      if (aStudent === null) {
        res.status(401).json({
          message: "There is no such user with such name",
          detail: {},
        });
      }
      res.status(200).json({
        message: "student available",
        details: response,
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
    sex,
    dateOfBirth,
    address,
    isRegisteredStudent,
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
        res.status(400).json({
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
    req.body.subjectCode.forEach(async (subject) => {
      const foundSubject = await Subject.findOne({
        where: { subjectCode: subject },
      });

      if (foundSubject) {
        await aStudent.addSubject(foundSubject);
        res
          .status(201)
          .json({
            message: "succefully saved the subjects",
            details: aStudent,
          });
      } else {
        (error) => {
          res.send(error);
        };
      }
    });
  } else if (aStudent == null) {
    res.status(409).send("misala");
  }
};

// req.body.subjectCode.forEach(async (subjectCode) => {

// const subject = await Subject.findOne({ where: {subjectCode }});

// res.send(subject)
//  subject.then(i=>{console.log(i)}).catch(error => {console.log(error)})
// if (subject) {
//   student.addSubject(subject);
//   res.status(200).send("ok");
// } else {
//   console.error("we cant find anything");
// }

// **********************************
//adding subjects to students
// **********************************

// exports.add_subject_to_student = async (registrationNumber, subjectCode) => {
//   const student = await require("../models/students").findOne({
//     where: { registrationNumber },
//   });

//   if ((await student).length == 0) {
//     res.status(409).json({
//       message: "You have no students \n please add a student first",
//     });
//   } else if (student == null) {
//     res.status(401).json({
//       message: "check the name and try again",
//     });
//   } else {
//     // if student exists
//     if (res.status === 200 && student) {
//       const subject = require("../models/subjects").findOne({
//         where: {
//           subjectCode,
//         },
//       });
//       if ((await subject).length == 0) {
//         res.status(409).json({
//           message: "you have no subject \n please add a subject first",
//         });
//       } else if (subject == null) {
//         res.status(401).json({
//           message: "check the subject name and try again",
//         });
//       } else {
//         try {
//             student.addSubject(subject);
//         } catch (error) {
//           res.status(500).json(error);
//         }
//       }

//     }
//   }
// };

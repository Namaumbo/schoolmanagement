"use strict";

// const { is } = require('sequelize/types/lib/operators');

exports.getAllSubject = async (req, res, next) => {
  const allSubjects = require("../models/subjects.js").findAll({
    attributes: [
      "subjectId",
      "subjectName",
      "category",
      "creditHours",
      "teachersOnDuty",
      "subjectCode",
    ],
  });

  allSubjects
    .then((response) => {
      if (response) {
        res.status(200).json({
          message: "the list of subjects",
          details: response,
        });
      } else {
        res.status(400).json({
          message: "no subjects",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

//adding a subject

exports.addSubject = async (req, res, next) => {
  //object holding the request body
  const { subjectId, subjectName, category, creditHours, teachersOnDuty } =
    req.body;

  try {
    //check for existence
    const existenceSubject = await require("../models/subjects.js").findOne({
      where: {
        subjectName,
      },
    });
    if (existenceSubject) {
      res.json({
        message: "Subject already exists",
        subject: existenceSubject,
      });
    } else {
      const subject = await require("../models/subjects.js").create(req.body);
      res.status(201).json({
        message: "subject added successfully",
        details: subject,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// getting  a subject

exports.getASubject = (req, res, next) => {
  const id = req.params.id;
  const aSubject = require("../models/subjects.js").findByPk(id);
  aSubject
    .then((response) => {
      if (!response) {
        res.status(401).json({
          message: "There is no such subject",
          detail: {},
        });
      }
      res.status(200).json({
        message: "subject available",
        details: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Opps there is an error",
        details: err,
      });
    });
};

// updating a subject

exports.updateASubject = (req, res, next) => {
  const subjectId = req.params.id;
  const subject = require("../models/subjects.js").update(req.body, {
    where: { subjectId },
  });
  subject
    .then((response) => {
      if (response == 1) {
        res.status(200).json({
          message: "subject updated successfully",
        });
      } else {
        res.status(400).json({
          message: "no such subject",
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Opps there was an error",
        details: error,
      });
    });
};

// deleting a subject

exports.deleteASubject = (req, res, next) => {
  const subjectId = req.params.id;

  const deleteSubject = require("../models/subjects.js").destroy({
    where: { subjectId },
  });

  deleteSubject
    .then((response) => {
      if (response == 1) {
        res.status(201).json({
          message: `subject with ${subjectId} was deleted succefully`,
        });
      } else {
        res.status(400).json({
          message: `no such subject with ${subjectId}`,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(401).json({
        message: "Ops where is an error",
      });
    });
};

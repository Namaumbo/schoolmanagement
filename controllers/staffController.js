"use strict";

const { response } = require("express");
const bcrypt = require("bcrypt");
const Staff = require("../models/staffs.js");

const jwt = require("jsonwebtoken");

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
    password,
  } = req.body;

  try {
    //check for existence
    const existenceStaff = await require("../models/staffs").findOne({
      where: {
        email,
        firstName,
        lastName,
      },
    });
    if (existenceStaff) {
      res.json({
        message: "Staff already exists",
        staff: existenceStaff,
      });
    } else {
      const salt = await bcrypt.genSalt(10);

      //hashing the user password
      const hashed_password = await bcrypt.hash(password, salt);

      //  changing the password into hashed password

      const new_staff = Object.assign(req.body, {
        password: hashed_password,
      });

      const staff = await Staff.create(new_staff);
      res.status(201).json({
        message: "staff added successfully",
        details: staff,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// getting all the staffs
exports.getAllStaffs = async (req, res, next) => {
  const allStaffs = require("../models/staffs").findAll({
    attributes: [
      "firstName",
      "lastName",
      "gender",
      "email",
      "dateOfBirth",
      "phoneNumber",
    ],
  });
  allStaffs.then((response) => {
    res.send({
      message: "all staffs available",
      details: response,
    });
  });
};

//getting a single staff
exports.getAstaff = (req, res, next) => {
  const id = req.params.id;

  const aStaff = Staff.findByPk(id);
  aStaff.then((response) => {
    if (!response) {
      res.status(401).json({
        message: "There is no such user",
        detail: {},
      });
    }
    if (id == null) {
      res.status(401).json({
        message: "no user chosen",
        detail: {},
      });
    }
    res.status(200).json({
      message: "we have that staff",
      details: response,
    });
  });
};

//updating a staff
exports.updateAStaff = (req, res, next) => {
  const id = req.params.id;
  const staff = Staff.update(req.body, {
    where: {
      id,
    },
  });
  staff
    .then((response) => {
      if (response == 1) {
        res.status(200).json({
          message: "staff updated successfully",
        });
      } else {
        res.status(400).json({
          message: "no such user",
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

exports.deleteAStaff = (req, res, ) => {
  const id = req.params.id;
  const deleteStaff = require("../models/staffs").destroy({
    where: {
      id,
    },
  });
  deleteStaff
    .then((response) => {
      console.log(response);
      if (response == 1) {
        res.status(201).json({
          message: `user with ${id} was deleted succefully`,
        });
      } else {
        res.status(400).json({
          message: `no such user with ${id}`,
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

exports.loginAStaff = async (req, res, token) => {
  const { email, password } = req.body;

  const staff = await Staff.findOne({ where: { email } });

  if (!staff) return res.status(404).send("wrong email please try again");
  else {
    const checkPassword = await bcrypt.compare(password, staff.password);

    if (!checkPassword) return res.status(409).send("wrong password");
    else {
          const token = jwt.sign({phoneNumber:req.body.phoneNumber}, process.env.SECRET_KEY, {
          expiresIn: 3600,
        });
      res.status(200).json({ success: "login successfully" ,token });
    }
  }
};

const express = require("express");
const router = express.Router();
const staffs = require("../controllers/staffController.controller");
const {genereteToken , verifyToken}= require("../middlewares/authMiddleware.middleware");
// staff router
router.get("/", staffs.getAllStaffs);
// adding a staff
router.post("/add-staff", staffs.addStaff);
// editing a staff
router.put("/edit-staff/:id", staffs.updateAStaff);
// deleting a staff
router.delete("/delete-staff/:id", staffs.deleteAStaff);
// staff info
router.get("/get-staff-info/:id", staffs.getAstaff);
//staff login
router.post("/login-staff", staffs.loginAStaff);
module.exports = router;

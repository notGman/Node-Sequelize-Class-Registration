const express = require("express");
const {adminAuth,studentAuth} = require('../../middlewares/auth')
const router = express.Router();
const {
  getAllRegistrations,
  getRegistrationByClass,
  registerStudentToClass,
  getRegistrationByStudent,
  deleteRegistration,
  updateRegistration
} = require("./controller");

router.get("/",adminAuth, getAllRegistrations);
router.get("/class/:classCode",adminAuth, getRegistrationByClass);
router.post("/student",studentAuth, registerStudentToClass);
router.get("/student/:regNum",adminAuth, getRegistrationByStudent);
router.delete("/:registrationID",adminAuth, deleteRegistration);
router.patch("/:registrationID",adminAuth,updateRegistration)

module.exports = router;

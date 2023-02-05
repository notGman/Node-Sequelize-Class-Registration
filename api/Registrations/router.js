const express = require("express");
const router = express.Router();
const { getAllRegistrations, getRegistrationByClass, registerStudentToClass,getRegistrationByStudent } = require("./controller");

router.get("/", getAllRegistrations);
router.get("/class/:classCode", getRegistrationByClass);
router.post("/student/:regNum/:classCode", registerStudentToClass);
router.get("/student/:regNum",getRegistrationByStudent)

module.exports = router;

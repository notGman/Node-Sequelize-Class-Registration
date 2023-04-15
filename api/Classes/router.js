const express = require("express");
const {adminAuth,studentAuth} = require('../../middlewares/auth')
const router = express.Router();

const { getAll,allClass,getClassByID,updateClass,deleteClass } = require("./controller");

router.get("/", getAll);
router.post("/add",adminAuth,allClass);
router.get("/:classID",getClassByID)
router.post("/",adminAuth,updateClass)
router.delete("/:classID",adminAuth,deleteClass)

module.exports = router;

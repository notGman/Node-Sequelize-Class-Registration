const express = require("express");
const router = express.Router();

const { getAll,allClass,getClassByID,updateClass,deleteClass } = require("./controller");

router.get("/", getAll);
router.post("/add",allClass);
router.get("/:classID",getClassByID)
router.post("/",updateClass)
router.delete("/:classID",deleteClass)

module.exports = router;

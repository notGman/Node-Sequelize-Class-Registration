const express = require("express");
const router = express.Router();

const { getAll,allClass } = require("./controller");

router.get("/", getAll);
router.post("/add",allClass);

module.exports = router;

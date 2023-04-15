const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

exports.adminAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(400).json({ status: "Failed", message: "A token is required" });
  try {
    const decode = jwt.verify(token.split(" ")[1], process.env.JWTTOKEN);
    next();
  } catch (error) {
    return res.status(400).json({ status: "Failed", message: "Unauthorized user" });
  }
};

exports.studentAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(400).json({ status: "Failed", message: "A token is required" });
  try {
    const decode = jwt.verify(token.split(" ")[1], process.env.JWTSTUDENTTOKEN);
    console.log(decode);
    req.regNum = decode.regNum
    next();
  } catch (error) {
    return res.status(400).json({ status: "Failed", message: "Unauthorized user" });
  }
};

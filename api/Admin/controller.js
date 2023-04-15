const Admin = require("../../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createAdmin = async (req, res) => {
  try {
    const { admin_id, admin_password } = req.body;
    if (admin_id == "" || admin_password == "")
      return res.status(400).json({ status: "Failed", message: "Please enter all the required details" });
    const findAdmin = await Admin.findAll();
    if (findAdmin != "") return res.status(400).json({ status: "Failed", message: "Admin already exisits" });
    const hash = await bcrypt.hash(admin_password, 10);
    const token = jwt.sign({ admin_id }, process.env.JWTTOKEN, { expiresIn: "2h" });
    const newAdmin = await Admin.create({
      admin_id,
      admin_password: hash,
    });
    return res.status(200).json({ status: "Success", message: "Admin created successfully", token });
  } catch (error) {
    return res.status(400).json({ status: "Failed", message: "Unable to create Admin" });
  }
};

exports.validateAdmin = async (req, res) => {
  try {
    const { admin_id, admin_password } = req.body;
    if (admin_id == "" || admin_password == "")
      return res.status(400).json({ status: "Failed", message: "Please enter all the required details" });
    const findAdmin = await Admin.findOne();
    if (findAdmin == "") return res.status(400).json({ status: "Failed", message: "Please create an Admin" });
    const pass = await bcrypt.compare(admin_password, findAdmin.admin_password);
    if (findAdmin.admin_id == admin_id && pass) {
      const token = jwt.sign({ admin_id }, process.env.JWTTOKEN, { expiresIn: "2h" });
      findAdmin.token = token;
      findAdmin.save();
      return res.status(200).json({ status: "Success", message: "Admin found", token });
    }
    return res.status(200).json({ status: "Failes", message: "Admin not found" });
  } catch (error) {
    return res.status(400).json({ status: "Failed", message: "Unable to validate Admin" });
  }
};

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Student = require("../../models/student");

exports.getall = async (req, res) => {
  try {
    const allStudents = await Student.findAll();
    return res.status(200).json({ status: "success", data: allStudents });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: "Failed", message: error.message });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { regNum, name, department, yearOfStudy, email, password } = req.body;
    if ((regNum == "" || name == "" || department == "" || yearOfStudy == "" || email == "", password == ""))
      return res.status(400).status({ status: "Failed", message: "Please enter all the required details" });
    const findStudent = await Student.findOne({
      where: {
        regNum,
      },
    });
    if (findStudent) return res.status(400).json({ status: "Failed", message: "User already exists" });
    const token = jwt.sign({ regNum, name }, process.env.JWTSTUDENTTOKEN, { expiresIn: "2h" });
    const userPassword = await bcrypt.hash(password, 10);
    const newStudent = await Student.create({
      regNum,
      name,
      department,
      yearOfStudy,
      email,
      token,
      password: userPassword,
    });
    const student = await Student.findOne({
      where: {
        regNum,
      },
      attributes: {
        exclude: ["password", "registered"],
      },
    });
    return res.status(200).json({ status: "success", data: student });
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
};

exports.studentLogin = async (req, res) => {
  try {
    const { regNum, password } = req.body;
    if(regNum ==""|| password=="")
    return res.status(400).json({status:'Failed',message:'Please enter all the required details'})
    const findStudent = await Student.findOne({
      where:{
        regNum
      }
    })
    if(!findStudent)
    return res.status(400).json({status:'Failed',message:'regNum or password incorrect'})
    const pass =await bcrypt.compare(password,findStudent.password)
    if(pass){
      const token = jwt.sign({regNum},process.env.JWTSTUDENTTOKEN,{expiresIn:'2h'})
      findStudent.token=token
      await findStudent.save()
      return res.status(200).json({status:'Success',message:'Login successful',token})
    }
    return res.status(400).json({ status: "failed", message: 'regNum or password incorrect' });
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { regNum } = req.body;
    const findStudent = await Student.findOne({
      where: {
        regNum,
      },
    });
    if (findStudent) {
      await findStudent.destroy();
      res.status(200).json({ status: "success", message: "User deleted" });
    }
    res.status(400).json({ status: "success", message: "Unable to find user" });
  } catch (error) {}
};

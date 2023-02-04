const Student = require("../../models/student");

exports.getall = async (req, res) => {
  try {
    const allStudents = await Student.findAll();
    return res.status(200).json({ status: "success", data: allStudents });
  } catch (error) {
    console.error(error);
    return res.status(400).json({status:'Failed',message:error.message})
  }
};

exports.addStudent = async(req,res)=>{
  try {
    const newStudent = await Student.create({
      regNum:req.body.regNum,
      name:req.body.name,
      department:req.body.department,
      yearOfStudy:req.body.yearOfStudy,
      email:req.body.email,
    })
    return res.status(200).json({status:'success',data:newStudent})
  } catch (error) {
    return res.status(400).json({status:'failed',message:error.message})
  }
}


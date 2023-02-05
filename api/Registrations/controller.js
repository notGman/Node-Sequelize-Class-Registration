const Registration = require('../../models/registration')
const Student = require('../../models/student')
const Class = require('../../models/class')


exports.registerStudentToClass = async(req,res)=>{
  try{
    const {regNum,classCode} = req.params
    if(!regNum || !classCode)
      return res.status(400).json({status:'Failed',message:"Both StudentReg and ClassCode are required"})
    const findStudent = await Student.findOne({
      where:{
        regNum
      }
    })
    if(!findStudent)
      return res.status(400).json({status:"Failed",message:"Student does not exist"})
    const findClass = await Class.findOne({
      where:{
        classCode
      }
    })
    if(!findClass)
      return res.status(400).json({status:"Failed",message:"Class does not exist"})
    if(findClass.totalSeats >= 60)
      return res.status(400).json({status:"Failed",message:"Class strength reached"})

    const existingReg = await Registration.findOne({
      where:{
        regNum
      }
    })
    if(existingReg || findStudent.registered)
     return res.status(400).json({status:"Failes",message:"Student already registered to class"})
    const registration = await Registration.create({
      regNum:regNum,
      classCode:classCode
    })
    findClass.totalSeats = await findClass.totalSeats+1
    findClass.save()
    return res.status(200).json({status:'Success',data:registration})
  }catch(error){
    return res.status(400).json({ststus:'Failed',message:error.message})
  }
}

exports.getAllRegistrations = async(req,res)=>{
  try{
    const allRegistrations = await Registration.findAll({
      include:[
        {
          model:Student
        },
        {
          model:Class
        }
      ]
    })
    return res.status(200).json({status:"Success",data:allRegistrations})
  }catch(error){
    return res.status(400).json({ststus:'Failed',message:error.message})
  }
}

exports.getRegistrationByClass = async(req,res)=>{
  try{
    const {classCode} = req.params
    const classRegistration = await Registration.findOne({
      where:{
        classCode
      },
      include:[
        {
          model:Student
        },
        {
          model:Class
        }
      ]
    })
    return res.status(200).json({ststus:'Success',data:classRegistration})
  }catch(error){
    return res.status(400).json({ststus:'Failed',message:error.message})
  }
}

exports.getRegistrationByStudent = async(req,res)=>{
  try{
    const {regNum} = req.params
    const studentRegestration = await Registration.findOne({
      where:{
        regNum
      },
      include:[
        {
          model:Student
        },
        {
          model:Class
        }
      ]
    })
    return res.status(200).json({status:"Success",data:studentRegestration})
  }catch(error){
    return res.status(400).json({status:"Failed",message:error.message})
  }
}

const Registration = require('../../models/registration')
const Student = require('../../models/student')
const Class = require('../../models/class')


exports.registerStudentToClass = async(req,res)=>{
  try{
    const {classCode} = req.body
    const regNum = req.regNum
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

    const existingReg = await Registration.findOne({
      where:{
        regNum
      }
    })
    if(existingReg)
    return res.status(400).json({status:'Failed',message:'User already registered'})
    const registration = await Registration.create({
      regNum:regNum,
      classCode:classCode
    })
    findStudent.registered_classes += classCode +" ";
    findStudent.save()
    return res.status(200).json({status:'Success',data:registration})
  }catch(error){
    return res.status(400).json({ststus:'Failed',message:error.message})
  }
}

exports.deleteRegistration = async(req,res)=>{
  try{
    const {registrationID} = req.params
    const registrationDetail = await Registration.findOne({
      where:{
        registrationID
      }
    })
    if(!registrationDetail)
      return res.status(400).json({status:'Success',message:'Registration does not exist'})
    await registrationDetail.destroy()
    
    const classDetail = await Class.findOne({
      where:{
        classCode:registrationDetail.classCode
      }
    })
    return res.status(200).json({status:"200"})
  }catch(error){
    return res.status(400).json({status:"Failed",message:error.message})
  }
}

exports.updateRegistration = async(req,res)=>{
  try{
    const {registrationID} = req.params
    const registrationDetail = await Registration.findOne({
      where:{
        registrationID
      }
    })
    if(!registrationDetail)
      return res.status(400).json({status:'Success',message:'Registration does not exist'})
    
    for(let key in req.body)
      if(key!=registrationDetail){
        
      }
  }catch(error){
    return res.status(400).json({status:"Failed",message:error.message})
  }
}

exports.getAllRegistrations = async(req,res)=>{
  try{
    const allRegistrations = await Registration.findAll({
      include:[
        {
          model:Student,
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
    const studentRegestration = await Registration.findAll({
      where:{
        regNum
      },
      include:[
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

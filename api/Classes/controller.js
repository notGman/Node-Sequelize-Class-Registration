const Class = require('../../models/class')

exports.getAll=async(req,res)=>{
  try {
    const allClasses = await Class.findAll()
    return res.status(200).json({status:"Success",data:allClasses})
  } catch (error) {
    console.error(error);
    return res.status(400).json({status:'Failed',message:error.message})
  }
}

exports.allClass = async(req,res)=>{
  try{
    const {classCode,className,facultyName,timeslot,credits} = req.body
    const newClass = await Class.create({
      classCode,
      className,
      facultyName,
      timeslot,
      credits
    })
    return res.status(201).json({status:"Success",data:newClass})
  } catch(error){
    return res.status(400).json({status:'Failed',message:"An error occurred"})
  }
}

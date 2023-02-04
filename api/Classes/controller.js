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

exports.getClassByID = async(req,res)=>{
  try{
    const className = await Class.findOne({
      where:{
        classCode:req.params.classID
      }
    })
    return res.status(200).json({status:"Success",data:className})
  } catch(error){
    return res.status(400).json({status:"Failed",message:error.message})
  }
}

exports.updateClass = async(req,res)=>{
  try{
    if(!req.body.classCode)
      return res.status(400).json({status:'Failed',message:"A Class code in required"})
    const updatedClass = await Class.findOne({
      where:{
        classCode:req.body.classCode
      }
    })

    if(updatedClass){
      for (let key in req.body)
        if(key!=="classID" && updatedClass[key]!==req.body[key])
          updatedClass[key] = req.body[key]
      await updatedClass.save()
      return res.status(400).json({status:"Success",data:updatedClass})
    }
    return res.status(400).json({status:'Failed',message:'Unable to find class'})
  }catch(error){
    return res.status(400).json({status:"Failed",message:error.message})
  }
}

exports.deleteClass = async(req,res)=>{
  try{
    const deleteClass = await Class.findOne({
      where:{
        classCode:req.params.classID
      }
    })
    if(deleteClass){
      await deleteClass.destroy()
      return res.status(200).json({status:"Success",message:"Class details deleted"})
    }

    return res.status(400).json({status:"Failed",message:"Unable to find class"})
  }catch(error){
    console.log(error)
    return res.status(400).json({status:"Failed",message:error.message})
  }
}
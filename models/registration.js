const sequelize = require("../Services/database")
const {DataTypes} =require("sequelize")

const Student = require('./student')
const Class = require('./class')

const Registration = sequelize.define("registration",{
  registrationID:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  regNum:{
    type:DataTypes.STRING,
    references:{
      model:Student,
      key:"regNum"
    }
  },
  classCode:{
    type:DataTypes.STRING,
    references:{
      model:Class,
      key:"classCode"
    }
  }
},{timestamps:false})

Registration.belongsTo(Student,{foreignKey:"regNum"})
Registration.belongsTo(Class,{foreignKey:"classCode"})


module.exports = Registration
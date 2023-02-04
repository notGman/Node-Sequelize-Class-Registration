const sequelize = require('../Services/database')
const {DataTypes} = require('sequelize')

const Student = sequelize.define("students",{
  regNum:{
    type:DataTypes.STRING(100),
    allowNull:false,
    primaryKey:true
  },
  name:{
    type:DataTypes.STRING(300),
    allowNull:false
  },
  department:{
    type:DataTypes.STRING(100),
    allowNull:false
  },
  yearOfStudy:{
    type:DataTypes.INTEGER
  },
  email:{
    type:DataTypes.STRING(200),
    allowNull:false,
    unique:true
  }
},{timestamps: false})

module.exports = Student
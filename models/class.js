const sequelize = require("../Services/database")
const {DataTypes} = require('sequelize')

const Class = sequelize.define("class",{
  classCode:{
    type:DataTypes.STRING(100),
    allowNull:false,
    primaryKey:true
  },
  className:{
    type:DataTypes.STRING(200),
    allowNull:false
  },
  facultyName:{
    type:DataTypes.STRING(300),
    allowNull:false
  },
  timeslot:{
    type:DataTypes.STRING(200)
  },
  credits:{
    type:DataTypes.INTEGER
  },
  totalSeats:{
    type:DataTypes.INTEGER,
    defaultValue:0
  }
},{timestamps:false})

module.exports = Class
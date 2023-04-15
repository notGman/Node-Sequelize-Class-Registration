const sequelize = require("../Services/database")
const {DataTypes} = require('sequelize')

const Admin = sequelize.define("admin",{
    admin_id:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    admin_password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    token:{
        type:DataTypes.STRING
    }  
})

module.exports = Admin;
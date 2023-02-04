const Sequelize = require('sequelize')
const mysql = require('mysql2')

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host:process.env.HOST,
    dialect:'mysql'
  }
)

sequelize.authenticate().then(()=>{
  console.log("DB connected.")
}).catch(err=>{
  console.error("Unable to connect to db ",err)
})

sequelize.sync().then(()=>{
  console.log("Table created.")
}).catch(err=>{
  console.error("Unable to create tables ",err)
})

module.exports = sequelize
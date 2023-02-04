const express = require("express");
const cors = require("cors");
require('dotenv').config()

const sequelize = require('./Services/database')
const api = require('./api/router')

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api',api)

app.get('/',(req,res)=>{
  res.status(200).json({status:'success',message:"Server running"})
})

const port = process.env.PORT;
app.listen(port,()=>console.log(`Listening to port ${port}`));

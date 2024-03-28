const express = require("express");
const app = express()
const Homeroute = require("./Routes/Homeroute")
const taskroute = require("./Routes/Taskroute")
const cors = require("cors");
require("dotenv").config()
const { connect } = require("./config/db")

app.use(cors());
app.use(express.json())

app.use("/",Homeroute)
app.use("/task", taskroute)

app.listen(process.env.PORT, ()=>{ 
    console.log("Listening at port 8000")
    connect()
})
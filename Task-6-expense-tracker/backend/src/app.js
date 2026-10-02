//creating server and configurations
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const path = require("path")

const cors = require('cors')
const authRouter = require('./routes/auth.route')
const expenseRouter = require('./routes/expense.route')
const budgetRouter = require('./routes/budget.route')

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/expense", expenseRouter)
app.use("/api/budget", budgetRouter)
app.use(express.static("./public"))

// health check route = to setup an endpoint to prevent render sleep mode
app.get("/health", (req, res)=>{
  res.status(200).json({
    message: "OK"
  })
})

// wildcard route to serve index.html for any unmatched routes
app.use("*name",(req, res)=>{
  res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports = app
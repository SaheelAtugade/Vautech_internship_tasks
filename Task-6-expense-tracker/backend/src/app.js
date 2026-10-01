//creating server and configurations
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

const cors = require('cors')
const authRouter = require('./routes/auth.route')
const expenseRouter = require('./routes/expense.route')
const budgetRouter = require('./routes/budget.route')

app.use(cors({
    origin: "/api",
    credentials: true,
  }))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/expense", expenseRouter)
app.use("/api/budget", budgetRouter)

module.exports = app
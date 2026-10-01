const express = require("express");
const authUser = require("../middleware/auth.middleware");
const expenseRouter = express.Router();
const expenseController = require("../controllers/expense.controller")

//Creating an expense   
//POST = /api/expense
expenseRouter.post('/', authUser, expenseController.createExpenseController)

//Getting user expenses
//GET = /api/expense
expenseRouter.get('/', authUser, expenseController.getExpenseController)

//Deleting expense
//DELETE = /api/expense/:id
expenseRouter.delete('/:id', authUser, expenseController.deleteExpenseController)

//Updating expense
//UPDATE = /api/expense/:id
expenseRouter.patch('/:id', authUser, expenseController.updateExpenseController)

module.exports = expenseRouter
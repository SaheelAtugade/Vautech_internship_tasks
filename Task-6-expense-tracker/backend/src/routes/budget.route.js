const express = require("express");
const budgetRouter = express.Router();
const authUser = require("../middleware/auth.middleware");
const budgetController = require("../controllers/budget.controller");

//creating or updating the budget
//PUT = /api/budget
budgetRouter.put("/", authUser, budgetController.setBudgetController);

//GET = /api/budget
budgetRouter.get("/", authUser, budgetController.getBudgetController);

//GET = /api/budget/history
budgetRouter.get("/history", authUser,budgetController.getBudgetHistoryController,);

module.exports = budgetRouter;
const expenseModel = require("../models/expense.model");

//Creating an expense
async function createExpenseController(req, res) {
  try {
    const { title, amount, category, date, note } = req.body;

    const expense = await expenseModel.create({
      user: req.user.id,
      title,
      amount,
      category,
      date,
      note,
    });

    res.status(201).json({
      message: "Expense created...",
      expense,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Something went wrong while creating the expense",
    });
  }
}

//Getting user expenses
async function getExpenseController(req, res) {
  try {
    const expenses = await expenseModel
      .find({ user: req.user.id })
      .sort({ date: -1 });
    res.status(200).json({
      message: "Expenses of " + req.user.name,
      expenses,
    });
  } catch (error) {
    return res.status(500).json({
      message: "cannot fetch expenses",
    });
  }
}

//Deleting expense
async function deleteExpenseController(req, res) {
  try {
    const expense = await expenseModel.findOneAndDelete({
      user: req.user.id,
      _id: req.params.id,
    });

    if (!expense) {
      return res.status(404).json({
        message: "No expense found to delete",
      });
    }

    //success delete
    res.status(200).json({
      message: "Expense deleted...",
      expense,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid expense ID",
      });
    }
    res.status(500).json({
      message: "Error deleting the expense",
    });
  }
}

//Updating expense
async function updateExpenseController(req, res) {
  try {
    const { title, amount, category, date, note } = req.body;
    const updatedExpense = await expenseModel.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        title,
        amount,
        category,
        date,
        note,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    //success update
    res.status(200).json({
      message: "Expense updated...",
      updatedExpense,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid expense ID",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Error updating the expense",
    });
  }
}

module.exports = {
  createExpenseController,
  getExpenseController,
  deleteExpenseController,
  updateExpenseController,
};

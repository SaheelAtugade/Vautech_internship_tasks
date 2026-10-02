const budgetModel = require("../models/budget.model");

async function setBudgetController(req, res) {
  try {
    const { month, year, monthlyBudget } = req.body;

    // Invalid budget check
    if (
      month === undefined ||
      year === undefined ||
      monthlyBudget === undefined ||
      typeof month !== "number" ||
      typeof year !== "number" ||
      typeof monthlyBudget !== "number" ||
      month < 1 ||
      month > 12 ||
      monthlyBudget < 0
    ) {
      return res.status(400).json({
        message: "Invalid budget data",
      });
    }

    // Create or update budget for that month
    const budget = await budgetModel.findOneAndUpdate(
      {
        user: req.user.id,
        month,
        year,
      },
      {
        $set: {
          monthlyBudget,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    return res.status(200).json({
      message: "Budget saved...",
      budget,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to save budget",
    });
  }
}

async function getBudgetController(req, res) {
  try {
    const today = new Date();

    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const budget = await budgetModel.findOne({
      user: req.user.id,
      month,
      year,
    });

    return res.status(200).json({
      message: "Budget fetched",
      budget,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to fetch budget",
    });
  }
}

async function getBudgetHistoryController(req, res) {
  try {
    const budgets = await budgetModel
      .find({
        user: req.user.id,
      })
      .sort({
        year: -1,
        month: -1,
      });

    return res.status(200).json({
      message: "Budget history fetched",
      budgets,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to fetch budget history",
    });
  }
}

module.exports = {
  setBudgetController,
  getBudgetController,
  getBudgetHistoryController
};

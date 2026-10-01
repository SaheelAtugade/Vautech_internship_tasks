const budgetModel = require("../models/budget.model");

async function setBudgetController(req, res) {
  try {
    const { monthlyBudget } = req.body;

    //invalid budget check
    if (
      monthlyBudget === undefined ||
      typeof monthlyBudget !== "number" ||
      monthlyBudget < 0
    ) {
      return res.status(400).json({
        message: "Invalid monthly budget",
      });
    }

    //set budget in DB
    const budget = await budgetModel.findOneAndUpdate(
      {
        user: req.user.id,
      },
      {
        $set: {
          monthlyBudget: monthlyBudget,
        },
      },
      {
        new: true,
        upsert: true,
      },
    );

    //success response
    res.status(200).json({
      message: "Budget saved...",
      budget,
    });
  } catch (error) {
    res.status(500).json({
        message: "Failed to save budget"
    })
    console.log(error);
  }
}

async function getBudgetController(req, res) {
  try {
    // Each user has at most one current budget.
    const budget = await budgetModel.findOne({ user: req.user.id });

    return res.status(200).json({
      message: "Budget fetched",
      budget,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch budget",
    });
  }
}

module.exports = {
  setBudgetController,
  getBudgetController
};

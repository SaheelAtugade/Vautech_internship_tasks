const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },

    year: {
      type: Number,
      required: true,
    },

    monthlyBudget: {
      type: Number,
      required: [true, "budget value required"],
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// One budget per user for each month/year
budgetSchema.index(
  { user: 1, month: 1, year: 1 },
  { unique: true }
);

const budgetModel = mongoose.model("budgets", budgetSchema);

module.exports = budgetModel;
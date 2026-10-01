const { default: mongoose } = require("mongoose");

const budgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        unique: [true, "user must be unique"]
    },
    monthlyBudget: {
        type: Number,
        required: [true,"budget value required"],
        min: 0
    }
},{
    timestamps: true
})

const budgetModel = mongoose.model("budgets", budgetSchema)
module.exports = budgetModel
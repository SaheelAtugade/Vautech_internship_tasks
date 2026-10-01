const { default: mongoose } = require("mongoose");

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: [true, "title is required"]
    },
    amount: {
        type: Number,
        min: 1,
        required: true
    },
    category: {
        type: String,
        trim: true,
        enum: ["Food", "Travel", "Shopping", "Entertainment", "Bills", "Other"],
        required: [true, "category is required"],
    },
    date: {
        type: Date,
        default: Date.now
    },
    note: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})

const expenseModel = mongoose.model("expenses", expenseSchema)
module.exports = expenseModel
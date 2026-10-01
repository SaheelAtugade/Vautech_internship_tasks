const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User's name is required"]
    },
    email: {
        type: String,
        required: [true, "User's email is required"],
        unique: [true, "Email must be unique"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
    }
})

const userModel = mongoose.model("users", userSchema)
module.exports = userModel
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const userModel = require('../models/users.model')

async function authUser(req, res, next) {
    const token = req.cookies.jwt_token
    if(!token){
        return res.status(401).json({
            message: "Unauthorized| token not found"
        })
    }

    let decoded = null
    try {
        decoded = jwt.verify(token, config.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized| invalid token"
        })
    }

    const user = await userModel.findById(decoded.id)
    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }

    req.user = {
        id: user._id,
        name: user.name,
        email: user.email
    }

    next()
}

module.exports = authUser
require('dotenv').config()

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI not defined in environment variables")
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRETE not defined in environment variables")
}

module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET
}
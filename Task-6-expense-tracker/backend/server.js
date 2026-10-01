//start server database connetction
require('dotenv').config()
const app = require('./src/app');
const connectToDB = require('./src/config/database');

//Database connection
connectToDB()

//starting server
app.listen(3000,()=>{
    console.log("Server running on port 3000");
})
const express = require('express')
const app = express();
require('dotenv').config();
const logger = require("morgan")
const helmet = require("helmet")
const {sequelize} = require('./models')

// loggin the sql commands
// async function main(){
//     await sequelize.sync({alter:true})
// }
// main()



app.use(logger("common"))
app.use(helmet())
app.use(express.json())



// students Routes
app.use('/students',require('./Routes/students'));

//staffs Routes
app.use('/staff',require('./Routes/staff'))

// subject routes
app.use('/subjects',require('./Routes/subject'))




const db = require("./models");
db.sequelize.sync();

app.listen(5000,()=>{
    console.log("your app is running on port 5000")
})
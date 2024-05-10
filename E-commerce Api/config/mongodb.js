const { default: mongoose } = require("mongoose");
require('colors')
const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });
 db=mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("connect Db".green)
}).catch((err)=>{
    console.log("Error to connect Db".red)
    console.log(err)

})

module.exports=db
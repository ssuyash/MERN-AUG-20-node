const mongoose = require('mongoose')   


let UserSchema = mongoose.Schema({
    username:String,
    email:String,
    mobile:String,
    password:String    
}, {timestamps:true})

module.exports = mongoose.model('user', UserSchema)


//obj => must => run time memory allocation 
//obj => static => compile time memory allocation
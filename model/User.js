const mongoose = require('mongoose')   


let UserSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String    
}, {timestamps:true})

module.exports = mongoose.model('user', UserSchema)
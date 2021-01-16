const mongoose = require('mongoose')   


let TransactionSchema = mongoose.Schema({
        userid:String,
        amount:Number,
        type:String,         
        remark:String
}, { timestamps: true })

module.exports = mongoose.model('transaction', TransactionSchema)
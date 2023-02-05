const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ''
    },
    amount:{
        type: Number,
        default:0
    }, 
    type:{
        type:String,
         
    }
}, {timestamps: true})

const Transactions = mongoose.model('transactions', TransactionSchema)
module.exports = Transactions
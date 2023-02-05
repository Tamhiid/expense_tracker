const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/expense_tracker',{
    
},(err)=>{
    if(!err){
        console.log('connected')
    }else{
        console.log('err', err)
    }
})
const express = require('express')
const ejs = require('ejs')
const path = require('path')
require('./db/db')

const Transactions = require('./models/transactions')

let port = process.env.PORT || 5000


/* initializing express */
const app = express()

/* setting engine */
app.set('view engine', 'ejs')

app.engine('ejs', ejs.renderFile)


/* setting express */

app.use(express.urlencoded({extended:true}))
app.use(express.json())




/* setting puplic directory */
app.use(express.static('./public'))

app.get('/', async (req,res)=>{
    let transactions = await Transactions.find({}).sort({createdAt:-1}).limit(5)
    let counts = await Transactions.aggregate([
        {
            $group:{
                _id:null,
                expenses: {
                    $sum:{
                        $cond:[
                            {
                                $eq:["$type", "2"]
                            },
                            1,
                            0
                        ]
                    }
                },
                incomes:{
                    $sum:{
                        $cond:[
                            {$eq:["$type","1"]},
                            1,
                            0
                        ]
                    }
                }
            }
        }
    ])
    // let income_count = await Transactions.find({amount:"1"}).count()

    
    res.render('index',{
        transactions,
        counts,
        
    })
})

app.post('/add_new_transaction', async (req,res)=>{
    try{


        let obj = {
            amount : req.body.amount,
            type : req.body.type,
            title: req.body.title
        }

        if(req.body.op === 'I'){
            new Transactions(obj).save().then(success=>{
                res.redirect('/')
            }).catch(err=>{
                console.log('err', err)
            })
        }else{
            let current_transaction = await Transactions.findOne({_id: req.body.id})
            current_transaction.amount = req.body.amount,
            current_transaction.type = req.body.type,
            current_transaction.title= req.body.title

            current_transaction.save().then(success=>{
                res.redirect('/')
            }).catch(err=>{
                console.log('err', err)
            })

        }

    }catch(error){
        res.send({
            success: false,
            msg: error
        })
    }
})













app.listen(port)

console.log(`Your app is listening on port ${port}`)
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const UserModel = require('./model/User')
const TransactionModel = require('./model/Trasaction')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const SERVER_SECRET = "onetwokafourmynameislakhan"

app.use(cors())


mongoose.connect("mongodb+srv://mernclass:mernclass@seller-manager.vtu3z.mongodb.net/mernstack?retryWrites=true&w=majority", {
    useNewUrlParser: true,        
}).catch(err => console.log(err.reason));



app.use(bodyParser.json({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))



app.post('/register', async (req, res)=>{
    let {username, email, password} = req.body
    let userobj = {
        username,
        email,
        password,        
    }    

    let user = new UserModel(userobj)
    let data = await UserModel.find({email})
    
    if(data.length > 0){
        res.send({status:"ERR", msg:"Email already registred"})
    }else{
        bcrypt.hash(userobj.password, 15).then(encPwd=>{
            user.password = encPwd
            user.save().then(result=>{
                console.log(result)
                res.send({status:"OK", msg:"Successfully Registered"})
            }).catch(err=>{
                console.log(err)
                res.send({status:"ERR", msg:"something went wrong"})
            })
        }).catch(err=>{
            console.log(err)
            res.send({status:"ERR", msg:"something went wrong"})
        })
       
    }
})

app.post('/login', (req, res)=>{
    let {email, password} = req.body

    UserModel.find({email}).then(result=>{
        if(result.length > 0){
            //user found in db
            //compare password
            bcrypt.compare(password, result[0].password).then(scs=>{
                let token = jwt.sign({id:result[0]._id, username:result[0].username}, SERVER_SECRET)
                res.send({
                    status:"OK",
                    msg:"Successfully logged in",
                    data:{token}
                })
            }).catch(err=>{
                console.log(err)
                res.send({status:"ERR", msg:"invalid username or password"})
            })
           
        }else{
            //invalid username or password
            res.send({status:"ERR", msg:"invalid username or password"})
        }        
    }).catch(err=>{
        res.send({msg:"Err"})
    })
})


app.post('/transaction', async (req, res)=>{

   let {token, amount, type, remark} = req.body
   

   try{
    var decoded = await jwt.verify(token, SERVER_SECRET)
   }catch(e){
       console.log(e)
       res.send({status:"ERR", msg:"Invalid Authentication Token"})
   }
   

   let txn = new TransactionModel({
       userid:decoded.id,
       amount,
       type,
       remark
   })

   txn.save().then(result=>{
    res.send({status:"OK", msg:"Successfully Saved"})

   }).catch(err=>{
       console.log(err)
    res.send({status:"ERR", msg:"Something went wrong", err})
   })
})


app.post('/get-transactions', async (req, res)=>{
    
    let {token} = req.body    
    try{
        var decoded = await jwt.verify(token, SERVER_SECRET)
       }catch(e){
           console.log(e)
           res.send({status:"ERR", msg:"Invalid Authentication Token"})
       }
 
    TransactionModel.find({userid:decoded.id}).then(result=>{     
        res.send({status:"OK", data:result})
    }).catch(err=>{
     
     res.send({status:"ERR", msg:"Something went wrong", err})
    })
 })




//app.Method("endpoint", handlerfunction)

app.listen(8083, ()=>{
    console.log("server started")
})






























































//  const http = require('http')

//  let server = http.createServer((req, res)=>{
//     let {method, url} = req    
//     console.log(method, url)

//     if(method == "GET" && url == "/about"){
//         res.end("about api")
//     }else  if(method == "GET" && url == "/"){
//         res.end("home api")
//     }else{
//         res.end("page not found")  
//     }

    
//  })

//  server.listen(2021, ()=>{
//      console.log("server is started")
//  })



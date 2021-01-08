const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {MongoClient} = require('mongodb')
const client = new MongoClient("mongodb://localhost:27017")



app.use(bodyParser.json({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))

app.all('/students', (req, res, next)=>{
    console.log("for all type of request for /students")
    next()
})


app.get('/students', (req, res, next)=>{
    let query = req.query
    console.log(query)
    let students = [
        {name:"deepti"},
        {name:"priyanka"},
        {name:"rajat"},
        {name:"mayank"},
        {name:"rishabh"},
        {name:"shivam"},
        {name:"suyash"},
    ]    
    res.send(students)  
})

app.post('/students', async (req, res)=>{    

    let {name, email, password} = req.body
    await client.connect()

    let db = await client.db("mernstack2001")
    
    let result = await db.collection("users").insertOne({
        name,
        email,
        password,
        
    })
    console.log(result)
    res.send({msg:"success"})
    // .then((data)=>{
    //     res.send({msg:"Successfully inserted"})  
    // }).catch(err=>{
    //     res.send({msg:"Error"})  
    // })    
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



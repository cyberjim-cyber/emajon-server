const express = require('express')
const app = express()
const port = 5000
require('dotenv').config()
var cors = require('cors')
app.use(cors())

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

console.log(process.env.DB_USER)




var MongoClient = require('mongodb').MongoClient;

var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.emqen.mongodb.net:27017,cluster0-shard-00-01.emqen.mongodb.net:27017,cluster0-shard-00-02.emqen.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-y2z8ln-shard-0&authSource=admin&retryWrites=true&w=majority`;
MongoClient.connect(uri, function(err, client) {
  const collection = client.db("emajon").collection("products");

  app.post("/addproducts",(req,res) => {
      const product=req.body
      console.log(product)
      collection.insertMany(product)

      .then(resu => {
          console.log(resu)
          res.send(resu.insertedCount)
      })
  })
  app.get("/products",(req, res) => {


    collection.find({})
    .toArray((err,documents)=>{
      res.send(documents)
    })
    
    })


    app.get("/product/:key",(req, res) => {


      collection.find({key: req.params.key})
      .toArray((err,documents)=>{
        res.send(documents[0])
      })
      
      })

  console.log("database connectedddf")
});






app.get('/', (req, res) => {
  res.send('Hello Worldkjj!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
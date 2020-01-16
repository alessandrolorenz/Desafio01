let express = require('express'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb'),
    router = express.Router(),
    objectId = require('mongodb').ObjectID

  let app = express()
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  let port = 8082
  app.listen(port)

  console.log('O servidor está rodando na porta: ' + port)



  app.get("/", function(req, res){
    res.send({msn:'ola'})
  })

  // TENTATIVA COM O MONGOOSE 01
const mongoose = require('mongoose')
const Store = require('./models/store')
const url = 'mongodb://localhost:27017/desafio1'
const connect = mongoose.connect(url)

connect.then((db)=>{
  console.log('conectou com o mongo')
  Store.create({
    name: 'Loja A',
    address: 'Rua Abc, 000',
    phone: 0000-0000,
    cnpj: '00.000.000/0000-00',
    workingHour: 'Diariamente das 11hs às 23hs',
    city: 'Cidade ABC',
    state: 'RS'
  })
        .then((store) => {
          console.log(store)
          return Store.find({}).exec()
        })
        .then((stores)=>{
          console.log(stores)
          return Store.remove({})
        })
        .then(()=>{
          return mongoose.connection.close()
        })
        .catch(err => console.log(err))
      
})


app.get("/api", function(req, res){

  let body = req.body

  connect.then((db)=>{
    console.log('conectou com o mongo')
    Store.create({
      name: 'Loja A',
      address: 'Rua Abc, 000',
      phone: 0000-0000,
      cnpj: '00.000.000/0000-00',
      workingHour: 'Diariamente das 11hs às 23hs',
      city: 'Cidade ABC',
      state: 'RS'
    })
          .then((store) => {
            console.log(store)
            return Store.find({}).exec()
          })
          .then((stores)=>{
            console.log(stores)
            return Store.remove({})
          })
          .then(()=>{
            return mongoose.connection.close()
          })
          .catch(err => console.log(err))
        
  })

  res.send(body)
  
})


   // TENTATIVA COM O MONGOOSE 02
  //  const mongoose = require('mongoose')
  //  const Store = require('./models/store')
  //  const url = 'mongodb://localhost:27017/desafio1'
  //  const connect = mongoose.connect(url)
   
  //  connect.then((db)=>{
  //    console.log('conectou com o mongo')
  //    Store.create({
  //      name: 'Loja A',
  //      address: 'Rua Abc, 000',
  //      phone: 0000-0000,
  //      cnpj: '00.000.000/0000-00',
  //      workingHour: 'Diariamente das 11hs às 23hs',
  //      city: 'Cidade ABC',
  //      state: 'RS'
  //    })
  //          .then((store) => {
  //            console.log(store)
  //            return Store.findByIdAndUpdate(store._id, {
  //                $set: {name: 'LOJAMAIUSCULO'} 
  //              },
  //              { new: true }
  //              ).exec()
  //          })
  //          .then((store)=>{
  //            console.log(store)
  //            store.address = 'RUA QUALQUER'
  //            return store.save()
 
  //          }).then((result) => {  
  //            console.log(result)
  //            return Store.remove({})
  //          })
  //          .then(()=>{
  //            return mongoose.connection.close()
  //          })
  //          .catch(err => console.log(err))
         
  //  })
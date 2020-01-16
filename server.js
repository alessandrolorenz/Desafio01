let express = require('express'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb'),
    router = express.Router(),
    objectId = require('mongodb').ObjectID

  let app = express()
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  let port = 8081
  app.listen(port)

  console.log('O servidor está rodando na porta: ' + port)

  let db = mongodb.Db(
    'desafio1',
    new mongodb.Server('localhost', 27017, {}),
    {}
  )

  app.get("/", function(req, res){
    res.send({msn:'Olá entre no caminho /api para listar as lojas'})
  })

  // find all
  app.get("/api", function(req, res){
    db.open(function(err, mongoClient){
      mongoClient.collection('lojas', function(err, collection){
        collection.find().toArray(function(err, result){
          if(err){
            console.log(err)
          } else {
            res.send(result)
          }
          mongoClient.close()
        })
      })
    })
  })


// find by id
  app.get("/api/get/:id", function(req, res){
    db.open(function(err, mongoClient){
      mongoClient.collection('lojas', function(err, collection){
        collection.find(objectId(req.params.id)).toArray(function(err, result){
          if(err){
            console.log(err)
          } else {
            res.send(result)
          }
          mongoClient.close()
        })
      })
    })
  })


// find by estado
app.get("/api/estado/:estado", function(req, res){
  db.open(function(err, mongoClient){
    mongoClient.collection('lojas', function(err, collection){
      collection.find({state: req.params.estado}).toArray(function(err, result){
        if(err){
          console.log(err)
        } else {
          res.send(result)
        }
        mongoClient.close()
      })
    })
  })
})


// find by cidade e estado
app.get("/api/cidade/:estado/:cidade", function(req, res){
  db.open(function(err, mongoClient){
    mongoClient.collection('lojas', function(err, collection){
      collection.find({city: req.params.cidade, state:req.params.estado }).toArray(function(err, result){
        if(err){
          console.log(err)
        } else {
          res.send(result)
        }
        mongoClient.close()
      })
    })
  })
})


//  put
app.put('/api/update/:id', function(req, res){
  db.open(function(err, mongoClient){
    mongoClient.collection('lojas', function(err, collection){
      collection.update(
        {_id: objectId(req.params.id)},
        {$set: {name: req.body.name}},
        {},
        function(err, records){
          if(err){
            console.log(err)
          }else{
            res.send(records)
          }
          mongoClient.close()

        }
      )
    })
  })
})


// post
  app.post('/api', function(req, res){
    let body = req.body
    // console.log(body)
    db.open(function(erro, mongoClient){
      mongoClient.collection('lojas', function(err, collection){
        collection.insert(body, function(err, records){
          if(err){
            console.log(err)
          } else {
            res.send(records)
          }
          mongoClient.close()
        })
      })
    })

  })


// delete
app.delete('/api/:id', function(req, res){
  if(req.params.id){

    db.open(function(err, mongoClient){
      mongoClient.collection('lojas', function(err, collection){
        collection.remove({_id: objectId(req.params.id)}, function(err, result){
          if(err){
            console.log(err)
          }else{
            res.send(result)
          }
          mongoClient.close()
        })
      })
    })

  } else {
    res.send('Id is required')
  }

})


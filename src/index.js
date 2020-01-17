const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()
const port = 3000
const url = 'mongodb://localhost:27017/desafio1'

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)



app.listen(port)

console.log("conectou na porta: " + port)
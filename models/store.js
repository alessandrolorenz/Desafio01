const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  phone: {
    type: Number
  },
  cnpj:{
    type: String
  },
  workingHour:{
    type: String
  },
  city:{
    type: String
  },
  state: {
    type: String
  }

})

let Store = mongoose.model('Store', storeSchema)

module.exports = Store
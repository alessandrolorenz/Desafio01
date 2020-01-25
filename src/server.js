'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const port = 3000;

module.exports = class Start{

  constructor(){
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(routes);
  }

  server(){
    app.listen(port);
    console.log('conectou na porta: ' + port);
  }

};

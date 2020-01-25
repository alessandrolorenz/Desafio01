'use strict';
const mongoose = require('mongoose');
const Start = require('./server');
const url = 'mongodb://localhost:27017/desafio1';

class Server {
  constructor(){
    this.launcher = new Start();
  }

  useApp(){
    this.launcher.server();
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  }
}

new Server().useApp();

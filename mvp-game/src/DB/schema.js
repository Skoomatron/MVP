const mongoose = require('mongoose');
const db = require('./index.js');

const characterData = new mongoose.Schema({
  // design schema
  level: Number,
  name: String,
  experience: Number,
})

const Character = mongoose.model('Character', characterData);


module.exports = {Character};

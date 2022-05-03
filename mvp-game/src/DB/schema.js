const mongoose = require('mongoose');
const db = require('./index.js');

const characterData = new mongoose.Schema({
  // design schema
  level: {type: Number, default: 0},
  name: String,
  experience: {type: Number, default: 0},
})

const Character = mongoose.model('Character', characterData);

module.exports = {Character};

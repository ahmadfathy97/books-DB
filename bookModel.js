const mongoose = require('mongoose');
let bookSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  pages:{
    type: Number,
    required: true
  },
  date:{
    type: String,
    required: true
  }
});

const Books = ( module.exports = mongoose.model('Books', bookSchema) );

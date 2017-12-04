const mongoose = require('mongoose'),
      Schema = mongoose.Schema
      User = require('../models/user')

var Post = new Schema({
  userId: {
    type: String,
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true,
    trim: true
  },
  createdOn:{
    type: Date,
    required: true
  },
  comments:[{
    commentor: String,
    content: String
  }]
})

module.exports = mongoose.model('Post', Post)

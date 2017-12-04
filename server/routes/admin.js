const express = require('express'),
flash = require('req-flash'),
User = require('../models/user'),
users = require('./users'),
posts = require('./posts'),
bcrypt = require('bcryptjs')

/* apoc require statement must always go after the explicit loading of the 
* .env file */
require('dotenv').load()
const apoc = require('apoc')

module.exports = (() => {
'use strict'
var checkAuth = require('./index.js').checkAuth
const router = express.Router()

router.post('/register',(req,res) => {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if (err) {
      res.status(499).send()
    }
    else {
      
      const newUser = new User({
        displayName: req.body.displayName,
        email: req.body.email,
        username: req.body.username,
        password: hash, // Hash, not plain!
        createdOn: new Date,
        isAdmin: true
      })

      User.create(newUser, (err) => {
        if(err)
        throw err;
      
      })
      res.status(200).send()
    }
  })
})

/* User listing endpoint. */
router.get('/list/allusers',checkAuth, (req,res) => {
    User.find({}, function(err,users) {
      if (err) throw err
      else {
        const userMap = {}
          users.forEach(function(user) {
            userMap[user._id] = user
          })
        res.send(JSON.stringify(userMap))         
      }
    })
  })

  router.use('/users',users)
  router.use('/posts',posts)


  return router
})()
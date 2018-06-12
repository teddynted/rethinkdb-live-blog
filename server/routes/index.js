const express = require('express');
const r = require('rethinkdb');
const router = express.Router();
const blogModel = require('../models/blog');

module.exports = function(io) {

  var obj = new blogModel();

  io.on('connection', socket => {
     
     router.post('/api/post', (req, res) => {
        obj.insertBlogPost(req.body, (err, response) => {
          if( err ) {
              res.json({ 'response' : err });
          } 
          res.json(response.changes[0].new_val);
        });
     });

     obj.getBlogPosts((err, response) => {
        if( err ){
            res.json({ 'error' : err })
        }
        socket.emit('posts', response);
     });

  });

  return router;

};
'use strict';

const r = require('rethinkdb');
const db = require('./db');
const async = require('async');
const dbModel = new db();
dbModel.config();

class blog {
  insertBlogPost(fields,callback) {
    async.waterfall([
      function(callback) {
        dbModel.connectToDb(function(err,con){
          if(err) {
            return callback(true,"Error connecting to database!");
          }
          callback(null,con);
        });
      },
      function(con,callback) {
        console.log(fields.post);
        let post = Object.assign({}, {
          'post': fields.post
        });
        post.createdAt = r.now();
        r.table('tblposts')
        .insert(post, {returnChanges: true})
        .run(con,(err,results) => {
          con.close();
          if( err ) {
            return callback(true,"Error creating new blog!");
          }
          callback(null,results);
        });
      }
    ],function(err,data) {
      callback(err === null ? false : true,data);
    });
  }
  getBlogPosts(callback) {
    async.waterfall([
      function(callback) {
        dbModel.connectToDb((err,con) => {
          if(err) {
            return callback(true,"Error connecting to database!");
          }
          callback(null,con);
        });
      },
      function(con,callback) {
        r.table('tblposts').orderBy({ index: r.desc('createdAt') })
        .run(con,(err,cursor) => {
          con.close();
          if(err) {
            return callback(true,"Error fetching blog posts!");
          }
          cursor.toArray((err, result) => {
            if(err) {
              return callback(true,"Error reading cursor!");
            }
            callback(null,result);
          });
        });
      }
    ],function(err,data) {
      callback(err === null ? false : true,data);
    });
  }

}

module.exports = blog;
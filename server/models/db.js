'use strict';

var r = require('rethinkdb');
var async = require('async');

class schema {
   config() {
      var that = this;
      async.waterfall([
         function(callback) {
           that.connectToDb( function(err,con) {
             if(err) {
               return callback(true, "Error connecting to the database!");
             }
             callback(null,con);
           });
         },
         function(con,callback) {
           r.db('blog').tableCreate('tblposts').run(con, function(err,result) {
             if( err ) {
                console.log("Table already created!");
             }
             callback(null,con);
           });
         },
         function(con,callback) {
           r.table('tblposts').indexList().contains('createdAt').do(function(hasIndex) {
             return r.branch(
               hasIndex,
               {created: 0},
               r.table('tblposts').indexCreate('createdAt')
             );
           }).run(con, function(err) {
              if( err ) {
                console.log("Index already created!");
              }
              callback(err, con);
           });
         },
         function(con, callback) {
           r.table('tblposts').indexWait('createdAt').run(con, function(err, result) {
             callback(err, "All gone good!");
             con.close();
           });
         }
      ],function(err,data) {
         if(err) {
           console.error(err);
           process.exit(1);
           return;
         }
      });
   }
   connectToDb(callback) {
     r.connect({
       host : 'localhost',
       port : 28015,
       db : 'blog'
     }, function(err,con) {
       callback(err,con);
     });
   }

}

module.exports = schema;
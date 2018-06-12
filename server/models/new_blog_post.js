var r = require('rethinkdb');
var db = require('./db');
var update = new db();
module.exports = socket => {
  update.connectToDb( ( err, con ) => {
    if( err ) {
        return callback(true,"Error connecting to database");
    }
    r.table('tblposts').changes().run(con, ( err, cursor ) => {
      if( err ) {
         console.log(err);
      }
      cursor.each( ( err, row ) => {
         if( Object.keys(row).length > 0 ) {
             socket.broadcast.emit( 'posts', [ { 'createdAt': row.new_val.createdAt, 'id': row.new_val.id, 'post' : row.new_val.post } ]);
         }
      });
    });
  });
};
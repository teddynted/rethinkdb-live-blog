const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const http = require('http');
const socketio = require('socket.io');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../src')));

const server = http.createServer(app);
const io = socketio(server);

var new_blog_post;
io.on('connection',function(socket) {
   new_blog_post = require('./models/new_blog_post')(socket);
});

const routes = require('./routes/index')(io);
app.use('/', routes);

var port = 1994;

server.listen(port, function() {
   console.log('running at localhost: ' + port);
});
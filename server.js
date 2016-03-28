var path = require('path');
var socketio = require('socket.io');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

server.on('request', app);

var io = socketio(server);

var counter = 0;

var cordArray = [];
io.on('connection', function(socket){
  console.log('A new client has connected');
  console.log(socket.id);
  socket.emit('refreshdraw', cordArray);
  socket.on('disconnect', function(){
    console.log('A client has disconnected');
  });
  socket.on('drawing', function(start, end, color){
    console.log(++counter);
    socket.broadcast.emit('broadcasting', start, end, color);
    cordArray.push({start: start, end: end, color: color});
  });
});

server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

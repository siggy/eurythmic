var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = process.env.PORT || 3210;

app.use(express.static(path.join(__dirname, 'public')));

var clients = [];

var voltron = io.of('/voltron');
voltron.on('connection', function(socket){
  console.log('voltron connected');
});

io.on('connection', function(socket){
  clients.push(socket);

  console.log('a user connected: ' + socket.id);

  socket.on('phone', function(phone) {
    phone.id = socket.id;
    voltron.emit('phone', phone);
  });
});

http.listen(port, function(){
  console.log("listening on *:" + port);
});
